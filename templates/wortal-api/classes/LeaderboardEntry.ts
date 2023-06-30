import { LeaderboardEntryData } from "../interfaces/Leaderboard";
import { WortalPlayer } from "./WortalPlayer";

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
