import Swiper from 'swiper';

function singleProjectDescriptionSlider() {
    const processSwiper = new Swiper('[data-single-project-description-slider]', {
        slidesPerView: 2.5,
        spaceBetween: 20,
    });
}

singleProjectDescriptionSlider();