import 'current-device';

document.documentElement.style.setProperty('--vh', `${document.documentElement.clientHeight * 0.01}px`);

window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        document.documentElement.style.setProperty('--vh', `${document.documentElement.clientHeight * 0.01}px`);
    }, 1000);
});