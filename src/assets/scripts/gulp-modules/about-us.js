import Swiper, { Navigation } from 'swiper';


const slider = new Swiper('[data-about-us-recognition-slider]', {
    modules: [Navigation],
    slidesPerView: 1,
    navigation: {
        nextEl: '[data-about-us-recognition-slider-next]',
        prevEl: '[data-about-us-recognition-slider-prev]',
    },

});
