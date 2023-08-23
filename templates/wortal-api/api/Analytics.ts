import { ErrorMessage } from "../interfaces/Wortal";

/**
 * Logs the start of a level.
 * @example
 * Wortal.analytics.logLevelStart('Level 3');
 * @param level Name of the level.
 * @throws {ErrorMessage} See error.message for more details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * </ul>
 */
export function logLevelStart(level: string): void {
    (window as any).Wortal.analytics.logLevelStart(level);
}

/**
 * Logs the end of a level.
 * To ensure the level timer is recorded the level name must match the name passed into the
 * previous logLevelStart call. If it does not match then the timer will be logged at 0.
 * @example
 * Wortal.analytics.logLevelEnd('Level 3', '100', true);
 * @param level Name of the level.
 * @param score Score the player achieved.
 * @param wasCompleted Was the level completed or not.
 * @throws {ErrorMessage} See error.message for more details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * </ul>
 */
export function logLevelEnd(level: string, score: string, wasCompleted: boolean): void {
    (window as any).Wortal.analytics.logLevelStart(level, score, wasCompleted);
}

/**
 * Logs the player achieving a new level.
 * @example
 * Wortal.analytics.logLevelUp('Level 7');
 * @param level Level the player achieved.
 * @throws {ErrorMessage} See error.message for more details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * </ul>
 */
export function logLevelUp(level: string): void {
    (window as any).Wortal.analytics.logLevelUp(level);
}

/**
 * Logs the player's score.
 * @example
 * Wortal.analytics.logScore('100');
 * @param score Score the player achieved.
 * @throws {ErrorMessage} See error.message for more details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * </ul>
 */
export function logScore(score: string): void {
    (window as any).Wortal.analytics.logScore(score);
}

/**
 * Logs the start of a tutorial.
 * @example
 * Wortal.analytics.logTutorialStart('First Play');
 * @param tutorial Name of the tutorial.
 */
export function logTutorialStart(tutorial: string): void {
    (window as any).Wortal.analytics.logTutorialStart(tutorial);
}

/**
 * Logs the end of a tutorial.
 * To ensure the level timer is recorded the tutorial name must match the name passed into the
 * previous logTutorialStart call. If it does not match then the timer will be logged at 0.
 * @example
 * Wortal.analytics.logTutorialEnd('First Play', true);
 * @param tutorial Name of the tutorial.
 * @param wasCompleted Was the tutorial completed.
 */
export function logTutorialEnd(tutorial: string, wasCompleted: string): void {
    (window as any).Wortal.analytics.logTutorialEnd(tutorial, wasCompleted);
}

/**
 * Logs a choice the player made in the game. This can be a powerful tool for balancing the game and understanding
 * what content the players are interacting with the most.
 * @example
 * Wortal.analytics.logGameChoice('Character', 'Blue');
 * @param decision Decision the player was faced with.
 * @param choice Choice the player made.
 * @throws {ErrorMessage} See error.message for more details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * </ul>
 */
export function logGameChoice(decision: string, choice: string): void {
    (window as any).Wortal.analytics.logGameChoice(decision, choice);
}

/**
 * Logs the player's social invite.
 * @example
 * Wortal.analytics.logSocialInvite('Leaderboard View');
 * @param placement Placement of the invite.
 */
export function logSocialInvite(placement: string): void {
    (window as any).Wortal.analytics.logSocialInvite(placement);
}

/**
 * Logs the player's social share.
 * @example
 * Wortal.analytics.logSocialShare('Game Over UI');
 * @param placement Placement of the share.
 */
export function logSocialShare(placement: string): void {
    (window as any).Wortal.analytics.logSocialShare(placement);
}

/**
 * Logs the player's purchase of an in-app product.
 * @example
 * Wortal.analytics.logPurchase('com.wortal.game.gems.100', '100 gems from shop sale');
 * @param productID ID of the product the player purchased.
 * @param details Additional details about the purchase.
 * @throws {ErrorMessage} See error.message for more details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * </ul>
 */
export function logPurchase(productID: string, details?: string): void {
    (window as any).Wortal.analytics.logPurchase(productID, details);
}

/**
 * Logs the player's purchase of an in-app subscription.
 * @example
 * Wortal.analytics.logPurchaseSubscription('com.wortal.game.seasonpass', 'Season pass from level up reward UI');
 * @param productID ID of the subscription product the player purchased.
 * @param details Additional details about the purchase.
 * @throws {ErrorMessage} See error.message for more details.
 * <ul>
 * <li>INVALID_PARAM</li>
 * </ul>
 */
export function logPurchaseSubscription(productID: string, details?: string): void {
    (window as any).Wortal.analytics.logPurchaseSubscription(productID, details);
}
