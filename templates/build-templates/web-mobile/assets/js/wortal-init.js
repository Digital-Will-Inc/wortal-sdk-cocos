let init = document.createElement('script');
init.type = 'text/javascript';

let platform = window.getWortalPlatform();
console.log('[Wortal] Platform: ' + platform);

switch (platform) {
    case 'wortal':
        init.src = './js/wortal-init-adsense.js';
        break;
    case 'link':
        init.src = './js/wortal-init-link.js';
        break;
    case 'viber':
        init.src = './js/wortal-init-viber.js';
        break;
    default:
        console.log('[Wortal] Platform not supported.');
        break;
}

document.head.appendChild(init);