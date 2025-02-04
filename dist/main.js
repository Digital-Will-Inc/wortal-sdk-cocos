"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = void 0;
const fs_extra_1 = require("fs-extra");
const compare_versions_1 = require("compare-versions");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const load = () => {
    const project_path = Editor.Project.path;
    const assets_dir = path_1.default.join(project_path, "assets");
    const api_dir = "wortal-api";
    const build_dir = "build-templates";
    const demo_dir = "wortal-demo";
    let PACKAGE_NAME = "Wortal";
    let version = "";
    let editor = Editor.App.version;
    log("Detected editor version: " + editor);
    // Versions 3.0.0 - 3.5.2 should use the 3.0 templates. 3.6+ uses the 3.6 template.
    // This is due to major changes in the build template starting in 3.6.0.
    if ((0, compare_versions_1.compare)(editor, "3.0.0", ">=") && (0, compare_versions_1.compare)(editor, "3.5.2", "<=")) {
        version = "3.0";
    }
    else if ((0, compare_versions_1.compare)(editor, "3.6.0", ">=")) {
        version = "3.6";
    }
    else {
        error("Version not supported: " + editor);
    }
    if (!(0, fs_1.existsSync)(path_1.default.join(project_path, "extensions/" + PACKAGE_NAME))) {
        log("Package not downloaded from Cocos Store, changing extension directory..");
        PACKAGE_NAME = "wortal-sdk";
    }
    const static_templates = path_1.default.join(project_path, "extensions/" + PACKAGE_NAME + "/templates/");
    const versioned_templates = path_1.default.join(static_templates + version + "/");
    const assets = [
        {
            src: path_1.default.join(versioned_templates, build_dir),
            dest: path_1.default.join(project_path, build_dir)
        },
        {
            src: path_1.default.join(static_templates, api_dir),
            dest: path_1.default.join(assets_dir, api_dir)
        },
        {
            src: path_1.default.join(static_templates, demo_dir),
            dest: path_1.default.join(assets_dir, demo_dir)
        },
    ];
    log("Copying assets..");
    assets.forEach((value) => {
        if ((0, fs_extra_1.pathExistsSync)(value.dest) === true) {
            log("Overwriting asset: ", value.dest);
        }
        (0, fs_extra_1.copySync)(value.src, value.dest);
    });
    log("Asset copying complete.");
    function log(...arg) {
        return console.log(`[${PACKAGE_NAME}] `, ...arg);
    }
    function error(...arg) {
        return console.error(`[${PACKAGE_NAME}] `, ...arg);
    }
};
exports.load = load;
const unload = () => {
    console.log("[Wortal] Extension disabled.");
};
exports.unload = unload;
