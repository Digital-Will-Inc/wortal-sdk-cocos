/**
 * Types of ad placements as defined by Google:
 * https://developers.google.com/ad-placement/docs/placement-types
 */
const Placement = {
    /// Your game has loaded, the UI is visible and sound is enabled, the player can interact with the game, but the
    /// game play has not started yet.
    START: 'start',
    /// The player pauses the game.
    PAUSE: 'pause',
    /// The player navigates to the next level.
    NEXT: 'next',
    /// The player explores options outside of gameplay.
    BROWSE: 'browse',
};

module.exports = {
    Placement,

    /**
     * Shows an interstitial ad.
     * @param {Placement} placement Type of ad placement.
     * @param {string} description Description of the ad placement. Ex: "NextLevel"
     * @param {function} beforeAd Callback for when the ad is ready to be shown. Pause the game here.
     * @param {function} afterAd Callback for after the ad has been shown. Resume the game here.
     */
    showInterstitial(placement, description, beforeAd, afterAd) {
        if (gameData.isAdBlocked) {
            console.warn("[Wortal] Ads are blocked. Calling afterAd()");
            afterAd();
            return;
        }

        // We should always receive only one of the following callbacks: afterAd, noShow or noBreak.
        // They all signal that the ad event is complete and that we should resume the game now.
        window.triggerWortalAd(placement, gameData.linkInterstitialId, description, {
            beforeAd: beforeAd,
            afterAd: afterAd,
            noShow: afterAd,
            noBreak: afterAd,
            adBreakDone: () => console.log("[Wortal] AdBreakDone")
        });
    },

    /**
     * Shows a rewarded ad.
     * @param {string} description Description of the ad placement. Ex: "ReviveAndContinue"
     * @param {function} beforeAd Callback for when the ad is ready to be shown. Pause the game here.
     * @param {function} afterAd Callback for after the ad has been shown. Resume the game here.
     * @param {function} adDismissed Callback for when the ad has been skipped. Do not reward the player.
     * @param {function} adViewed Callback for when the ad has been watched. Reward the player.
     */
    showRewarded(description, beforeAd, afterAd, adDismissed, adViewed) {
        if (gameData.isAdBlocked) {
            console.warn("[Wortal] Ads are blocked. Calling afterAd()");
            adDismissed();
            afterAd();
            return;
        }

        // We should always receive only one of the following callbacks: afterAd, noShow or noBreak.
        // They all signal that the ad event is complete and that we should resume the game now.
        window.triggerWortalAd('reward', gameData.linkRewardedId, description, {
            beforeAd: beforeAd,
            afterAd: afterAd,
            noShow: afterAd,
            noBreak: afterAd,
            adDismissed: adDismissed,
            adViewed: adViewed,
            // This is only called on AdSense, we need to call showAdFn() here to trigger the ad to show.
            beforeReward: function (showAdFn) { showAdFn(); },
            adBreakDone: () => console.log("[Wortal] AdBreakDone")
        });
    },

    /**
     * Logs an event for the player starting a level. This will trigger a level timer with the given level name. If
     * logLevelEnd() is called with the same level name, it will record the time it took the player to finish the level.
     * @param level {string} Level the player started.
     * @return {number} ID of the timer being used to track the level time.
     */
    logLevelStart(level) {
        if (gameData.levelTimerHandle != null) {
            clearInterval(gameData.levelTimerHandle);
            gameData.levelTimerHandle = null;
        }
        gameData.levelName = level;
        gameData.levelTimer = 0;
        gameData.levelTimerHandle = setInterval(() => gameData.levelTimer += 1, 1000);
        _logEvent("LevelStart", {
            game: gameData.gameName,
            level: level,
        });
    },

    /**
     * Logs an event for the player ending a level. Also logs how long it took the player to complete the level if
     * logLevelStart() was called before this with the same level variable.
     * @param level {string} Level the player played.
     * @param score {string} Score the player achieved in the level.
     * @param wasCompleted {boolean} Did the player complete the level or not.
     */
    logLevelEnd(level, score, wasCompleted) {
        if (gameData.levelTimerHandle != null) {
            clearInterval(gameData.levelTimerHandle);
            gameData.levelTimerHandle = null;
        }
        if (gameData.levelName !== level) {
            gameData.levelTimer = 0;
        }
        _logEvent("LevelEnd", {
            game: gameData.gameName,
            level: level,
            time: gameData.levelTimer,
            score: score,
            complete: wasCompleted,
        });
        gameData.levelTimer = 0;
    },

    /**
     * Logs an event when the player levels up.
     * @param level {string} Level the player achieved.
     */
    logLevelUp(level) {
        _logEvent("LevelUp", {
            game: gameData.gameName,
            level: level,
        });
    },

    /**
     * Logs the players score. This can be used to record a high score or track scores across different points in the
     * game to determine difficulty level or imbalances.
     * @param {string} score Score the player achieved.
     */
    logScore(score) {
        _logEvent("PostScore", {
            game: gameData.gameName,
            score: score,
        });
    },

    /**
     * Logs a choice the player makes in the game. This can be useful for determining which characters are more
     * popular, which paths are more commonly taken, etc. This can be a powerful tool for balancing the game and
     * giving the players more of what they enjoy.
     * @param {string} decision Decision the player was faced with. Ex: Character
     * @param {string} choice Choice the player made. Ex: Blue Dog
     */
    logGameChoice(decision, choice) {
        _logEvent("GameChoice", {
            game: gameData.gameName,
            decision: decision,
            choice: choice,
        });
    },
}