# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [3.1.1] - 2024-11-08
### Added
- Session
  - isAudioEnabled
  - onAudioStatusChange
- Core
  - onResume

## [3.1.0] - 2024-09-09
###
- Ad
  - Add isEnabled
  
## [3.0.0] - 2024-05-15
### BREAKING CHANGE
- Auto initialization has been removed. You must now call Wortal.initializeAsync() and Wortal.startGameAsync() manually to initialize the SDK.

### Added
- Core
  - Compatibility with Wortal 2.0
  - Add Achievements API
  - Add Stats API
- Ads
  - Support for ads on Telegram

## [2.5.2] - 2023-10-17
### Added
- Ads
  - Banner ads

## [2.5.1] - 2023-08-28
### Added
- Core
  - setLoadingProgress API

## [2.5.0] - 2023-08-23
### Added
- Core
  - Tournaments API
  - Manual initialization option
- Ads
  - isAdBlocked API
- IAP
  - Facebook-specific parameters in interfaces
- Session
  - getDevice, getOrientation, onOrientationChanged APIs

### Fixed
- Core
  - Syntax error in application.ejs template

### Changed
- Core
  - Updated SDK Core to v1.6

## [2.4.0] - 2023-07-03
### Added
- Core
  - Added Notifications API
  - New APIs: getSupportedAPIs, performHapticFeedbackAsync
- Analytics
  - New events: logSocialInvite, logSocialShare, logPurchase, logPurchaseSubscription
- Context
  - New APIs: inviteAsync, shareLinkAsync, isSizeBetween
  - New payload types

### Fixed
- Player
  - Typo in getASIDAsync function name

### Changed
- Core
  - Organized api, classes, types and interfaces
  - Updated demo manager

## [2.3.0] - 2023-04-24
### Added
- Ads on Viber
- Group chat context for FB Instant Games
- Game ID parsing for FB Instant Games
- Converter util for FB leaderboards
- Ads API: noFill callback for ad calls
- Context APIs: getType, getPlayersAsync, shareLinkAsync, isSizeBetween
- Player API: flushDataAsync, getASIDAsync, getSignedASIDAsync, canSubscribeBotAsync, subscribeBotAsync
- Session API: getPlatform

### Changed
- Context and Player APIs now have optional null return values to match platform SDKs
- Improved docs
- Improved error handling

## [2.2.0] - 2023-02-21
### Added
- Support for Facebook Instant Games platform
- onPause callback

### Fixed
- Possible type mismatch for ad unit IDs

## [2.1.0] - 2022-12-06
### Added
- Support for Game Distribution platform

### Fixed
- Typos in documentation

### Changed
- Upgraded to SDK Core 1.2.0

## [2.0.1] - 2022-11-22
### Changed
- Context API calls now only accept ContextPayload parameters
- Updated to SDK Core v1.1.1

## [2.0.0] - 2022-11-17
### Breaking Change
- API access is now by module (Wortal.ads, Wortal.analytics)

### Added
- Context API
- In-App Purchase API
- Leaderboard API
- Player API
- Session API
- Examples in documentation

### Changed
- Extension now uses Wortal SDK Core
- SDK no longer needs init call

## [1.1.1] - 2022-10-04
### Added
- Support for ad blockers

### Fixed
- Possible null ref in init call for some platforms

### Changed
- SDK is now open source
- Condensed bridge scripts into one init script
- Removed overloaded ad calls

## [1.1.0] - 2022-09-23
### Added
- Analytics API

### Fixed
- beforeReward callback not called
- noShow callback not firing on some platforms

### Changed
- Improved logging and documentation

## [1.0.9] - 2022-09-07
### Fixed
- adShowing flag not reset when ad not filled

## [1.0.8] - 2022-09-01
### Added
- Support for Cocos Store installation or local

## [1.0.7] - 2022-09-01
### Fixed
- Incorrect extension path when downloading from Cocos Store

## [1.0.6] - 2022-08-31
### Added
- Demo scene and script

### Fixed
- Multiple ad calls can no longer be made simultaneously

### Changed
- Removed extension panel
- Improved readme

## [1.0.5] - 2022-08-26
### Changed
- Extension now overwrites existing wortal assets when loaded. This allows for upgrading in place.
- 3.3 versioned template is now 3.0 to reflect compatibility change

## [1.0.4] - 2022-08-25
### Fixed
- Issue preventing panel from being displayed in Cocos 3.0-3.2

### Changed
- Simplified panel

## [1.0.3] - 2022-08-25
### Added
- Support for Cocos Creator 3.6

### Changed
- Build templates are now versioned
- Wortal bridge scripts are separated from the build templates

## [1.0.2] - 2022-08-19
### Changed
- Improved documentation
- Version compatibility is now 3.3

## [1.0.1] - 2022-08-18
### Fixed
- Possible duplicate init call

### Changed
- Wortal.requestRewarded was changed to Wortal.showRewarded for consistency across the API
- GetPlatform and GetLinkAdUnitIds were changed to getPlatform and getLinkAdUnitIds to follow style convention

## [1.0.0] - 2022-08-17
- Initial release
