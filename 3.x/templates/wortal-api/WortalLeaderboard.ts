import { WortalPlayer } from "./WortalPlayer";

/**
 * Gets the leaderboard with the given name. Access the leaderboard API via the Leaderboard returned here.
 * @example
 * Wortal.leaderboard.getLeaderboardAsync('global')
 *  .then(leaderboard => console.log(leaderboard.name());
 * @param name Name of the leaderboard.
 */
export function getLeaderboardAsync(name: string): Promise<Leaderboard> {
    return (window as any).Wortal.leaderboard.getLeaderboardAsync(name);
}

/**
 * Sends an entry to be added to the leaderboard, or updated if already existing. Will only update if the score
 * is a higher than the player's previous entry.
 * @example
 * Wortal.leaderboard.sendEntryAsync('global', 100);
 * @param name Name of the leaderboard.
 * @param score Score for the entry.
 * @param details Optional additional details about the entry.
 * @returns The new entry if one was created, updated entry if the score is higher, or the old entry if no new
 * high score was achieved.
 */
export function sendEntryAsync(name: string, score: number, details: string = ""): Promise<LeaderboardEntry> {
    return (window as any).Wortal.leaderboard.sendEntryAsync(name, score, details);
}

/**
 * Gets a list of leaderboard entries in the leaderboard.
 * @example
 * Wortal.leaderboard.getEntriesAsync('global', 10)
 *  .then(entries => console.log(entries);
 * @param name Name of the leaderboard.
 * @param count Number of entries to get.
 * @param offset Offset from the first entry (top rank) to start the count from. Default is 0.
 * @returns Array of LeaderboardEntry.
 */
export function getEntriesAsync(name: string, count: number, offset: number = 0): Promise<LeaderboardEntry[]> {
    return (window as any).Wortal.leaderboard.getEntriesAsync(name, count, offset);
}

/**
 * Gets the player's entry in the leaderboard.
 * @example
 * Wortal.leaderboard.getPlayerEntryAsync('global')
 *  .then(entry => console.log(entry.rank());
 * @param name Name of the leaderboard.
 * @returns LeaderboardEntry for the player.
 */
export function getPlayerEntryAsync(name: string): Promise<LeaderboardEntry> {
    return (window as any).Wortal.leaderboard.getPlayerEntryAsync(name);
}

/**
 * Gets the total number of entries in the leaderboard.
 * @example
 * Wortal.leaderboard.getEntryCountAsync('global')
 *  .then(entries => console.log(entries);
 * @param name Name of the leaderboard.
 * @returns Number of entries.
 */
export function getEntryCountAsync(name: string): Promise<number> {
    return (window as any).Wortal.leaderboard.getEntryCountAsync(name);
}

/**
 * Gets a list of leaderboard entries of connected players in the leaderboard.
 * Wortal.leaderboard.getConnectedPlayersEntriesAsync('global')
 *  .then(entries => console.log(entries);
 * @param name Name of the leaderboard.
 * @param count Number of entries to get.
 * @param offset Offset from the first entry (top rank) to start the count from. Default is 0.
 * @returns Array of LeaderboardEntry.
 */
export function getConnectedPlayersEntriesAsync(name: string, count: number, offset: number): Promise<LeaderboardEntry[]> {
    return (window as any).Wortal.leaderboard.getConnectedPlayersEntriesAsync(name, count, offset);
}

/**
 * Represents a single leaderboard.
 */
export class Leaderboard {
    private _current: LeaderboardData;
    constructor(id: number, name: string, contextId: string = "") {
        this._current.id = id;
        this._current.name = name;
        this._current.contextId = contextId;
    }

    get name(): string {
        return this._current.name;
    }

    get contextId(): string {
        return this._current.contextId;
    }
}

/**
 * Represents a single entry in a leaderboard.
 */
export class LeaderboardEntry {
    private _current: LeaderboardEntryData;
    constructor(entry: LeaderboardEntryData) {
        this._current.player = entry.player;
        this._current.rank = entry.rank;
        this._current.score = entry.score;
        this._current.formattedScore = entry.formattedScore;
        this._current.timestamp = entry.timestamp;
        this._current.details = entry.details;
    }

    get player(): WortalPlayer {
        return new WortalPlayer(this._current.player!);
    }

    get rank(): number {
        return this._current.rank;
    }

    get score(): number {
        return this._current.score;
    }

    get formattedScore(): string {
        return this._current.formattedScore;
    }

    get timestamp(): number {
        return this._current.timestamp;
    }

    get details(): string {
        return this._current.details!;
    }
}

/**
 * Data about a leaderboard.
 */
interface LeaderboardData {
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