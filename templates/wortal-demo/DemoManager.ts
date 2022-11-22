import { _decorator, Component, Node, Button, RichText } from 'cc';
import { Wortal } from "../wortal-api/Wortal";

const {ccclass, property} = _decorator;

@ccclass('DemoManager')
export class DemoManager extends Component {

    @property({type: RichText, visible: true,})
    txtLog: RichText;
    @property({type: Button, visible: true,})
    btnInterstitial: Button;
    @property({type: Button, visible: true,})
    btnRewarded: Button;
    @property({type: Button, visible: true,})
    btnLevelStart: Button;
    @property({type: Button, visible: true,})
    btnLevelEnd: Button;
    @property({type: Button, visible: true,})
    btnLeaderboardGet: Button;
    @property({type: Button, visible: true,})
    btnLeaderboardAdd: Button;
    @property({type: Button, visible: true,})
    btnLeaderboardPlayer: Button;
    @property({type: Button, visible: true,})
    btnLeaderboardAll: Button;
    @property({type: Button, visible: true,})
    btnLeaderboardCount: Button;
    @property({type: Button, visible: true,})
    btnContextChoose: Button;
    @property({type: Button, visible: true,})
    btnContextSwitch: Button;
    @property({type: Button, visible: true,})
    btnContextCreate: Button;
    @property({type: Button, visible: true,})
    btnContextShare: Button;
    @property({type: Button, visible: true,})
    btnContextUpdate: Button;
    @property({type: Button, visible: true,})
    btnContextGetEntry: Button;
    @property({type: Button, visible: true,})
    btnIAPCheck: Button;
    @property({type: Button, visible: true,})
    btnIAPCatalog: Button;
    @property({type: Button, visible: true,})
    btnIAPGet: Button;
    @property({type: Button, visible: true,})
    btnIAPBuy: Button;
    @property({type: Button, visible: true,})
    btnIAPConsume: Button;
    @property({type: Button, visible: true,})
    btnPlayerId: Button;
    @property({type: Button, visible: true,})
    btnPlayerName: Button;
    @property({type: Button, visible: true,})
    btnPlayerPhoto: Button;
    @property({type: Button, visible: true,})
    btnPlayerSetData: Button;
    @property({type: Button, visible: true,})
    btnPlayerGetData: Button;
    @property({type: Button, visible: true,})
    btnPlayerGetFriends: Button;
    @property({type: Button, visible: true,})
    btnPlayerGetSigned: Button;

    purchaseToken: string = "";

    start() {
        this.btnInterstitial.node.on("click", this.callInterstitial, this);
        this.btnRewarded.node.on("click", this.callRewarded, this);
        this.btnLevelStart.node.on("click", this.callLevelStart, this);
        this.btnLevelEnd.node.on("click", this.callLevelEnd, this);
        this.btnLeaderboardGet.node.on("click", this.callLeaderboardGet, this);
        this.btnLeaderboardAdd.node.on("click", this.callLeaderboardAdd, this);
        this.btnLeaderboardPlayer.node.on("click", this.callLeaderboardPlayer, this);
        this.btnLeaderboardAll.node.on("click", this.callLeaderboardAll, this);
        this.btnLeaderboardCount.node.on("click", this.callLeaderboardCount, this);
        this.btnContextChoose.node.on("click", this.callContextChoose, this);
        this.btnContextSwitch.node.on("click", this.callContextSwitch, this);
        this.btnContextCreate.node.on("click", this.callContextCreate, this);
        this.btnContextShare.node.on("click", this.callContextShare, this);
        this.btnContextUpdate.node.on("click", this.callContextUpdate, this);
        this.btnIAPCheck.node.on("click", this.callIAPCheck, this);
        this.btnIAPCatalog.node.on("click", this.callIAPCatalog, this);
        this.btnIAPGet.node.on("click", this.callIAPGet, this);
        this.btnIAPBuy.node.on("click", this.callIAPBuy, this);
        this.btnIAPConsume.node.on("click", this.callIAPConsume, this);
        this.btnPlayerId.node.on("click", this.callPlayerId, this);
        this.btnPlayerName.node.on("click", this.callPlayerName, this);
        this.btnPlayerPhoto.node.on("click", this.callPlayerPhoto, this);
        this.btnPlayerSetData.node.on("click", this.callPlayerSetData, this);
        this.btnPlayerGetData.node.on("click", this.callPlayerGetData, this);
        this.btnPlayerGetFriends.node.on("click", this.callPlayerGetFriends, this);
        this.btnPlayerGetSigned.node.on("click", this.callPlayerGetSigned, this);
    }

    log(msg: string) {
        this.txtLog.string = this.txtLog.string + "\n" + msg;
    }

    callInterstitial() {
        Wortal.ads.showInterstitial('next', "NextLevel",
            () => this.log("Game Paused"),
            () => this.log("Game Resumed"));
    }

    callRewarded() {
        Wortal.ads.showRewarded("BonusPoints",
            () => this.log("Game Paused"),
            () => this.log("Game Resumed"),
            () => this.log("No reward given."),
            () => this.log("Player given reward."));
    }

    callLevelStart() {
        Wortal.analytics.logLevelStart("Demo");
        this.log("LevelStart");
    }

    callLevelEnd() {
        Wortal.analytics.logLevelEnd("Demo", "100", true);
        this.log("LevelEnd");
    }

    callLeaderboardGet() {
        Wortal.leaderboard.getLeaderboardAsync("global")
            .then(leaderboard => this.log("Leaderboard name: " + leaderboard.name))
            .catch(error => this.log(error));
    }

    callLeaderboardAdd() {
        Wortal.leaderboard.sendEntryAsync("global", 100)
            .then((entry: any) => this.log("Leaderboard Score: " + entry.getScore()))
            .catch(error => this.log(error));
    }

    callLeaderboardPlayer() {
        Wortal.leaderboard.getPlayerEntryAsync("global")
            .then((entry: any) => this.log("Leaderboard Score: " + entry.getScore()))
            .catch(error => this.log(error));
    }

    callLeaderboardAll() {
        Wortal.leaderboard.getEntriesAsync("global", 10)
            .then((entries: any) => this.log("Entry count: " + entries.length))
            .catch(error => this.log(error));
    }

    callLeaderboardCount() {
        Wortal.leaderboard.getEntryCountAsync("global")
            .then((count: number) => this.log("Entry count: " + count))
            .catch(error => this.log(error));
    }

    callContextChoose() {
        Wortal.context.chooseAsync({
            image: this.createImg(256, 256),
            text: "Let's play!",
            caption: "Play",
        })
            .then(() => this.log("New context: " + Wortal.context.getId()))
            .catch(error => this.log(error));
    }

    callContextSwitch() {
        Wortal.context.switchAsync("some-player-id")
            .then(() => this.log(Wortal.context.getId()))
            .catch(error => this.log(error));
    }

    callContextCreate() {
        Wortal.context.createAsync("some-player-id")
            .then(() => this.log(Wortal.context.getId()))
            .catch(error => this.log(error));
    }

    callContextShare() {
        Wortal.context.shareAsync({
            image: this.createImg(1200, 1200),
            text: "Let's play!",
            intent: "REQUEST",
            caption: "Play",
        })
            .then((result) => console.log(result))
            .catch(error => this.log(error));
    }

    callContextUpdate() {
        Wortal.context.updateAsync({
            image: this.createImg(256, 256),
            text: "We played!",
            caption: "Play",
            data: {game: "da test"},
        })
            .then(() => this.log(Wortal.context.getId()))
            .catch(error => this.log(error));
    }

    callIAPCheck() {
        let enabled = Wortal.iap.isEnabled();
        this.log("IAP enabled: " + enabled);
    }

    callIAPCatalog() {
        Wortal.iap.getCatalogAsync()
            .then(products => {
                this.log("Product count: " + products.length)
                this.log("Product 1 ID: " + products[0].productID);
            })
            .catch(error => this.log(error));
    }

    callIAPGet() {
        Wortal.iap.getPurchasesAsync()
            .then(purchases => this.log("Purchases count: " + purchases.length))
            .catch(error => this.log(error));
    }

    callIAPBuy() {
        Wortal.iap.makePurchaseAsync({productID: "jp.rgames.wortalsdktest.purchase.llama_pack_1.test"})
            .then(receipt => {
                this.log(receipt.paymentID);
                this.log(receipt.purchaseToken);
                this.purchaseToken = receipt.purchaseToken;
            })
            .catch(error => this.log(error));
    }

    callIAPConsume() {
        Wortal.iap.consumePurchaseAsync(this.purchaseToken)
            .then(_ => this.log("Consumed purchase."))
            .catch(error => this.log(error));
    }

    callPlayerId() {
        let id = Wortal.player.getID();
        this.log(id);
    }

    callPlayerName() {
        let name = Wortal.player.getName();
        this.log(name);
    }

    callPlayerPhoto() {
        let photo = Wortal.player.getPhoto();
        this.log(photo);
    }

    callPlayerSetData() {
        Wortal.player.setDataAsync({
            items: {
                coins: 100,
                boosters: 2
            },
            lives: 3,
        }).catch(error => this.log(error));
    }

    callPlayerGetData() {
        Wortal.player.getDataAsync(['items', 'lives'])
            .then(data => {
                this.log(data['items'].coins);
                this.log(data['items'].boosters);
                this.log(data['lives']);
            })
            .catch(error => this.log(error));
    }

    callPlayerGetFriends() {
        Wortal.player.getConnectedPlayersAsync()
            .then((players: any) => {
                this.log(players.length);
                this.log(players[0].id);
                this.log(players[0].name);
            })
            .catch(error => this.log(error));
    }

    callPlayerGetSigned() {
        Wortal.player.getSignedPlayerInfoAsync()
            .then((player: any) => {
                this.log(player.id);
                this.log(player.signature);
            })
            .catch(error => this.log(error));
    }

    createImg(width: number, height: number): string {
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2d');
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = `hsl(${Math.floor(Math.random() * 360)}deg,20%,50%)`;
        ctx.font = `${width / 16}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('wortal-sdk-est', width / 2, height / 2);
        return canvas.toDataURL();
    }
}

