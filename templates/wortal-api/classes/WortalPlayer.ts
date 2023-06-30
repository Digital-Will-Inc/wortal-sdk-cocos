import { WortalPlayerData } from "../interfaces/Player";

/**
 * Represents a single player.
 */
export class WortalPlayer {
    private _current: WortalPlayerData;
    constructor(player: WortalPlayerData) {
        this._current.id = player.id;
        this._current.name = player.name;
        this._current.photo = player.photo;
    }

    get id(): string {
        return this._current.id;
    }

    get name(): string {
        return this._current.name;
    }

    get photo(): string {
        return this._current.photo;
    }
}
