import Swiper, { Navigation, EffectFade } from 'swiper';
import { useState } from "./modules/helpers/helpers";
import { debounce, once } from "lodash";
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';

function setVh() {
    let vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVh();

const debouncedSetVh = debounce(setVh, 200);

window.addEventListener('resize', setVh);


document.body.addEventListener('click',function tabletMenuHandler(evt){
    const target = evt.target.closest('[data-tablet-menu-open]');
    if(!target) return;

    target.classList.toggle('menu-open');
    if (target.classList.contains('menu-open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    document.querySelector('.header__links').classList.toggle('active');
});


document.body.addEventListener('click',function(evt){
    const target = evt.target.closest('[data-down-arrow]');
    if(!target) return;
    
    document.querySelector('.spinhouse-demo-screen').scrollIntoView({behavior: 'smooth'});
});






//home-features-block__item

function applyScrollTriggerAnimation(selectors) {
    document.querySelectorAll(selectors).forEach((el) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: '50% bottom',
                // end: 'bottom center',
                once: true,
            },
        })
            .fromTo(Array.from(el.children),
                { y: 25, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, clearProps: 'all', duration: 1.25, ease: 'power4.out', stagger: 0.1 },
            );
    });
}
applyScrollTriggerAnimation('.contact-screen-form, .home-features-block__item, .home-for-who-block__item, .transform-vision-into-reality-block__description');


//data-home-process-slider

function ourProcessSlider() {
    const slider = new Swiper('[data-home-process-slider]', {
        modules: [Navigation],
        slidesPerView: 3,
        breakpoints: {
            768: {
                slidesPerView: 2.2,
            },
            1025: {
                slidesPerView: 3,
            },
        },
        spaceBetween: 20,
        navigation: {
            nextEl: '[data-home-process-slider-next]',
            prevEl: '[data-home-process-slider-prev]',
        },
    })
}

ourProcessSlider();

function companyProjectsSlider() {
    const slider = new Swiper('[data-home-company-projects-slider]', {
        modules: [Navigation],
        slidesPerView: 4.5,
        breakpoints: {
            768: {
                slidesPerView: 2.2,
            },
            1025: {
                slidesPerView: 4.5,
            },
        },
        spaceBetween: 20,
        navigation: {
            nextEl: '[data-home-company-projects-slider-next]',
            prevEl: '[data-home-company-projects-slider-prev]',
        },
    });
    const slider2 = new Swiper('[data-home-company-projects-slider-second]', {
        modules: [EffectFade],
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });

    slider.on('slideChange', function () {
        slider2.slideTo(slider.activeIndex);
    });


    document.querySelectorAll('[data-home-company-projects-slider] .swiper-slide').forEach((el, index) => {
        el.addEventListener('mouseenter', function () {
            slider2.slideTo(index);
        });
    });
}

companyProjectsSlider();

splitToLinesAndFadeUp('.home-with-render-block__title1, .home-with-render-block__title2', gsap)

function homeAwardsAccordeon() {
    const image = document.querySelector('.home-awards__image');
    document.querySelectorAll('[data-home-accordeon]').forEach((el) => {
        el.addEventListener('click', function (evt) {
            image.querySelector('img').src = el.dataset.img;
            image.classList.add('active');
            image.style.transform = '';
            alignImageByAccordeon(el, image);
        });
    });
}

function alignImageByAccordeon(accordeon, image) {
    const imageTop = accordeon.getBoundingClientRect().top;
    const accordeonTop = image.getBoundingClientRect().top;
    console.log(imageTop, accordeonTop);
    image.style.transform = `translateY(${imageTop - accordeonTop}px)`;
    
}
homeAwardsAccordeon();