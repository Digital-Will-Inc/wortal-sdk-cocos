import { readFileSync } from 'fs-extra';
import { join } from 'path';

const version = Editor.App.version;

switch (version) {
    case "3.0.0":
    case "3.0.1":
    case "3.1.0":
    case "3.1.1":
    case "3.1.2":
    case "3.2.0":
    case "3.2.1":
        exports.template = readFileSync(join(__dirname, '../../../static/template/default/index.html'), 'utf-8');
        exports.style = readFileSync(join(__dirname, '../../../static/style/default/index.css'), 'utf-8');
        exports.$ = {
            app: '#app',
        };
        exports.ready = function() {};
        exports.close = function() {};
        break;
    case "3.3.0":
    case "3.3.1":
    case "3.3.2":
    case "3.4.0":
    case "3.4.1":
    case "3.4.2":
    case "3.5.0":
    case "3.5.1":
    case "3.5.2":
    case "3.6.0":
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
            methods: { },
            ready() { },
            beforeClose() { },
            close() { },
        });
        break;
    default:
        console.error("Version not supported: " + version);
        break;
}