import Swiper from 'swiper';
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
        slidesPerView: 2.5,
        spaceBetween: 20,
    });
}

processSwipers();