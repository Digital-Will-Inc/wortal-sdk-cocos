/**
 * Gets the data bound to the entry point.
 * @example
 * let data = Wortal.session.getEntryPointData();
 * console.log(data.property);
 * @returns Data about the entry point or an empty object if none exists.
 */
export function getEntryPointData(): Record<string, unknown> {
    return (window as any).Wortal.session.getEntryPointData();
}

/**
 * Gets the entry point of where the game started from.
 * @example
 * Wortal.session.getEntryPointAsync()
 *  .then(entryPoint => console.log(entryPoint);
 * @returns Details about where the game started from.
 */
export function getEntryPointAsync(): Promise<string> {
    return (window as any).Wortal.session.getEntryPointAsync();
}

/**
 * Sets the data for this session. This is not persistent and is only used to populate webhook events.
 * @example
 * Wortal.session.setSessionData({
 *     'high-score': 100,
 *     'current-level': 2,
 * });
 * @param data Data to set.
 */
export function setSessionData(data: Record<string, unknown>): void {
    return (window as any).Wortal.session.setSessionData(data);
}

/**
 * Gets the locale the player is using.
 * @example
 * let lang = Wortal.session.getLocale();
 * @returns Locale in [BCP47](http://www.ietf.org/rfc/bcp/bcp47.txt) format.
 */
export function getLocale(): string {
    return (window as any).Wortal.session.getLocale();
}

/**
 * Gets the traffic source info for the game.
 * @example
 * let source = Wortal.session.getTrafficSource();
 * console.log(source['r_entrypoint']);
 * console.log(source['utm_source']);
 * @returns URL parameters attached to the game.
 */
export function getTrafficSource(): TrafficSource {
    return (window as any).Wortal.session.getTrafficSource();
}

/**
 * Data about the traffic source for this game.
 */
export interface TrafficSource {
    ['utm_source']?: string;
    ['r_entrypoint']?: string;
}