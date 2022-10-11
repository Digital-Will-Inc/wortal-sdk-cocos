import {WortalUtil} from "./WortalUtil";

/**
 * API for the Wortal SDK. Calls for ads and analytics are made via this class.
 */
export class Wortal {

    // Config
    private static _platform: Platform;
    private static _gameName: string;
    private static _isInit: boolean = false;

    // Ads
    private static _linkInterstitialId: string;
    private static _linkRewardedId: string;
    private static _isAdBlocked: boolean = false;
    private static _isAdShowing: boolean = false;

    // Analytics
    private static _gameTimer: number = 0;
    private static _levelTimer: number = 0;
    private static _levelTimerHandle: number;
    private static _levelName: string;

    /**
     * Initializes the Wortal extension. It is strongly recommended to call this before using the Wortal SDK. Wortal
     * SDK will initialize itself on the first ad call if not already done, but this may cause the first ad to be
     * skipped while the initialization completes.
     */
    static init() {
        if (Wortal._isInit) {
            console.warn("[Wortal] Already initialized");
            return;
        }

        Wortal._isAdBlocked = (window as any).isAdBlocked;
        console.log("[Wortal] AdBlocker: " + Wortal._isAdBlocked);

        Wortal._gameName = document.title;
        Wortal._platform = Wortal.getPlatform();
        console.log("[Wortal] Platform: " + Wortal._platform);

        if (Wortal._platform === Platform.LINK) {
            Wortal.getLinkAdUnitIds();
        }

        window.addEventListener('visibilitychange', () => {
            if (document.visibilityState == "hidden") {
                Wortal.logGameEnd();
            }
        });

        // We first need to load the intl-data JSON from resources, which happens asynchronously.
        // After that we can call init and pass in the results from the country check.
        Wortal.getIntlData()
            .then(res => Wortal.logGameStart(res))
            .catch(() => Wortal.logGameStart("Nulltherlands"));

        Wortal._isInit = true;
        console.log("[Wortal] Initialized");
    }

    /**
     * Shows an interstitial ad.
     * @param type Type of ad placement.
     * @param description Description of the ad placement. Ex: "NextLevel"
     * @param beforeAd Callback before the ad is shown. Pause the game here.
     * @param afterAd Callback after the ad is shown. Resume the game here.
     */
    static showInterstitial(type: Placement, description: string, beforeAd: Function, afterAd: Function) {

        if (!Wortal._isInit) {
            console.warn("[Wortal] SDK not initialized before ad call, ad may be skipped.");
            Wortal.init();
        }

        if (Wortal._isAdBlocked) {
            console.warn("[Wortal] Ads are blocked. Calling afterAd().");
            afterAd();
            return;
        }

        if (Wortal._isAdShowing) {
            console.warn("[Wortal] Ad already showing, wait for it to complete before calling again.");
            return;
        }

        let placement: string = type;
        let adUnit: string = "";
        let adDone: boolean = false;

        if (Wortal._platform === Platform.LINK) {
            adUnit = Wortal._linkInterstitialId;
            if (adUnit == null) {
                console.warn("[Wortal] AdUnitId was null. Skipping ad call. Call Wortal.init() on game start to prevent this.");
                return;
            }
        }

        Wortal._isAdShowing = true;
        (window as any).triggerWortalAd(placement, adUnit, description, {
            beforeAd: () => {
                console.log("[Wortal] BeforeAd");
                beforeAd();
            },
            // We should always receive only one of the following callbacks: afterAd, noShow or noBreak.
            // They all signal that the ad event is complete and that we should resume the game now.
            afterAd: () => {
                console.log("[Wortal] AfterAd");
                afterAd();
                adDone = true;
                Wortal._isAdShowing = false;
            },
            noShow: () => {
                console.log("[Wortal] NoShow");
                afterAd();
                adDone = true;
                Wortal._isAdShowing = false;
            },
            noBreak: () => {
                console.log("[Wortal] NoBreak");
                afterAd();
                adDone = true;
                Wortal._isAdShowing = false;
            },
            adBreakDone: () => {
                // This only fires on AdSense. We don't call anything here because it will likely just be
                // a duplicate of afterAd.
                console.log("[Wortal] AdBreakDone");
            },
        });
    }

    /**
     * Shows a rewarded ad.
     * @param description Description of the ad being shown. Ex: 'ReviveAndContinue'.
     * @param beforeAd Callback before the ad is shown. Pause the game here.
     * @param afterAd Callback after the ad is shown.
     * @param adDismissed Callback when the player cancelled the rewarded ad before it finished. Do not reward the player.
     * @param adViewed Callback when the player viewed the rewarded ad successfully. Reward the player.
     */
    static showRewarded(description: string, beforeAd: Function, afterAd: Function, adDismissed: Function, adViewed: Function) {

        if (!Wortal._isInit) {
            console.warn("[Wortal] SDK not initialized before ad call, ad may be skipped.");
            Wortal.init();
        }

        if (Wortal._isAdBlocked) {
            console.warn("[Wortal] Ads are blocked. Calling afterAd().");
            afterAd();
            return;
        }

        if (Wortal._isAdShowing) {
            console.warn("[Wortal] Ad already showing, wait for it to complete before calling again.");
            return;
        }

        let placement: string = Placement.REWARD;
        let adUnit: string = "";
        let adDone: boolean = false;

        if (Wortal._platform === Platform.LINK) {
            adUnit = Wortal._linkRewardedId;
            if (adUnit == null) {
                console.warn("[Wortal] AdUnitId was null. Skipping ad call. Call Wortal.init() on game start to prevent this.");
                return;
            }
        }

        Wortal._isAdShowing = true;
        (window as any).triggerWortalAd(placement, adUnit, description, {
            beforeAd: () => {
                console.log("[Wortal] BeforeAd");
                beforeAd();
            },
            // We should always receive only one of the following callbacks: afterAd, noShow or noBreak.
            // They all signal that the ad event is complete and that we should resume the game now.
            afterAd: () => {
                console.log("[Wortal] AfterAd");
                afterAd();
                adDone = true;
                Wortal._isAdShowing = false;
            },
            noShow: () => {
                console.log("[Wortal] NoShow");
                afterAd();
                adDone = true;
                Wortal._isAdShowing = false;
            },
            noBreak: () => {
                console.log("[Wortal] NoBreak");
                afterAd();
                adDone = true;
                Wortal._isAdShowing = false;
            },
            adDismissed: () => {
                console.log("[Wortal] AdDismissed");
                adDismissed();
            },
            adViewed: () => {
                console.log("[Wortal] AdViewed");
                adViewed();
            },
            beforeReward: function (showAdFn) {
                // This is only called on AdSense, we need to call showAdFn() here to trigger the ad to show.
                console.log("[Wortal] BeforeReward");
                showAdFn();
            },
            adBreakDone: () => {
                // This only fires on AdSense. We don't call anything here because it will likely just be
                // a duplicate of afterAd.
                console.log("[Wortal] AdBreakDone");
            },
        });
    }

    /**
     * Logs an event when the player begins the tutorial. Starts a timer that tracks how long the player spends in this
     * level. Call logTutorialEnd() to get the value of the timer in the event.
     */
    static logTutorialStart() {
        Wortal.logLevelStart("Tutorial");
    }

    /**
     * Logs an event when the player finishes the tutorial. This can be used to determine how many players complete
     * the tutorial vs skipping.
     */
    static logTutorialEnd() {
        Wortal.logLevelEnd("Tutorial");
    }

    /**
     * Logs an event for the player starting a level. This will trigger a level timer with the given level name. If
     * logLevelEnd() is called with the same level name, it will record the time it took the player to finish the level.
     * @param level Level the player started.
     * @return ID of the timer being used to track the level time.
     */
    static logLevelStart(level: string) {
        if (Wortal._levelTimerHandle != null) {
            clearInterval(Wortal._levelTimerHandle);
            Wortal._levelTimerHandle = null;
        }
        Wortal._levelName = level;
        Wortal._levelTimer = 0;
        Wortal._levelTimerHandle = setInterval(() => Wortal._levelTimer += 1, 1000);
        Wortal.event("LevelStart", {
            game: Wortal._gameName,
            level: level,
        });
    }

    /**
     * Logs an event for the player ending a level. Also logs how long it took the player to complete the level if
     * logLevelStart() was called before this with the same level variable.
     * @param level Level the player played.
     * @param wasCompleted Did the player complete the level or not.
     * @param score Score the player achieved in the level.
     */
    static logLevelEnd(level: string, wasCompleted: boolean = true, score: string = '0') {
        if (Wortal._levelTimerHandle != null) {
            clearInterval(Wortal._levelTimerHandle);
            Wortal._levelTimerHandle = null;
        }
        if (Wortal._levelName != level) {
            Wortal._levelTimer = 0;
        }
        Wortal.event("LevelEnd", {
            game: Wortal._gameName,
            level: level,
            time: Wortal._levelTimer,
            complete: wasCompleted,
            score: score,
        });
        Wortal._levelTimer = 0;
    }

    /**
     * Logs an event when the player levels up.
     * @param level Level the player achieved.
     */
    static logLevelUp(level: string) {
        Wortal.event("LevelUp", {
            game: Wortal._gameName,
            level: level,
        });
    }

    /**
     * Logs the players score. This can be used to record a high score or track scores across different points in the
     * game to determine difficulty level or imbalances.
     * @param score Score the player achieved.
     */
    static logScore(score: string) {
        Wortal.event("PostScore", {
            game: Wortal._gameName,
            score: score,
        });
    }

    /**
     * Logs a choice the player makes in the game. This can be useful for determining which characters are more
     * popular, which paths are more commonly taken, etc. This can be a powerful tool for balancing the game and
     * giving the players more of what they enjoy.
     * @param decision Decision the player was faced with. Ex: Character
     * @param choice Choice the player made. Ex: Blue Dog
     */
    static logGameChoice(decision: string, choice: string) {
        Wortal.event("GameChoice", {
            game: Wortal._gameName,
            decision: decision,
            choice: choice,
        });
    }

    private static logGameStart(country) {
        const platform = Wortal._platform;
        const browser = navigator.userAgent;
        Wortal.event("GameStart", {
            game: Wortal._gameName,
            platform: platform,
            browser: browser,
            country: country,
        });
        setInterval(function () {
            if (document.visibilityState != "hidden") {
                Wortal._gameTimer += 1;
            }
        }, 1000);
    }

    private static logGameEnd() {
        Wortal.event("GameEnd", {
            game: Wortal._gameName,
            timePlayed: Wortal._gameTimer,
        });
    }

    private static getIntlData(): Promise<string> {
        return WortalUtil.LoadIntlData()
            .then(res => Wortal.getPlayerCountry(res))
            .catch(() => Wortal.getPlayerCountry(null));
    }

    // This uses the time zone setting of the player to determine their country.
    // We do this to avoid collecting any personal data on the player for GDPR compliance.
    // The location is very coarse and easily spoofed so nothing here can identify the player.
    private static getPlayerCountry(data): string {
        if (data == null) {
            return "Nulltherlands";
        }
        const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const arr = zone.split("/");
        const city = arr[arr.length - 1];
        return data[city];
    }

    private static event(name: string, features: object): void {
        let request = new XMLHttpRequest();
        request.open("POST", "https://wombat.digitalwill.co.jp/wortal/events");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify({ name, features }));
    }

    private static getPlatform(): Platform {
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

    private static getLinkAdUnitIds() {
        (window as any).wortalGame.getAdUnitsAsync().then((adUnits) => {
            console.log("[Wortal] Link AdUnit IDs returned: \n" + adUnits);
            Wortal._linkInterstitialId = adUnits[0].id;
            Wortal._linkRewardedId = adUnits[1].id;
        });
    }
}

/**
 * Types of ad placements as defined by Google:
 * https://developers.google.com/ad-placement/docs/placement-types
 */
export enum Placement {
    /// Your game has not loaded its UI and is not playing sound. There can only be one ‘preroll’ placement in your game
    /// for each page load. Preroll ads can only use the adBreakDone callback.
    PREROLL = 'preroll',
    /// Your game has loaded, the UI is visible and sound is enabled, the player can interact with the game, but the
    /// game play has not started yet.
    START = 'start',
    /// The player pauses the game.
    PAUSE = 'pause',
    /// The player navigates to the next level.
    NEXT = 'next',
    /// The player explores options outside of gameplay.
    BROWSE = 'browse',
    /// The player reaches a point in the game where they can be offered a reward.
    REWARD = 'reward'
}

enum Platform {
    DEBUG = 'debug',
    WORTAL = 'wortal',
    LINK = 'link',
    VIBER = 'viber'
}