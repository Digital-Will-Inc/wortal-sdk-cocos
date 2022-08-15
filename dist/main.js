"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = exports.unload = exports.load = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const PACKAGE_NAME = 'wortal';
function log(...arg) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}
exports.load = () => {
    log("ProjectPath:", Editor.Project.path);
    const project_path = Editor.Project.path;
    const assets_dir = path_1.default.join(project_path, "assets");
    const api_dir = "wortal-api";
    const build_dir = "build-templates";
    const templates_dir = path_1.default.join(Editor.Project.path, "extensions/" + PACKAGE_NAME + "/templates/");
    const copy_list = [
        {
            src: path_1.default.join(templates_dir, build_dir),
            dest: path_1.default.join(project_path, build_dir)
        },
        {
            src: path_1.default.join(templates_dir, api_dir),
            dest: path_1.default.join(assets_dir, api_dir)
        }
    ];
    copy_list.forEach((value) => {
        if (fs_extra_1.pathExistsSync(value.dest) == false) {
            fs_extra_1.copySync(value.src, value.dest);
        }
        else {
            console.log("Skipping:", value.dest);
        }
    });
};
exports.unload = () => {
    console.log("[Wortal] Extension disabled.");
};
exports.methods = {
    openPanel() {
        Editor.Panel.open(PACKAGE_NAME);
    },
};
