import { PlacementType } from "../types/Ads";
import { ErrorMessage} from "../interfaces/Wortal";

/**
 * Shows an interstitial ad. These can be shown at various points in the game such as a level end, restart or a timed
 * interval in games with longer levels.
 * @example
 * // Player reached the next level.
 * Wortal.ads.showInterstitial('next', 'NextLevel', pauseGame, resumeGame);
 *
 * // Player paused the game.
 * Wortal.ads.showInterstitial('pause', 'PausedGame', pauseGame, resumeGame);
 *
 * // Player opened the IAP shop.
 * Wortal.ads.showInterstitial('browse', 'BrowseShop', pauseAudio, resumeAudio);
 * @param placement Placement type for the ad.
 * @param description Description of the placement.
 * @param beforeAd Callback for before the ad is shown. Pause the game here.
 * @param afterAd Callback for after the ad is shown. Resume the game here.
 * @param noFill Callback for when the ad is not filled. This can happen if the platform has no ads to show or if the
 * rate limit has been reached. If this is not provided, the afterAd callback will be used.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * </ul>
 */
export function showInterstitial(placement: PlacementType,
                                 description: string,
                                 beforeAd: Function,
                                 afterAd: Function,
                                 noFill?: Function): void {
    (window as any).Wortal.ads.showInterstitial(placement, description, beforeAd, afterAd, noFill);
}

/**
 * Shows a rewarded ad. These are longer, optional ads that the player can earn a reward for watching. The player
 * must be notified of the ad and give permission to show before it can be shown.
 * @example
 * // This example shows the game flow independent of the outcome of the ad.
 * // Ex: Player gets bonus coins for watching the ad, but the game continues regardless of the outcome.
 * Wortal.ads.showRewarded('BonusCoins', pauseGame, resumeGame, skipBonus, addBonusCoins);
 *
 * // This example shows the game flow depending on the outcome of the ad.
 * // Ex: Player dies and can revive by watching an ad, but if they skip the ad they lose the level.
 * Wortal.ads.showRewarded('ReviveAndContinue', pauseAudio, resumeAudio, endGame, continueGame);
 * @param description Description of the placement.
 * @param beforeAd Callback for before the ad is shown. Pause the game here.
 * @param afterAd Callback for after the ad is shown. Resume the game here.
 * @param adDismissed Callback for when the player dismissed the ad. Do not reward the player.
 * @param adViewed Callback for when the player has successfully watched the ad. Reward the player here.
 * @param noFill Callback for when the ad is not filled. This can happen if the platform has no ads to show or if
 * the rate limit has been reached. If this is not provided, the afterAd callback will be used.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * </ul>
 */
export function showRewarded(description: string,
                             beforeAd: Function,
                             afterAd: Function,
                             adDismissed: Function,
                             adViewed: Function,
                             noFill?: Function): void {
    (window as any).Wortal.ads.showRewarded(description, beforeAd, afterAd, adDismissed, adViewed, noFill);
}
