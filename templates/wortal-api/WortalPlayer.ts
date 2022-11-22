/**
 * Gets the player's ID from the platform.
 * @returns The player's ID.
 */
export function getID(): string {
    return (window as any).Wortal.player.getID();
}

/**
 * Gets the player's name on the platform.
 * @returns The player's name.
 */
export function getName(): string {
    return (window as any).Wortal.player.getName();
}

/**
 * Gets the player's photo from the platform.
 * @returns URL of base64 image for the player's photo.
 */
export function getPhoto(): string {
    return (window as any).Wortal.player.getPhoto();
}

/**
 * Checks whether this is the first time the player has played this game.
 * @returns True if it is the first play. Some platforms always return true.
 */
export function isFirstPlay(): boolean {
    return (window as any).Wortal.player.isFirstPlay();
}

/**
 * Gets the game data with the specific keys from the platform's storage.
 * @example
 * Wortal.player.getDataAsync(['items', 'lives'])
 *  .then(data => {
 *      console.log(data['items]);
 *      console.log(data['lives']);
 *  });
 * @param keys Array of keys for the data to get.
 */
export function getDataAsync(keys: string[]): Promise<any> {
    return (window as any).Wortal.player.getDataAsync(keys);
}

/**
 * Uploads game data to the platform's storage. Max size is 1MB.
 * @example
 * Wortal.player.setDataAsync({
 *     items: {
 *         coins: 100,
 *         boosters: 2
 *     },
 *     lives: 3,
 * });
 * @param data Key-value pairs of the data to upload. Nullable values will remove the data.
 */
export function setDataAsync(data: Record<string, unknown>): Promise<void> {
    return (window as any).Wortal.player.setDataAsync(data);
}

/**
 * Gets the friends of the player who have also played this game before.
 * @example
 * Wortal.player.getConnectedPlayersAsync({
 *     filter: 'ALL',
 *     size: 20,
 *     hoursSinceInvitation: 4,
 * }).then(players => console.log(players.length);
 * @param payload Options for the friends to get.
 * @returns Array of connected players.
 */
export function getConnectedPlayersAsync(payload?: ConnectedPlayerPayload): Promise<WortalPlayer[]> {
    return (window as any).Wortal.player.getConnectedPlayersAsync(payload);
}

/**
 * Gets a signed player object that includes the player ID and signature for validation. This can be used to
 * send something to a backend server for validation, such as game or purchase data.
 * @example
 * Wortal.player.getSignedPlayerInfoAsync()
 *  .then(info => {
 *      myServer.validate(
 *          info.id,
 *          info.signature,
 *          gameDataToValidate,
 *      )
 *  });
 *  @returns Object with player ID and signature.
 *  @see Signature
 */
export function getSignedPlayerInfoAsync(): Promise<object> {
    return (window as any).Wortal.player.getSignedPlayerInfoAsync();
}

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

/**
 * Payload options for players.
 */
export interface ConnectedPlayerPayload {
    cursor?: number;
    filter?: ConnectedPlayerFilter;
    hoursSinceInvitation?: number;
    size?: number;
}

/**
 * Data about a player.
 */
export interface WortalPlayerData {
    id: string;
    name: string;
    photo: string;
}

/**
 * Filters that can be applied to connected player searches.
 */
export type ConnectedPlayerFilter = 'ALL' | 'INCLUDE_PLAYERS' | 'INCLUDE_NON_PLAYERS' | 'NEW_INVITATIONS_ONLY'