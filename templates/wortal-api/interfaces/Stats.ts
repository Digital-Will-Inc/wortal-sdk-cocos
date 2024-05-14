import { StatPeriod, StatValueType } from "../types/stat-types";

/**
 * Represents the stats of a player.
 */
export interface Stats {
    /**
     * Name of the level the stats are for.
     */
    level: string;
    /**
     * The value of the stat.
     */
    value: number;
    /**
     * The period of time over which the stat is tracked.
     */
    period?: StatPeriod;
    /**
     * The type of stat this value represents.
     */
    valueType?: StatValueType;
    /**
     * Whether a lower value is a better value for this stat. Ex: time to complete a level.
     */
    lowerIsBetter?: boolean;
}

/**
 * Payload for getting player stats.
 */
export interface GetStatsPayload {
    /**
     * The period of time over which the stat is tracked.
     */
    period?: StatPeriod;
}

/**
 * Payload used to post a player's stats.
 */
export interface PostStatsPayload {
    /**
     * The period of time over which the stat is tracked.
     */
    period?: StatPeriod;
    /**
     * The type of stat this value represents.
     */
    valueType?: StatValueType;
    /**
     * Whether a lower value is a better value for this stat. Ex: time to complete a level.
     */
    lowerIsBetter?: boolean;
}
