/**
 * Logs the start of a level.
 * @example
 * Wortal.analytics.logLevelStart('Level 3');
 * @param level Name of the level.
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
 */
export function logLevelEnd(level: string, score: string, wasCompleted: boolean): void {
    (window as any).Wortal.analytics.logLevelStart(level, score, wasCompleted);
}

/**
 * Logs the player achieving a new level.
 * @example
 * Wortal.analytics.logLevelUp('Level 7');
 * @param level Level the player achieved.
 */
export function logLevelUp(level: string): void {
    (window as any).Wortal.analytics.logLevelUp(level);
}

/**
 * Logs the player's score.
 * @example
 * Wortal.analytics.logScore('100');
 * @param score Score the player achieved.
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
 */
export function logGameChoice(decision: string, choice: string): void {
    (window as any).Wortal.analytics.logGameChoice(decision, choice);
}