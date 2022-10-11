var gameData = {
    gameName: document.title,
    platform: window.getWortalPlatform(),
    browser: navigator.userAgent,
    country: "",
    isAdBlocked: false,
    linkInterstitialId: "",
    linkRewardedId: "",
    gameTimer: 0,
    levelTimer: 0,
    levelTimerHandle: 0,
    levelName: "",
}

console.log('[Wortal] Platform: ' + gameData.platform);

window.addEventListener("load", () => {
    window.initWortal(function () {
        console.log("[Wortal] Initializing..");
        if (gameData.platform === 'link') {
            _removeLoadingCover();
            if (window.wortalGame) {
                window.wortalGame.initializeAsync().then(() => {
                    window.wortalGame.startGameAsync();
                    _getLinkAdUnitIds();
                });
            }
        } else if (gameData.platform === 'viber') {
            _removeLoadingCover();
            if (window.wortalGame) {
                window.wortalGame.initializeAsync().then(() => {
                    window.wortalGame.startGameAsync();
                });
            }
        } else {
            window.triggerWortalAd("preroll", "", "Preroll", {
                adBreakDone: function () {
                    console.log("[Wortal] AdBreakDone");
                    _removeLoadingCover();
                },
                noShow: function () {
                    console.log("[Wortal] NoShow");
                    _removeLoadingCover();
                }
            });
        }
        console.log("[Wortal] Initialized.");
    }, function () {
        console.log("[Wortal] Ad blocker detected.");
        _removeLoadingCover();
        gameData.isAdBlocked = true;
    });

    window.addEventListener("visibilitychange", function () {
        if (window.visibilityState === "hidden") {
            _logGameEnd();
        }
    });

    _getIntlData()
        .then(response => _logGameStart(response))
        .catch(() => _logGameStart("Nulltherlands"));
});

function _logGameStart(country) {
    gameData.country = country;
    _logEvent("GameStart", {
        game: gameData.gameName,
        platform: gameData.platform,
        browser: gameData.browser,
        country: gameData.country,
    });
    setInterval(function () {
        if (document.visibilityState !== "hidden") {
            gameData.gameTimer += 1;
        }
    }, 1000);
}

function _logGameEnd() {
    _logEvent("GameEnd", {
        game: gameData.gameName,
        timePlayed: gameData.gameTimer,
    });
}

function _logEvent(name, features) {
    let request = new XMLHttpRequest();
    request.open("POST", "https://wombat.digitalwill.co.jp/wortal/events");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({ name, features }));
}

function _getIntlData() {
    return fetch("assets/res/intl-data.json")
        .then(response => response.json())
        .then(data => _getPlayerCountry(data))
        .catch(error => console.log(error));
}

// This uses the time zone setting of the player to determine their country.
// We do this to avoid collecting any personal data on the player for GDPR compliance.
// The location is very coarse and easily spoofed so nothing here can identify the player.
function _getPlayerCountry(data) {
    if (data == null) {
        return "Nulltherlands";
    }
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const arr = zone.split("/");
    const city = arr[arr.length - 1];
    return data[city];
}

function _getLinkAdUnitIds() {
    wortalGame.getAdUnitsAsync().then((adUnits) => {
        console.log("[Wortal] Link AdUnit IDs returned: \n" + adUnits);
        gameData.linkInterstitialId = adUnits[0].id;
        gameData.linkRewardedId = adUnits[1].id;
    });
}

function _removeLoadingCover() {
    document.getElementById("loading-cover").style.display = "none";
}