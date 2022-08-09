import { BuildPlugin } from '../@types';
import { existsSync, copySync, pathExistsSync } from 'fs-extra';
import path from 'path';

const PACKAGE_NAME = 'Wortal';

function log(...arg: any[]) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}

export const load: BuildPlugin.load = () => {
    log("ProjectPath:", Editor.Project.path);

    const preview_template_dir = "preview";
    const build_templates_dir = "build";
    const project_path = Editor.Project.path;
    const templates_dir = path.join(Editor.Project.path, "extensions/" + PACKAGE_NAME + "/templates/");
    const assets_dir = path.join(project_path, "assets");

    const copy_list = [
        {
            src: path.join(templates_dir, preview_template_dir),
            dest: path.join(project_path, preview_template_dir)
        },
        {
            src: path.join(templates_dir, build_templates_dir),
            dest: path.join(project_path, build_templates_dir)
        },
        {
            src: path.join(templates_dir, "wortal"),
            dest: path.join(assets_dir, "wortal")
        },
        {
            src: path.join(templates_dir, "demo"),
            dest: path.join(assets_dir, "demo")
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
