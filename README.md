# Wortal SDK Cocos Creator

Cocos Creator Extension for the Wortal SDK to deploy games on the Digital Will HTML5 Game Portal.

## Installation

- Install the extension from the Cocos Store.

## Enable Extension

- Open the Extension Manager
- Select the Project tab
- Ensure `wortal-sdk` is enabled

## Using Wortal SDK

### Initialize Wortal

You should call `Wortal.init()` when your game loads. If this is not called, it will be called automatically the
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

## Building
To use the <b>WortalSDK</b> in your game, you must build with the <b>web-mobile</b> template.  This is included in the
extension and handles all the necessary setup.