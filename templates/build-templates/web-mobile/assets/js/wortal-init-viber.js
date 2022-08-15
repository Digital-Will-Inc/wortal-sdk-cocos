window.addEventListener("load", () => {
    window.initWortal(function () {
        console.log("[Wortal] Setup complete.");
        if (window.wortalGame) {
            document.getElementById("loading-cover").style.display = "none";
            wortalGame = window.wortalGame;
            wortalGame.initializeAsync().then(() => {
                wortalGame.startGameAsync();
            });
        } else {
            console.error("[Wortal] Failed to find wortalGame.");
        }
    });
});