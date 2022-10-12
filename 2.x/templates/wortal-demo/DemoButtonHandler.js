const wortal = require('wortal');

cc.Class({
    extends: cc.Component,

    properties: {
        buttonInterstitial: cc.Button,
        buttonRewarded: cc.Button,
        buttonLevelStart: cc.Button,
        buttonLevelEnd: cc.Button,
    },

    onLoad() {
        this.buttonInterstitial.node.on('click', this.callInterstitial, this);
        this.buttonRewarded.node.on('click', this.callRewarded, this);
        this.buttonLevelStart.node.on('click', this.callLevelStart, this);
        this.buttonLevelEnd.node.on('click', this.callLevelEnd, this);
    },

    callInterstitial() {
        wortal.showInterstitial(wortal.Placement.NEXT, 'NextLevel', this.pauseGame, this.resumeGame);
    },

    callRewarded() {
        wortal.showRewarded('ReviveAndContinue', this.pauseGame, this.resumeGame, this.skipReward, this.rewardPlayer);
    },

    callLevelStart() {
        wortal.logLevelStart('DemoLevel');
    },

    callLevelEnd() {
        wortal.logLevelEnd('DemoLevel', '100', true);
    },

    pauseGame() {
        // Pause the game and audio here.
    },

    resumeGame() {
        // Resume the game and audio here.
    },

    skipReward() {
        // Do not reward the player. This callback is useful for scenarios in which the game flow depends on whether
        // the player gets rewarded or not.
        // Ex: Player dies and can watch a rewarded ad to be revived and continue.
        // If the ad is not watched then the player loses and has to restart.
    },

    rewardPlayer() {
        // Reward the player.
    },
});
