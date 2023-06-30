import { InviteFilter, InviteSectionType } from "../types/Context";

/**
 * Payload for context.inviteAsync. Defines the content to be sent in the invite.
 */
export interface InvitePayload {
    /**
     * Data URL of base64 encoded image to be displayed. This is required for the payload to be sent.
     */
    image: string;
    /**
     * A text message, or an object with the default text as the value of 'default' and another object mapping locale keys to translations as the value of 'localizations'.
     */
    text: string | LocalizableContent;
    /**
     * Text of the call-to-action button.
     */
    cta?: string | LocalizableContent;
    /**
     * An optional title to display at the top of the invite dialog instead of the generic title.
     * This param is not sent as part of the message, but only displays in the dialog header.
     * The title can be either a string or an object with the default text as the value of 'default' and another object
     * mapping locale keys to translations as the value of 'localizations'.
     *
     * PLATFORM NOTE: Facebook only.
     */
    dialogTitle? : string | LocalizableContent;
    /**
     * Object passed to any session launched from this context message.
     * Its size must be <=1000 chars when stringified.
     * It can be accessed from `Wortal.session.getEntryPointData()`.
     */
    data?: Record<string, unknown>;
    /**
     * The set of filters to apply to the suggestions. Multiple filters may be applied. If no results are returned when
     * the filters are applied, the results will be generated without the filters.
     */
    filters?: InviteFilter[];
    /**
     * The set of sections to be included in the dialog. Each section can be assigned a maximum number of results to be
     * returned (up to a maximum of 10). If no max is included, a default max will be applied. Sections will be included
     * in the order they are listed in the array. The last section will include a larger maximum number of results, and
     * if a maxResults is provided, it will be ignored. If this array is left empty, default sections will be used.
     *
     * PLATFORM NOTE: Facebook only.
     */
    sections?: InviteSection[];
}

/**
 * Represents a custom link to be shared by the user.
 */
export interface LinkSharePayload {
    /**
     * A base64 encoded image to be shown for the link preview. The image is recommended to either be a square or of
     * the aspect ratio 1.91:1
     */
    image?: string;
    /**
     * A text description for the link preview. Recommended to be less than 44 characters
     */
    text?: string;
    /**
     * A blob of data to associate with the shared link. All game sessions launched from the share will be able to
     * access this blob through Wortal.session.getEntryPointData().
     */
    data: Record<string, unknown>;
}

/**
 * Enable passing localizable content to API calls.
 * SDK will use the current player's locale for locale matching.
 */
export interface LocalizableContent {
    /** T
     * ext will be used if not finding matching locale
     * */
    default: string;
    /**
     * Key value pairs of localized strings
     * */
    localizations: Record<string, string>;
}

/**
 * Response from context.isSizeBetween API. Contains the answer and the min and max size.
 */
export interface ContextSizeResponse {
    answer: boolean,
    maxSize: number,
    minSize: number,
}

/**
 * Represents a section in the inviteAsync dialog that contains suggested matches. The sections will be shown in the
 * order they are included in the array, and the last section will contain as many results as possible.
 */
export interface InviteSection {
    /**
     * The type of section to include in the inviteAsync dialog
     */
    sectionType: InviteSectionType;
    /**
     * Optional maximum number of results to include in the section. This can be no higher than 10. This will be
     * disregarded for the last section, which will contain as many results as possible. If not included, the default
     * maximum number of results for that section type will be used.
     */
    maxResults?: number;
}
