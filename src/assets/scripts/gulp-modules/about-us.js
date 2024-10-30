import Swiper, { Navigation, Controller } from 'swiper';
import { useState } from '../modules/helpers/helpers';

const recognition2 = new Swiper('[data-about-us-recognition-slider2]', {
    modules: [Controller],
    slidesPerView: 1,
});

const recognition1 = new Swiper('[data-about-us-recognition-slider]', {
    modules: [Navigation, Controller],
    slidesPerView: 1,
    navigation: {
        nextEl: '[data-about-us-recognition-slider-next]',
        prevEl: '[data-about-us-recognition-slider-prev]',
    },
});
recognition2.controller.control = recognition1;
recognition1.controller.control = recognition2;



function blockWithRenderNotDesktopSlider() {
    const [currentIndex, setCurrentIndex, subscribeCurrentIndex] = useState(0);
    const slides = document.querySelectorAll('[data-about-us-block-with-render-slide]');
    subscribeCurrentIndex(index => {
        slides.forEach(el => {
            const slideNumber =  el.getAttribute('data-about-us-block-with-render-slide')
            el.style.zIndex = slideNumber == index ? 2 : 1;
            el.style.opacity = slideNumber == index ? 1 : 0;
        })
    });

    if (window.screen.width < 1024) {
        setCurrentIndex(0);
    }
    // data-about-us-block-with-render-slide-next
    document.body.addEventListener('click', function (e) {
        if (e.target.closest('[data-about-us-block-with-render-slide-next]')) {
            setCurrentIndex(currentIndex() == slides.length - 1 ? 0 : currentIndex() + 1);
        }
        if (e.target.closest('[data-about-us-block-with-render-slide-prev]')) {
            setCurrentIndex(currentIndex() == 0 ? slides.length - 1 : currentIndex() - 1);
        }
    });
    // data-about-us-block-with-render-slide-prev
}

blockWithRenderNotDesktopSlider();

function aboutUsDescriptionOpen() {
    document.body.addEventListener('click', function (evt) {
        const target = evt.target.closest('[data-about-us-founders-description-open]');
        if (!target) {
            document.querySelectorAll('[data-about-us-founders]').forEach(el => {
                el.classList.remove('active');
            });
            return;
        }
        const parent = target.closest('[data-about-us-founders]');
        if (!parent) return;
        parent.classList.toggle('active');
    });
}

aboutUsDescriptionOpen();