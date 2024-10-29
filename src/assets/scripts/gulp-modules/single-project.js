import Swiper, {Navigation} from 'swiper';

function singleProjectDescriptionSlider() {
    const processSwiper = new Swiper('[data-single-project-description-slider]', {
        modules: [Navigation],
        slidesPerView: 2.5,
        spaceBetween: 20,
        navigation: {
            nextEl: '[data-single-project-description-slider-next]',
            prevEl: '[data-single-project-description-slider-prev]',
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

singleProjectDescriptionSlider();