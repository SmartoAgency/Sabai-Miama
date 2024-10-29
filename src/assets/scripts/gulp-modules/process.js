import Swiper, { Navigation } from 'swiper';
import $ from 'jquery';

function processAccordeons() {
    document.body.addEventListener('click', function (evt) {
        const target = evt.target.closest('[data-process-accordeon-toggle]');
        if (!target) return;
        openAccordeon(target.closest('[data-process-accordeon]'));
    });
    function openAccordeon(elem) {
        elem.classList.toggle('active');
        if (elem.classList.contains('active')) {
            $(elem).find('[data-process-accordeon-content]').slideDown();
        } else {
            $(elem).find('[data-process-accordeon-content]').slideUp();
        }
    }
}


processAccordeons();

function processSwipers() {
    const processSwiper = new Swiper('[data-process-gallery-slider]', {
        modules: [Navigation],
        slidesPerView: 2.5,
        spaceBetween: 20,
        navigation: {
            nextEl: '[data-process-gallery-slider-next]',
            prevEl: '[data-process-gallery-slider-prev]',
        },
        breakpoints: {
            360: {
                slidesPerView: 1.75,
            },
            1025: {
                slidesPerView: 2.5,
            },
        },
    });
}

processSwipers();


function processNotDesktopSlider() {
    const swiper = new Swiper('[data-process-second-slider]', {
        modules: [Navigation],
        slidesPerView: 2.05,
        navigation: {
            nextEl: '[data-process-second-slider-next]',
            prevEl: '[data-process-second-slider-prev]',
        },
    })
}

processNotDesktopSlider();