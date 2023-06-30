import { ContextSizeResponse, LinkSharePayload, LocalizableContent } from "../interfaces/Context";
import { ContextFilter, ContextType } from "../types/Context";
import { WortalPlayer } from "./Player";
import { ErrorMessage} from "../interfaces/Wortal";

/**
 * Gets the ID of the current context.
 * @example
 * const id = Wortal.context.getId();
 * console.log(id);
 * @returns {string | null} String ID of the current context if one exists. Null if the player is playing solo or
 * if the game is being played on a platform that does not currently support context.
 */
export function getId(): string | null {
    return (window as any).Wortal.context.getId();
}

/**
 * Gets the type of the current context.
 * @example
 * const type = Wortal.context.getType();
 * console.log(type);
 * @returns {ContextType} The type of the current context.
 */
export function getType(): ContextType {
    return (window as any).Wortal.context.getType();
}

/**
 * Gets an array of WortalPlayer objects containing information about active players in the current context
 * (people who played the game in the current context in the last 90 days).
 * @example
 * Wortal.context.getPlayersAsync()
 *  .then(players => {
 *    console.log(players.length);
 *    console.log(players[0].id);
 *    console.log(players[0].name);
 *    });
 * @returns {Promise<WortalPlayer[]>} Promise that contains an array of players in the current context.
 * This may include the current player.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>NETWORK_FAILURE</li>
 * <li>CLIENT_UNSUPPORTED_OPERATION</li>
 * <li>INVALID_OPERATION</li>
 * </ul>
 */
export function getPlayersAsync(): Promise<WortalPlayer[]> {
    return (window as any).Wortal.context.getPlayersAsync();
}

/**
 * Opens a context selection dialog for the player. If the player selects an available context, the client will attempt
 * to switch into that context, and resolve if successful. Otherwise, if the player exits the menu or the client fails
 * to switch into the new context, this function will reject.
 * @example
 * Wortal.context.chooseAsync()
 *  .then(console.log(Wortal.context.getId()));
 * @param payload Object defining the options for the context choice.
 * @returns {Promise<void>} Promise that resolves when the context is switched.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>INVALID_PARAM</li>
 * <li>SAME_CONTEXT</li>
 * <li>NETWORK_FAILURE</li>
 * <li>USER_INPUT</li>
 * <li>PENDING_REQUEST</li>
 * <li>CLIENT_UNSUPPORTED_OPERATION</li>
 * </ul>
 */
export function chooseAsync(payload?: ContextPayload): Promise<void> {
    return (window as any).Wortal.context.chooseAsync(payload);
}

/**
 * <p>Attempts to create a context between the current player and a specified player or a list of players. This API
 * supports 3 use cases: 1) When the input is a single playerID, it attempts to create or switch into a context between
 * a specified player and the current player 2) When the input is a list of connected playerIDs, it attempts to create
 * a context containing all the players 3) When there's no input, a friend picker will be loaded to ask the player to
 * create a context with friends to play with.</p>
 * <p>For each of these cases, the returned promise will reject if any of the players listed are not Connected Players
 * of the current player, or if the player denies the request to enter the new context. Otherwise, the promise will
 * resolve when the game has switched into the new context.</p>
 * @example
 * Wortal.context.createAsync('player123');
 * @param playerId ID of player to create a context with, or a list of player IDs to create a context with. If not
 * specified, a friend picker will be loaded to ask the player to create a context with friends to play with. Link
 * and Viber will only accept a single, required player ID. If no ID is passed on these platforms the call will fail.
 * If an array of IDs is passed on these platforms, the call will be made with the first ID in the array.
 * @returns {Promise<void>} Promise that resolves when the game has switched into the new context, or rejects otherwise.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>INVALID_PARAM</li>
 * <li>SAME_CONTEXT</li>
 * <li>NETWORK_FAILURE</li>
 * <li>USER_INPUT</li>
 * <li>PENDING_REQUEST</li>
 * <li>CLIENT_UNSUPPORTED_OPERATION</li>
 * </ul>
 */
export function createAsync(playerId?: string | string[]): Promise<void> {
    return (window as any).Wortal.context.createAsync(playerId);
}

/**
 * Request a switch into a specific context. If the player does not have permission to enter that context, or if the
 * player does not provide permission for the game to enter that context, this will reject. Otherwise, the promise will
 * resolve when the game has switched into the specified context.
 * @example
 * Wortal.context.switchAsync('abc123');
 * @param contextId ID of the desired context or the string SOLO to switch into a solo context.
 * @returns {Promise<void>} A promise that resolves when the game has switched into the specified context, or rejects otherwise.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>INVALID_PARAM</li>
 * <li>SAME_CONTEXT</li>
 * <li>NETWORK_FAILURE</li>
 * <li>USER_INPUT</li>
 * <li>PENDING_REQUEST</li>
 * <li>CLIENT_UNSUPPORTED_OPERATION</li>
 * </ul>
 */
export function switchAsync(contextId: string): Promise<void> {
    return (window as any).Wortal.context.switchAsync(contextId);
}

/**
 * This invokes a dialog to let the user share specified content, as a post on the user's timeline, for example.
 * A blob of data can be attached to the share which every game session launched from the share will be able to access
 * from Wortal.session.getEntryPointData(). This data must be less than or equal to 1000 characters when stringified.
 * The user may choose to cancel the share action and close the dialog, and the returned promise will resolve when the
 * dialog is closed regardless if the user actually shared the content or not.
 * @example
 * Wortal.context.shareAsync({
 *     image: 'data:base64Image',
 *     text: 'Share text',
 *     cta: 'Play',
 *     data: { exampleData: 'yourData' },
 * }).then(result => console.log(result)); // Contains shareCount with number of friends the share was sent to.
 * @param payload Object defining the share message.
 * @returns {Promise<number>} Promise that resolves when the platform's friend picker has closed.
 * Includes number of friends the message was shared with. Facebook will always return 0.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>INVALID_PARAM</li>
 * <li>NETWORK_FAILURE</li>
 * <li>PENDING_REQUEST</li>
 * <li>CLIENT_UNSUPPORTED_OPERATION</li>
 * <li>INVALID_OPERATION</li>
 * </ul>
 */
export function shareAsync(payload: ContextPayload): Promise<number> {
    return (window as any).Wortal.context.shareAsync(payload);
}

/**
 * This invokes a dialog that contains a custom game link that users can copy to their clipboard, or share.
 * A blob of data can be attached to the custom link - game sessions initiated from the link will be able to access the
 * data through Wortal.session.getEntryPointData(). This data should be less than or equal to 1000 characters when
 * stringified. The provided text and image will be used to generate the link preview, with the game name as the title
 * of the preview. The text is recommended to be less than 44 characters. The image is recommended to either be a square
 * or of the aspect ratio 1.91:1. The returned promise will resolve when the dialog is closed regardless if the user
 * actually shared the link or not.
 * @example
 * Wortal.context.shareLinkAsync({
 *    image: 'data:base64Image',
 *    text: 'Share text',
 *    data: { exampleData: 'yourData' },
 * })
 * .then(() => resumeGame);
 * @param payload Object defining the payload for the custom link.
 * @returns {Promise<void>} Promise that resolves when the dialog is closed.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>INVALID_PARAM</li>
 * <li>NETWORK_FAILURE</li>
 * <li>PENDING_REQUEST</li>
 * <li>INVALID_OPERATION</li>
 * </ul>
 */
export function shareLinkAsync(payload: LinkSharePayload): Promise<void> {
    return (window as any).Wortal.context.shareLinkAsync(payload);
}

/**
 * Posts an update to the current context. Will send a message to the chat thread of the current context.
 * When players launch the game from this message, those game sessions will be able to access the specified blob
 * of data through Wortal.session.getEntryPointData().
 * @example
 * Wortal.context.updateAsync({
 *     image: 'data:base64Image',
 *     text: 'Update text',
 *     cta: 'Play',
 *     data: { exampleData: 'yourData' },
 * });
 * @param payload Object defining the update message.
 * @returns {Promise<void>} Promise that resolves when the update is sent.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>INVALID_PARAM</li>
 * <li>PENDING_REQUEST</li>
 * <li>INVALID_OPERATION</li>
 * </ul>
 */
export function updateAsync(payload: ContextPayload): Promise<void> {
    return (window as any).Wortal.context.updateAsync(payload);
}

/**
 * This function determines whether the number of participants in the current game context is between a given minimum
 * and maximum, inclusive. If one of the bounds is null only the other bound will be checked against. It will always
 * return the original result for the first call made in a context in a given game play session. Subsequent calls,
 * regardless of arguments, will return the answer to the original query until a context change occurs and the query
 * result is reset.
 * @example
 * const result = Wortal.context.isSizeBetween(2, 4);
 * console.log(result.answer);
 * @param min Minimum number of players in context.
 * @param max Maximum number of players in context.
 * @returns {ContextSizeResponse} Object with the result of the check. Null if not supported.
 */
export function isSizeBetween(min?: number, max?: number): ContextSizeResponse | null {
    return (window as any).Wortal.context.isSizeBetween(min, max);
}

/**
 * Payload for various function calls in the context API.
 */
export interface ContextPayload {
    /**
     * URL of base64 encoded image to be displayed. This is required for the payload to be sent.
     */
    image: string;
    /**
     * Message body. This is required for the payload to be sent.
     */
    text: string | LocalizableContent;
    /**
     * Text of the call-to-action button.
     */
    caption?: string | LocalizableContent;
    /**
     * Text of the call-to-action button.
     */
    cta?: string | LocalizableContent;
    /** Object passed to any session launched from this context message.
     *  Its size must be <=1000 chars when stringified.
     *  It can be accessed from `Wortal.context.getEntryPointData()`.
     */
    data?: Record<string, unknown>;
    /**
     * An array of filters to be applied to the friend list. Only the first filter is currently used.
     */
    filters?: [ContextFilter];
    /**
     * Context maximum size.
     */
    maxSize?: number;
    /**
     * Context minimum size.
     */
    minSize?: number;
    /** Specify how long a friend should be filtered out after the current player sends them a message.
     * This parameter only applies when `NEW_INVITATIONS_ONLY` filter is used.
     * When not specified, it will filter out any friend who has been sent a message.
     */
    hoursSinceInvitation?: number;
    /** Optional customizable text field in the share UI.
     * This can be used to describe the incentive a user can get from sharing.
     */
    description?: string | LocalizableContent;
    /**
     * Message format to be used. There's no visible difference among the available options.
     */
    intent?: 'INVITE' | 'REQUEST' | 'CHALLENGE' | 'SHARE';
    /** Optional property to switch share UI mode.
     *
     * - DEFAULT: Serial contact card with share and skip button.
     * - MULTIPLE: Selectable contact list.
     */
    ui?: 'DEFAULT' | 'MULTIPLE';
    /**
     * Defines the minimum number of players to be selected to start sharing.
     */
    minShare?: number;
    /** Defines how the update message should be delivered.
     *
     * - 'IMMEDIATE': will be sent immediately.
     * - 'LAST': when the game session ends, the latest payload will be sent.
     * - 'IMMEDIATE_CLEAR': will be sent immediately, and also discard any pending `LAST` payloads in the same session.
     */
    strategy?: 'IMMEDIATE' | 'LAST' | 'IMMEDIATE_CLEAR';
    /**
     * Specifies if the message should trigger push notification.
     */
    notifications?: 'NO_PUSH' | 'PUSH';
    /**
     * Specifies where the share should appear.
     */
    shareDestination?: 'NEWSFEED' | 'GROUP' | 'COPY_LINK' | 'MESSENGER';
    /**
     * Should the player switch context or not.
     */
    switchContext?: boolean;
    /**
     * Not used
     */
    action?: 'CUSTOM';
    /**
     * Not used
     */
    template?: string;
}
