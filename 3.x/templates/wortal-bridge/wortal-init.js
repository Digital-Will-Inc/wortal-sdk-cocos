var isAdBlocked = false;
let platform = window.getWortalPlatform();
console.log('[Wortal] Platform: ' + platform);

window.addEventListener("load", () => {
    window.initWortal(function () {
        console.log("[Wortal] Initializing..");
        if (platform === 'link' || platform === 'viber') {
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
        isAdBlocked = true;
    });
});

function _removeLoadingCover() {
    document.getElementById("loading-cover").style.display = "none";
}