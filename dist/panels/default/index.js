"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('[Wortal] Show'); },
        hide() { console.log('[Wortal] Hide'); },
    },
    template: fs_extra_1.readFileSync(path_1.join(__dirname, '../../../static/template/default/index.html'), 'utf-8'),
    style: fs_extra_1.readFileSync(path_1.join(__dirname, '../../../static/style/default/index.css'), 'utf-8'),
    $: {
        app: '#app',
    },
    methods: {},
    ready() {
    },
    beforeClose() { },
    close() { },
});
