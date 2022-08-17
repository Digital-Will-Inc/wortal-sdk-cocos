import { readFileSync } from 'fs-extra';
import { join } from 'path';

module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('[Wortal] Show'); },
        hide() { console.log('[Wortal] Hide'); },
    },
    template: readFileSync(join(__dirname, '../../../static/template/default/index.html'), 'utf-8'),
    style: readFileSync(join(__dirname, '../../../static/style/default/index.css'), 'utf-8'),
    $: {
        app: '#app',
    },
    methods: {

    },
    ready() {

    },
    beforeClose() { },
    close() { },
});