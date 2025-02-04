import { BuildPlugin } from '../@types';
import { copySync, pathExistsSync } from 'fs-extra';
import { compare } from 'compare-versions';
import { existsSync } from "fs";
import path from 'path';

export const load: BuildPlugin.load = () => {
    const project_path = Editor.Project.path;
    const assets_dir = path.join(project_path, "assets");
    const api_dir = "wortal-api";
    const build_dir = "build-templates";
    const demo_dir = "wortal-demo";

    let PACKAGE_NAME = "Wortal";
    let version = "";
    let editor = Editor.App.version;
    log("Detected editor version: " + editor);

    // Versions 3.0.0 - 3.5.2 should use the 3.0 templates. 3.6+ uses the 3.6 template.
    // This is due to major changes in the build template starting in 3.6.0.
    if (compare(editor, "3.0.0", ">=") && compare(editor, "3.5.2", "<=")) {
        version = "3.0";
    } else if (compare(editor, "3.6.0", ">=")) {
        version = "3.6";
    } else {
        error("Version not supported: " + editor);
    }

    if (!existsSync(path.join(project_path, "extensions/" + PACKAGE_NAME))) {
        log("Package not downloaded from Cocos Store, changing extension directory..");
        PACKAGE_NAME = "wortal-sdk";
    }

    const static_templates = path.join(project_path, "extensions/" + PACKAGE_NAME + "/templates/");
    const native_folder = path.join(project_path, "extensions/" + PACKAGE_NAME + "/native");
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
            src: path.join(static_templates, demo_dir),
            dest: path.join(assets_dir, demo_dir)
        },
        {
            src: native_folder,
            dest: path.join(project_path, "native")
        }
    ];

    log("Copying assets..");
    assets.forEach((value: { src: string, dest: string }) => {
        if (pathExistsSync(value.dest) === true) {
            log("Overwriting asset: ", value.dest);
        }
        copySync(value.src, value.dest);
    });
    log("Asset copying complete.");

    function log(...arg: any[]) {
        return console.log(`[${PACKAGE_NAME}] `, ...arg);
    }

    function error(...arg: any[]) {
        return console.error(`[${PACKAGE_NAME}] `, ...arg);
    }
};

export const unload: BuildPlugin.Unload = () => {
    console.log("[Wortal] Extension disabled.");
};
