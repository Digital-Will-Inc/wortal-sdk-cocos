import ScheduledNotification from "../classes/ScheduledNotification";
import { NotificationPayload, NotificationScheduleResult } from "../interfaces/Notifications";
import { ErrorMessage} from "../interfaces/Wortal";

/**
 * Schedule a notification to be delivered to the player at a later time.
 * @example
 * Wortal.notifications.scheduleAsync({
 *    title: "Your energy is full!",
 *    body: "Come back and play again.",
 *    mediaURL: "https://example.com/image.png",
 *    label: "resources-full",
 *    scheduleInterval: 300 // 5 minutes
 * }).then((result) => {
 *   console.log(result.id);
 * });
 * @param payload Object defining the notification to be scheduled.
 * @returns {Promise<NotificationScheduleResult>} Promise that contains the result of the scheduled notification.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>INVALID_PARAM</li>
 * <li>OPERATION_FAILED</li>
 * </ul>
 */
export function scheduleAsync(payload: NotificationPayload): Promise<NotificationScheduleResult> {
    return (window as any).Wortal.notifications.scheduleAsync(payload);
}

/**
 * Gets the history of scheduled notifications for the past 30 days.
 * @example
 * Wortal.notifications.getHistoryAsync().then((notifications) => {
 *   notifications.forEach((notification) => {
 *   console.log(notification.id);
 *   console.log(notification.status);
 * });
 * @returns {Promise<ScheduledNotification[]>} Promise that contains an array of notifications scheduled.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>OPERATION_FAILED</li>
 * </ul>
 */
export function getHistoryAsync(): Promise<ScheduledNotification[]> {
    return (window as any).Wortal.notifications.getHistoryAsync();
}

/**
 * Cancels a scheduled notification.
 * @example
 * Wortal.notifications.cancelAsync("1234567890");
 * @param id ID of the notification to cancel.
 * @returns {Promise<boolean>} Promise that resolves true if the notification was cancelled successfully, false otherwise.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>INVALID_PARAM</li>
 * <li>OPERATION_FAILED</li>
 * </ul>
 */
export function cancelAsync(id: string): Promise<boolean> {
    return (window as any).Wortal.notifications.cancelAsync(id);
}

/**
 * Cancels all scheduled notifications.
 * @example
 * Wortal.notifications.cancelAllAsync();
 * @param label Optional label of the notification category to cancel. If this is used then only notifications with the
 * specified label will be cancelled.
 * @returns {Promise<boolean>} Promise that resolves true if all notifications were cancelled successfully, false otherwise.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>OPERATION_FAILED</li>
 * </ul>
 */
export function cancelAllAsync(label?: string): Promise<boolean> {
    return (window as any).Wortal.notifications.cancelAllAsync(label);
}
