import {_decorator, Component, JsonAsset, resources} from 'cc';

const { ccclass, property } = _decorator;

@ccclass('WortalUtil')
export class WortalUtil extends Component {
    static async LoadIntlData(): Promise<Object> {
        return new Promise((resolve, reject) => {
            resources.load("wortal/intl-data", JsonAsset, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result.json);
            });
        });
    }
}