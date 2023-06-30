import * as _ads from './api/Ads';
import * as _analytics from './api/Analytics';
import * as _context from './api/Context';
import * as _iap from './api/IAP';
import * as _leaderboard from './api/Leaderboard';
import * as _player from './api/Player';
import * as _session from './api/Session';

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
    /** Player API */
    static player = _player;
    /** Session API */
    static session = _session;

    /**
     * Registers a callback for when the game is paused via platform SDK.
     * @param callback
     */
    onPause(callback: Function): void {
        (window as any).Wortal.onPause(() => {
            callback();
        });
    }
}
