export class Wortal {
    private static _platform: Platform;
    private static _linkInterstitialId: string;
    private static _linkRewardedId: string;
    private static _isInit: boolean = false;

    /**
     * Initializes the Wortal extension. It is necessary to call this before using the Wortal SDK.
     */
    static init() {
        Wortal._platform = Wortal.GetPlatform();

        if (Wortal._platform === Platform.LINK) {
            Wortal.GetLinkAdUnitIds();
        }

        Wortal._isInit = true;
    }

    /**
     * Shows an interstitial ad.
     * @param type Type of ad placement.
     * @param description Description of the ad placement. Ex: "NextLevel"
     * @param beforeAd Callback before the ad is shown. Pause the game here.
     * @param afterAd Callback after the ad is shown. Resume the game here.
     */
    static showInterstitial(type: Placement, description: string, beforeAd: Function, afterAd: Function): void;

    /**
     * Shows an interstitial ad.
     * @param type Type of ad placement.
     * @param description Description of the ad placement. Ex: "NextLevel"
     * @param beforeAd Callback before the ad is shown. Pause the game here.
     * @param afterAd Callback after the ad is shown. Resume the game here.
     * @param adBreakDone Callback when the adBreak has completed. Called only on AdSense platform. Will typically be called in conjunction with afterAd or noShow.
     * @param noShow Callback when the ad is timed out or not served.
     */
    static showInterstitial(type: Placement, description: string, beforeAd: Function, afterAd: Function,
                            adBreakDone?: Function, noShow?: Function) {

        // Take care when passing adBreakDone and noShow callbacks, as they will typically be called together alongside afterAd.
        // Ex: Ad shows successfully, afterAd and adBreakDone are called.
        // Ex: Ad does not fill, adBreakDone and noShow are called.
        // This can lead to duplicating calls and unintended consequences if these callbacks are used together.
        // Ex: Resume game on both afterAd and adBreakDone. Resume is called twice.

        if (!Wortal._isInit) {
            console.error("[Wortal] Not initialized yet. Call init() before using.");
            return;
        }

        let placement: string = type;
        let adUnit: string = "";
        let adDone: boolean = false;

        if (Wortal._platform === Platform.LINK) {
            adUnit = Wortal._linkInterstitialId;
        }

        (window as any).triggerWortalAd(placement, adUnit, description, {
            beforeAd: () => {
                console.log("[Wortal] BeforeAd");
                if (beforeAd) beforeAd();
            },
            afterAd: () => {
                console.log("[Wortal] AfterAd");
                if (afterAd) afterAd();
                adDone = true;
            },
            adBreakDone: () => {
                console.log("[Wortal] AdBreakDone");
                if (adBreakDone) {
                    adBreakDone()
                } else {
                    if (!adDone) {
                        adDone = true;
                        afterAd();
                    }
                }
            },
            noShow: () => {
                console.log("[Wortal] NoShow");
                if (noShow) {
                    noShow();
                } else {
                    if (!adDone) {
                        adDone = true;
                        afterAd();
                    }
                }
            },
        });
    }

    /**
     * Calls for rewarded ad.
     * @param description Description of the ad being shown. Ex: 'ReviveAndContinue'.
     * @param beforeReward Callback before showing the rewarded ad.
     * @param afterAd Callback after the ad is shown.
     * @param adDismissed Callback when the player cancelled the rewarded ad before it finished. Do not reward the player.
     * @param adViewed Callback when the player viewed the rewarded ad successfully. Reward the player.
     */
    static requestRewarded(description: string, beforeReward: Function, afterAd: Function, adDismissed: Function,
                        adViewed: Function): void;

    /**
     * Calls for rewarded ad.
     * @param description Description of the ad being shown. Ex: 'ReviveAndContinue'.
     * @param beforeReward Callback before showing the rewarded ad. This can trigger a popup giving the player the option to view the ad for a reward.
     * @param afterAd Callback after the ad is shown.
     * @param adDismissed Callback when the player cancelled the rewarded ad before it finished. Do not reward the player.
     * @param adViewed Callback when the player viewed the rewarded ad successfully. Reward the player.
     * @param beforeAd Callback before the ad is shown. Pause the game here.
     * @param adBreakDone Callback when the adBreak has completed. Resume the game here.
     * @param noShow Callback when the ad is timed out or not served. Resume the game here.
     */
    static requestRewarded(description: string, beforeReward: Function, afterAd: Function, adDismissed: Function,
                        adViewed: Function, beforeAd?: Function, adBreakDone?: Function, noShow?: Function) {

        //TODO: handle beforeReward args

        if (!Wortal._isInit) {
            console.error("[Wortal] Not initialized yet. Call init() before using.");
            return;
        }

        let placement: string = Placement.REWARD;
        let adUnit: string = "";
        let adDone: boolean = false;

        if (Wortal._platform === Platform.LINK) {
            adUnit = Wortal._linkRewardedId;
        }

        (window as any).triggerWortalAd(placement, adUnit, description, {
            beforeReward: () => {
                console.log("[Wortal] BeforeReward");
                if (beforeReward) beforeReward();
            },
            afterAd: () => {
                console.log("[Wortal] AfterAd");
                if (afterAd) afterAd();
                adDone = true;
            },
            adDismissed: () => {
                console.log("[Wortal] AdDismissed");
                if (adDismissed) adDismissed();
            },
            adViewed: () => {
                console.log("[Wortal] AdViewed");
                if (adViewed) adViewed();
            },
            beforeAd: () => {
                console.log("[Wortal] BeforeAd");
                if (beforeAd) beforeAd();
            },
            adBreakDone: () => {
                console.log("[Wortal] AdBreakDone");
                if (adBreakDone) {
                    adBreakDone();
                } else {
                    if (!adDone) {
                        adDone = true;
                        afterAd();
                    }
                }
            },
            noShow: () => {
                console.log("[Wortal] NoShow");
                if (noShow) {
                    noShow();
                } else {
                    if (!adDone) {
                        adDone = true;
                        afterAd();
                    }
                }
            },
        });
    }

    private static GetPlatform(): Platform {
        let platform = (window as any).getWortalPlatform();

        switch (platform) {
            case 'wortal':
                return Platform.WORTAL;
            case 'link':
                return Platform.LINK;
            case 'viber':
                return Platform.VIBER;
            default:
                return Platform.DEBUG;
        }
    }

    private static GetLinkAdUnitIds(): string[] {
        (window as any).wortalGame.getAdUnitsAsync().then((adUnits) => {
            console.log(adUnits);
        });

        return null;
    }
}

/**
 * Types of ad placements as defined by Google:
 * https://developers.google.com/ad-placement/docs/placement-types
 */
export enum Placement {
    /**
     * Your game has not loaded its UI and is not playing sound. There can only be one ‘preroll’ placement in your game
     * for each page load. Preroll ads can only use the adBreakDone callback.
     */
    PREROLL = 'preroll',
    /**
     * Your game has loaded, the UI is visible and sound is enabled, the player can interact with the game, but the
     * game play has not started yet.
     */
    START = 'start',
    /**
     * The player pauses the game.
     */
    PAUSE = 'pause',
    /**
     * The player navigates to the next level.
     */
    NEXT = 'next',
    /**
     * The player explores options outside of gameplay.
     */
    BROWSE = 'browse',
    /**
     * The player reaches a point in the game where they can be offered a reward.
     */
    REWARD = 'reward'
}

enum Platform {
    DEBUG = 'debug',
    WORTAL = 'wortal',
    LINK = 'link',
    VIBER = 'viber'
}