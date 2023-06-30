/**
 * The type of the current game context.
 *
 * - `SOLO` - Default context, where the player is the only participant.
 * - `THREAD` - A chat thread.
 * - `POST` - A Facebook post - FB only
 * - `GROUP` - A Facebook group - FB only.
 */
export type ContextType = 'SOLO' | 'THREAD' | 'GROUP' | 'POST';

/**
 * Defines the filtering behavior
 *
 * - `NEW_CONTEXT_ONLY` only enlists contexts that the current player is in, but never participated in (e.g. a new context created by a friend).
 * - `INCLUDE_EXISTING_CHALLENGES` enlists contexts that the current player has participated before.
 * - `NEW_PLAYERS_ONLY` only enlists friends who haven't played this game before.
 * - `NEW_INVITATIONS_ONLY` only enlists friends who haven't been sent an in-game message before. This filter can be fine-tuned with `hoursSinceInvitation` parameter.
 */
export type ContextFilter = 'NEW_CONTEXT_ONLY'
    | 'INCLUDE_EXISTING_CHALLENGES'
    | 'NEW_PLAYERS_ONLY'
    | 'NEW_INVITATIONS_ONLY';
