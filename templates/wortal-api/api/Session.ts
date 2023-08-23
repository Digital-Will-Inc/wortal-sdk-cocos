import { Platform } from "../../../@types";
import { TrafficSource } from "../interfaces/Session";
import { Device, Orientation } from "../types/Session";
import { ErrorMessage } from "../interfaces/Wortal";

/**
 * Returns any data object associated with the entry point that the game was launched from.
 *
 * The contents of the object are developer-defined, and can occur from entry points on different platforms.
 * This will return null for older mobile clients, as well as when there is no data associated with the particular entry point.
 * @example
 * const data = Wortal.session.getEntryPointData();
 * console.log(data.property);
 * @returns {Record<string, unknown>} Data about the entry point or an empty object if none exists.
 */
export function getEntryPointData(): Record<string, unknown> {
    return (window as any).Wortal.session.getEntryPointData();
}

/**
 * Returns the entry point that the game was launched from.
 * @example
 * Wortal.session.getEntryPointAsync()
 *  .then(entryPoint => console.log(entryPoint);
 * @returns {Promise<string>} Promise that resolves with the name of the entry point from which the user started the game.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>RETHROW_FROM_PLATFORM</li>
 * </ul>
 */
export function getEntryPointAsync(): Promise<string> {
    return (window as any).Wortal.session.getEntryPointAsync();
}

/**
 * Sets the data associated with the individual gameplay session for the current context.
 *
 * This function should be called whenever the game would like to update the current session data.
 * This session data may be used to populate a variety of payloads, such as game play webhooks.
 * @example
 * Wortal.session.setSessionData({
 *     'high-score': 100,
 *     'current-level': 2,
 * });
 * @param data An arbitrary data object, which must be less than or equal to 1000 characters when stringified.
 */
export function setSessionData(data: Record<string, unknown>): void {
    return (window as any).Wortal.session.setSessionData(data);
}

/**
 * Gets the locale the player is using. This is useful for localizing your game.
 * @example
 * const lang = Wortal.session.getLocale();
 * @returns {string} Locale in [BCP47](http://www.ietf.org/rfc/bcp/bcp47.txt) format.
 */
export function getLocale(): string {
    return (window as any).Wortal.session.getLocale();
}

/**
 * Gets the traffic source info for the game. This is useful for tracking where players are coming from.
 * For example, if you want to track where players are coming from for a specific campaign.
 * @example
 * const source = Wortal.session.getTrafficSource();
 * console.log(source['r_entrypoint']);
 * console.log(source['utm_source']);
 * @returns {TrafficSource} URL parameters attached to the game.
 */
export function getTrafficSource(): TrafficSource {
    return (window as any).Wortal.session.getTrafficSource();
}

/**
 * Gets the platform the game is running on. This is useful for platform specific code.
 * For example, if you want to show a different social share asset on Facebook than on Link.
 * @example
 * const platform = Wortal.session.getPlatform();
 * console.log(platform);
 * @returns {Platform} Platform the game is running on.
 */
export function getPlatform(): Platform {
    return (window as any).Wortal.session.getPlatform();
}

/**
 * Gets the device the player is using. This is useful for device specific code.
 * @example
 * const device = Wortal.session.getDevice();
 * console.log(device);
 * @returns {Device} Device the player is using.
 */
export function getDevice(): Device {
    return (window as any).Wortal.session.getDevice();
}

/**
 * Gets the orientation of the device the player is using. This is useful for determining how to display the game.
 * @example
 * const orientation = Wortal.session.getOrientation();
 * if (orientation === 'portrait') {
 *    // Render portrait mode.
 * }
 * @returns {Orientation} Orientation of the device the player is using.
 */
export function getOrientation(): Orientation {
    return (window as any).Wortal.session.getOrientation();
}

/**
 * Assigns a callback to be invoked when the orientation of the device changes.
 * @example
 * Wortal.session.onOrientationChange(orientation => {
 *    if (orientation === 'portrait') {
 *      // Render portrait mode
 *    }
 * });
 * @param callback Callback to be invoked when the orientation of the device changes.
 */
export function onOrientationChange(callback: (orientation: Orientation) => void): void {
    return (window as any).Wortal.session.onOrientationChange(orientation => {
        callback(orientation);
    });
}

/**
 * Request to switch to another game. The API will reject if the switch fails - else, the client will load the new game.
 * @example
 * Wortal.session.switchGameAsync(
 *   '12345678',
 *   { referrer: 'game_switch', reward_coins: 30 });
 * @param gameID ID of the game to switch to. The application must be a Wortal game.
 * @param data An optional data payload. This will be set as the entrypoint data for the game being switched to. Must be less than or equal to 1000 characters when stringified.
 * @returns {Promise<void>} Promise that resolves when the game has switched. If the game fails to switch, the promise will reject.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>INVALID_PARAMS</li>
 * <li>USER_INPUT</li>
 * <li>PENDING_REQUEST</li>
 * <li>CLIENT_REQUIRES_UPDATE</li>
 * <li>NOT_SUPPORTED</li>
 * </ul>
 */
export function switchGameAsync(gameID: string, data?: object): Promise<void> {
    return (window as any).Wortal.session.switchGameAsync(gameID, data);
}
