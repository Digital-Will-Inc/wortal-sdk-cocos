import { GetStatsPayload, PostStatsPayload, Stats } from "../interfaces/Stats";

/**
 * Gets a player's stats.
 * @param level The name of the level to get stats for.
 * @param payload Payload with additional details about the stats.
 * @example
 * Wortal.stats.getStatsAsync("Level 1")
 *    .then((stats) => {
 *      console.log(stats);
 *    });
 * @returns {Promise<Stats[]>} Promise that resolves to an array of stats.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>INVALID_PARAMS</li>
 * </ul>
 */
export function getStatsAsync(level: string | number, payload?: GetStatsPayload): Promise<Stats[]> {
    return (window as any).Wortal.stats.getStatsAsync(level, payload);
}

/**
 * Posts a player's stats.
 * @param level The name of the level the stats are for.
 * @param value The value of the stat.
 * @param payload Payload with additional details about the stats.
 * @example
 * Wortal.stats.postStatsAsync("Level 1", "100")
 *   .then(() => {
 *      console.log("Stats posted successfully");
 *   });
 * @returns {Promise<void>} Promise that resolves when the stats have been posted.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>INVALID_PARAMS</li>
 * </ul>
 */
export function postStatsAsync(level: string | number, value: number, payload?: PostStatsPayload): Promise<void> {
    return (window as any).Wortal.stats.postStatsAsync(level, value, payload);
}
