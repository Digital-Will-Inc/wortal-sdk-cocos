import * as _ads from './api/Ads';
import * as _analytics from './api/Analytics';
import * as _context from './api/Context';
import * as _iap from './api/IAP';
import * as _leaderboard from './api/Leaderboard';
import * as _notifications from './api/Notifications';
import * as _player from './api/Player';
import * as _session from './api/Session';
import * as _tournament from './api/Tournament';

/**
 * API for the Wortal SDK.
 */
export class Wortal {
    /** Ads API */
    static ads = _ads;
    /** Analytics API */
    static analytics = _analytics;
    /** Context API */
    static context = _context;
    /** In-App Purchasing API */
    static iap = _iap;
    /** Leaderboard API */
    static leaderboard = _leaderboard;
    /** Notifications API */
    static notifications = _notifications;
    /** Player API */
    static player = _player;
    /** Session API */
    static session = _session;
    /** Tournament API */
    static tournament = _tournament;

    /**
     * Sets a callback which will be invoked when the app is brought to the background.
     * @param callback Callback to invoke.
     */
    onPause(callback: Function): void {
        (window as any).Wortal.onPause(() => {
            callback();
        });
    }

    /**
     * Requests and performs haptic feedback on supported devices.
     * @returns {Promise<void>} Haptic feedback requested successfully
     * @throws {ErrorMessage} See error.message for details.
     * <ul>
     * <li>NOT_SUPPORTED</li>
     * <li>CLIENT_UNSUPPORTED_OPERATION</li>
     * <li>INVALID_OPERATION</li>
     * </ul>
     */
    performHapticFeedbackAsync(): Promise<void> {
        return (window as any).Wortal.performHapticFeedbackAsync();
    }

    /**
     * Gets the supported APIs for the current platform.
     * @example
     * let supportedAPIs = Wortal.getSupportedAPIs();
     * if (supportedAPIs.includes("context.shareAsync")) {
     *    shareWithFriendsDialog.show();
     * }
     * @returns {string[]} Array of supported APIs.
     */
    getSupportedAPIs(): string[] {
        return (window as any).Wortal.getSupportedAPIs();
    }
}
