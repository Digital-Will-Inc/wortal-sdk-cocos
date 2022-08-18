# Wortal SDK Cocos Creator

Cocos Creator Extension for the Wortal SDK to deploy games on the Digital Will HTML5 Game Portal.

## Installation

- Install the extension from the <a href="https://notyet.sry">Cocos Store</a>.
- Download the extension from <a href="https://alsonothappening.lol">here</a>.

## Enable Extension

- Open the Extension Manager
- Select the Project tab
- Ensure `wortal` is enabled

## Using Wortal SDK

### Initialize Wortal

You should call `Wortal.init()` when your game loads. If this is not called, it will be called automatically the
first time you call for an ad. In this case it is possible for the first ad call to be skipped if the SDK has not
finished initializing.

You will need to import the `Wortal` class wherever you intend to call for ads.

```typescript
import { Placement, Wortal } from '../wortal-api/Wortal';
```

### Interstitial Ads

Calling for interstitial ads is simple and can be done with one line of code:

```typescript
Wortal.showInterstitial(type, description, beforeAdCallback, afterAdCallback);

// Example:
Wortal.showInterstitial(Placement.NEXT, 'NextLevel', pauseGame, resumeGame);
```

### Rewarded Ads

Calling for rewarded ads is similar to interstitials, but with more callbacks:

```typescript
Wortal.showRewarded(description, beforeAdCallback, afterAdCallback, adDismissedCallback, adViewedCallback);

// Example:
Wortal.showRewarded('ReviveAndContinue', pauseGame, resumeGame, noReward, rewardPlayer);
```

## Building
To use the <b>WortalSDK</b> in your game, you must build with the <b>web-mobile</b> template.