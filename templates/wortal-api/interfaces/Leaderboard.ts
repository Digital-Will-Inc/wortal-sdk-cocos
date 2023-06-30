import { WortalPlayer } from "../classes/WortalPlayer";

/**
 * Data about a leaderboard.
 */
export interface LeaderboardData {
    id: number;
    name: string;
    contextId: string;
}

/**
 * Data about a leaderboard entry.
 */
export interface LeaderboardEntryData {
    player?: WortalPlayer,
    rank: number,
    score: number,
    formattedScore: string,
    timestamp: number,
    details?: string,
}
