import { TournamentData } from "../interfaces/tournament";

/**
 * Represents a tournament in the game.
 */
export class Tournament {
    private _current: TournamentData = {
        id: "",
        contextID: "",
        endTime: 0,
    }

    /** @hidden */
    constructor(id: string, contextID: string, endTime: number, title?: string, payload?: string) {
        this._current.id = id;
        this._current.contextID = contextID;
        this._current.endTime = endTime;
        this._current.title = title;
        if (typeof payload === "string") {
            this._current.payload = JSON.parse(payload);
        }
    }

    get id(): string {
        return this._current.id;
    }

    get contextID(): string {
        return this._current.contextID;
    }

    get endTime(): number {
        return this._current.endTime;
    }

    get title(): string | undefined {
        return this._current.title;
    }

    get payload(): object | undefined {
        return this._current.payload;
    }
}
