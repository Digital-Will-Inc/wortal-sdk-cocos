# Wortal SDK for Cocos Creator 2.x

## Installation

- Install the extension from the [Cocos Store](https://store.cocos.com/app/en/detail/4067).

### Building
To use the <b>Wortal SDK</b> in your game, you must build with the <b>web-mobile</b> template.  This is included in the
extension and handles all the necessary setup.

## How to Use

You will need to require the `wortal` class wherever you intend to call for ads.

```javascript
const wortal = require('wortal');
```

### Interstitial Ads

Calling for interstitial ads is simple and can be done with one line of code:

```javascript
wortal.showInterstitial(placement, description, beforeAdCallback, afterAdCallback);

// Example:
levelDone() {
    wortal.showInterstitial(wortal.Placement.NEXT, 'NextLevel', this.pauseGame, this.resumeGame);
}
```

### Rewarded Ads

Calling for rewarded ads is similar to interstitial ads, but with a slightly different signature:

```javascript
wortal.showRewarded(description, beforeAdCallback, afterAdCallback, adDismissedCallback, adViewedCallback);

// Example:
playerDied() {
    wortal.showRewarded('ReviveAndContinue', this.pauseGame, this.resumeGame, this.endLevel, this.revivePlayer);
}
```

**NOTE**: Players should only be rewarded in the `adViewed` callback.

### Analytics
**NOTE**: No personal data is collected, processed or transmitted from players or games via the Wortal SDK.
All data is anonymous and compliant with GDPR requirements.

The Analytics API can be used to track game events that can help better understand how players are interacting with
the game. This data will be available for viewing in the Wortal dashboard.

```javascript
// Log an event at the beginning of the level.
wortal.logLevelStart('Level1');

// Log an event at the end of the level which will track how long it took the player to finish.
wortal.logLevelEnd('Level1', '100', true);

// Log the player’s choice when offered different options. 
// This can be useful for determining which characters are more popular, or paths are more commonly taken, etc. 
// This can be a powerful tool for balancing the game and giving the players more of what they enjoy.
wortal.logGameChoice('Character', 'Blue');

// Other events:
wortal.logLevelUp('Level10');
wortal.logScore('52');

// By default the following events are logged automatically:

// Logged when the SDK is initialized. Sends the name of the game, browser, platform,
// player's country and starts the game timer.
logGameStart();

// Logged when the tab/window becomes hidden. Sends the name of the game and the length of play.
// Due to differences in browsers and devices, this is not enitrely reliable and may not be called
// before the browser is closed.
logGameEnd();
```