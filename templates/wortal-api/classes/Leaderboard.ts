import { LeaderboardData } from "../interfaces/Leaderboard";

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
