"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = exports.unload = exports.load = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const PACKAGE_NAME = 'wortal-sdk';
exports.load = () => {
    function log(...arg) {
        return console.log(`[${PACKAGE_NAME}] `, ...arg);
    }
    function error(...arg) {
        return console.error(`[${PACKAGE_NAME}] `, ...arg);
    }
    const project_path = Editor.Project.path;
    const assets_dir = path_1.default.join(project_path, "assets");
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
            version = "3.3";
            break;
        case "3.6.0":
            version = "3.6";
            break;
        default:
            error("Version not supported: " + editor);
            break;
    }
    const static_templates = path_1.default.join(Editor.Project.path, "extensions/" + PACKAGE_NAME + "/templates/");
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
            src: path_1.default.join(static_templates, bridge_dir),
            dest: path_1.default.join(project_path, build_dir, bridge_dest)
        }
    ];
    log("Copying assets..");
    assets.forEach((value) => {
        if (fs_extra_1.pathExistsSync(value.dest) == false) {
            fs_extra_1.copySync(value.src, value.dest);
        }
        else {
            log("Skipping asset: ", value.dest);
        }
    });
    log("Asset copying complete.");
};
exports.unload = () => {
    console.log("[Wortal] Extension disabled.");
};
exports.methods = {
    openPanel() {
        Editor.Panel.open(PACKAGE_NAME);
    },
};
