import { BuildPlugin } from '../@types';
import { existsSync, copySync, pathExistsSync } from 'fs-extra';
import path from 'path';

const PACKAGE_NAME = 'wortal-sdk';

function log(...arg: any[]) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}

export const load: BuildPlugin.load = () => {
    log("ProjectPath:", Editor.Project.path);

    const project_path = Editor.Project.path;
    const assets_dir = path.join(project_path, "assets");
    const api_dir = "wortal-api"
    const build_dir = "build-templates";
    const templates_dir = path.join(Editor.Project.path, "extensions/" + PACKAGE_NAME + "/templates/");

    const copy_list = [
        {
            src: path.join(templates_dir, build_dir),
            dest: path.join(project_path, build_dir)
        },
        {
            src: path.join(templates_dir, api_dir),
            dest: path.join(assets_dir, api_dir)
        }
    ];

    copy_list.forEach((value: { src: string, dest: string }) => {
        if (pathExistsSync(value.dest) == false) {
            copySync(value.src, value.dest)
        } else {
            console.log("Skipping:", value.dest)
        }
    });
};

export const unload: BuildPlugin.Unload = () => {
    console.log("[Wortal] Extension disabled.")
};

export const methods: { [key: string]: (...any: any) => any } = {
    openPanel() {
        Editor.Panel.open(PACKAGE_NAME);
    },
};
