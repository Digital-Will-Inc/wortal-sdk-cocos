import {BuildPlugin} from '../@types';
import {copySync, pathExistsSync} from 'fs-extra';
import path from 'path';

const PACKAGE_NAME = 'wortal-sdk';

export const load: BuildPlugin.load = () => {
    function log(...arg: any[]) {
        return console.log(`[${PACKAGE_NAME}] `, ...arg);
    }

    function error(...arg: any[]) {
        return console.error(`[${PACKAGE_NAME}] `, ...arg);
    }

    const project_path = Editor.Project.path;
    const assets_dir = path.join(project_path, "assets");
    const api_dir = "wortal-api";
    const build_dir = "build-templates";
    const bridge_dir = "wortal-bridge";
    const bridge_dest = "web-mobile/assets/js";
    let version = "";
    let editor = Editor.App.version;

    log("Detected editor version: " + editor);

    switch (editor) {
        case "3.0.0":
        case "3.0.1":
        case "3.1.0":
        case "3.1.1":
        case "3.1.2":
        case "3.2.0":
        case "3.2.1":
        case "3.3.0":
        case "3.3.1":
        case "3.3.2":
        case "3.4.0":
        case "3.4.1":
        case "3.4.2":
        case "3.5.0":
        case "3.5.1":
        case "3.5.2":
            version = "3.0";
            break;
        case "3.6.0":
            version = "3.6";
            break;
        default:
            error("Version not supported: " + editor);
            break;
    }

    const static_templates = path.join(Editor.Project.path, "extensions/" + PACKAGE_NAME + "/templates/");
    const versioned_templates = path.join(static_templates + version + "/");

    const assets = [
        {
            src: path.join(versioned_templates, build_dir),
            dest: path.join(project_path, build_dir)
        },
        {
            src: path.join(static_templates, api_dir),
            dest: path.join(assets_dir, api_dir)
        },
        {
            src: path.join(static_templates, bridge_dir),
            dest: path.join(project_path, build_dir, bridge_dest)
        }
    ];

    log("Copying assets..")
    assets.forEach((value: { src: string, dest: string }) => {
        if (pathExistsSync(value.dest) === true) {
            log("Overwriting asset: ", value.dest);
        }
        copySync(value.src, value.dest);
    });
    log("Asset copying complete.")
};

export const unload: BuildPlugin.Unload = () => {
    console.log("[Wortal] Extension disabled.");
};

export const methods: { [key: string]: (...any: any) => any } = {
    openPanel() {
        Editor.Panel.open(PACKAGE_NAME);
    },
};
