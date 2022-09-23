# Wortal SDK Cocos Creator

Cocos Creator Extension for the Wortal SDK to deploy games on the Digital Will HTML5 Game Portal.

This extension provides the SDK and build template necessary to deploy a game to [Wortal](https://html5gameportal.com/). 
You will need a developer account to access the dashboard where you can upload your game. You can register for a
developer account [here](https://html5gameportal.com/register-developer/).

The SDK allows developers to add interstitial and rewarded ads to their games, leveraging our platform
to monetize your game. You can find out more about our platform [here](https://html5gameportal.com/).

Wortal SDK is designed for an effortless installation that doesn't require any special codes or
configuration IDs to be added to your game. Simply install the extension, call for an ad in your game code
when you want one, and let us handle the rest!

**Please note that Wortal is a curated platform, you will need to [register as a developer](https://html5gameportal.com/register-developer/) first. 
Only after being approved should you install the Wortal extension into your game.**

## Installation

- Install the extension from the Cocos Store.

## Enable Extension

- Open the Extension Manager
- Select the Project tab
- Ensure `wortal-sdk` is enabled

## Using Wortal SDK

### Initialize Wortal

You should call `Wortal.init()` when your game first loads. If this is not called, it will be called automatically the
first time you call for an ad. In this case it is possible for the first ad call to be skipped if the SDK has not
finished initializing.

You will need to import the `Wortal` class wherever you intend to call for ads.

```typescript
import { Placement, Wortal } from '../wortal-api/Wortal';

start() {
    Wortal.init();
}
```

### Interstitial Ads

Calling for interstitial ads is simple and can be done with one line of code:

```typescript
Wortal.showInterstitial(type, description, beforeAdCallback, afterAdCallback);

// Example:
levelDone() {
    Wortal.showInterstitial(Placement.NEXT, 'NextLevel', pauseGame, resumeGame);
}
```

### Rewarded Ads

Calling for rewarded ads is similar to interstitial ads, but with a slightly different signature:

```typescript
Wortal.showRewarded(description, beforeAdCallback, afterAdCallback, adDismissedCallback, adViewedCallback);

// Example:
playerDied() {
    Wortal.showRewarded('ReviveAndContinue', pauseGame, resumeGame, endLevel, revivePlayer);
}
```

NOTE: Players should only be rewarded in the `adViewed` callback.

### Analytics
**DISCLAIMER: No personal data is collected, processed or transmitted from players or games via the Wortal SDK.
All data is anonymous and compliant with GDPR requirements.**

The Analytics API can be used to track game events that can help better understand how players are interacting with
the game. This data will be available for viewing in the Wortal dashboard.

```typescript
// Log an event at the beginning of the level.
Wortal.logLevelStart('Level1');

// Log an event at the end of the level which will track how long it took the player to finish.
Wortal.logLevelEnd('Level1', true, '100');

// Log the player’s choice when offered different options. 
// This can be useful for determining which characters are more popular, or paths are more commonly taken, etc. 
// This can be a powerful tool for balancing the game and giving the players more of what they enjoy.
Wortal.logGameChoice('Character', 'Blue');

// Other events:
Wortal.logLevelUp('Level10');
Wortal.logScore('52');
Wortal.logTutorialStart();
Wortal.logTutorialEnd();

// By default the following events are logged automatically:

// Logged when the SDK is initialized. Sends the name of the game, browser, platform,
// player's country and starts the game timer.
logGameStart();

// Logged when the tab/window becomes hidden. Sends the name of the game and the length of play.
// Due to differences in browsers and devices, this is not enitrely reliable and may not be called
// before the browser is closed.
logGameEnd();
```

## Building
To use the <b>WortalSDK</b> in your game, you must build with the <b>web-mobile</b> template.  This is included in the
extension and handles all the necessary setup.

## Upgrading the Extension
The extension will overwrite any of its existing assets when loaded with the new versions, if any changes
were made to these assets it is <b>strongly recommended</b> you move them to a different directory before starting this process
to prevent losing the changes.

To upgrade the extension follow these steps:
- Open the Extension Manager
- Select the Project tab
- Remove `wortal-sdk`
- Wait for the Cocos notification that the removal was completed
- Add the new version of the `wortal-sdk`

## Removing the Extension
- Open the Extension Manager
- Select the Project tab
- Remove `wortal-sdk`
- Delete the following directories:
    - assets/resources/wortal
    - assets/wortal-api
    - assets/wortal-demo
    - build-templates

## Support
Any support related inquiries can be sent to [support@digitalwill.co.jp](mailto:support@digitalwill.co.jp).