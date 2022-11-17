import * as _ads from './WortalAds';
import * as _analytics from './WortalAnalytics';
import * as _context from './WortalContext';
import * as _iap from './WortalIAP';
import * as _leaderboard from './WortalLeaderboard';
import * as _player from './WortalPlayer';
import * as _session from './WortalSession';

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
}