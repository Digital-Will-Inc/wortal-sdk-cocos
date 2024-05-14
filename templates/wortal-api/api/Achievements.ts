import { Achievement } from "../interfaces/Achievements";

/**
 * Gets a player's achievements. This method returns all achievements, regardless of whether they are unlocked or not.
 * @example
 * Wortal.achievements.getAchievementsAsync()
 *   .then((achievements) => {
 *      foreach (const achievement of achievements) {
 *          if (achievement.isUnlocked) {
 *              console.log(achievement.name + " is unlocked");
 *          }
 *      }
 *   });
 * @returns {Promise<Achievement[]>} Promise that resolves to an array of achievements.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * </ul>
 */
export function getAchievementsAsync(): Promise<Achievement[]> {
    return (window as any).Wortal.achievements.getAchievementsAsync();
}

/**
 * Unlocks an achievement for the player. This method will only unlock the achievement if it has not already been unlocked.
 * @param achievementName The name of the achievement to unlock.
 * @example
 * Wortal.achievements.unlockAchievementAsync("first_win")
 *  .then((unlocked) => {
 *    if (unlocked) {
 *      console.log("Achievement unlocked");
 *    } else {
 *      console.log("Achievement already unlocked");
 *    }
 *  });
 * @returns {Promise<boolean>} Promise that resolves to true if the achievement was unlocked, false if it was already unlocked.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>INVALID_PARAMS</li>
 * <li>ACHIEVEMENT_NOT_FOUND</li>
 * </ul>
 */
export function unlockAchievementAsync(achievementName: string): Promise<boolean> {
    return (window as any).Wortal.achievements.unlockAchievementAsync(achievementName);
}
