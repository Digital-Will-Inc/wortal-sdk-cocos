window.addEventListener("load", () => {
    window.initWortal(function () {
        if (window.wortalGame) {
            wortalGame = window.wortalGame;
            Promise.all([showGame(), wortalGame.initializeAsync()])
                .then(() => {
                    wortalGame.startGameAsync();
                })
        } else {
            showGame();
        }
    });
});

function showGame() {
    document.getElementById("loading-cover").style.display = "none";
}