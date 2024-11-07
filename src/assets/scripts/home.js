import Swiper, { Navigation, EffectFade, FreeMode, Autoplay } from 'swiper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState } from "./modules/helpers/helpers";
import { debounce, once } from "lodash";
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import { paralaxesScreens } from './modules/effects/paralaxesScreens';

gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

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




//data-home-process-slider

function ourProcessSlider() {
    const slider = new Swiper('[data-home-process-slider]', {
        modules: [Navigation],
        slidesPerView: 3,
        breakpoints: {
            320: {
                slidesPerView: 1.2,
            },
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
            320: {
                slidesPerView: 1.5,
                spaceBetween: 8,
            },
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
    const accordeons = document.querySelectorAll('[data-home-accordeon]');
    accordeons.forEach((el) => {
        el.addEventListener('click', function (evt) {
            el.classList.toggle('active');
            accordeons.forEach((accordeon) => {
                if (accordeon !== el) {
                    accordeon.classList.remove('active');
                }
            });
            // image.querySelector('img').src = el.dataset.img;
            // image.classList.add('active');
            // image.style.transform = '';
            // alignImageByAccordeon(document.querySelectorAll('[data-home-accordeon]')[0], image);
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


function homeMediaSlider() {
    const sliderContainer = document.querySelector('[data-home-media-slider]');
    const a = new Swiper(sliderContainer, {
        modules: [FreeMode, Autoplay],
        slidesPerView: 4,
        speed: 1500,
        autoplay: {
            delay: 2000,
        },
        freeMode: true,
        breakpoints: {
            320: {
                slidesPerView: 2.3,
                spaceBetween: 8
            },
            1025: {
                slidesPerView: 4,
                spaceBetween: 20
            },
        },
    });


    ScrollTrigger.create({
        trigger: sliderContainer,
        onLeave: () => {
            a.autoplay.start();
            
        },
        onEnterBack: () => {
            a.autoplay.start();
        },
    })
}

homeMediaSlider();


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
applyScrollTriggerAnimation('.press-card, .home-our-process__item');


splitToLinesAndFadeUp('.home-about-us__title , .home-awards__title , .home-media__title , .home-press__title , .home-our-process__title , .home-with-render-block__title , .home-company-projects__title', gsap)
splitToLinesAndFadeUp('.home-with-render-block__title1, .home-with-render-block__title2', gsap);



function frontScreenSlider() {
    const duration = 5000;
    const sliderContainer = document.querySelector('[data-home-slider]');
    const slider = new Swiper(sliderContainer, {
        modules: [Navigation, Autoplay, EffectFade],
        slidesPerView: 1,
        speed: 750,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: duration,
        },
        on: {
            init: function () {
                document.documentElement.style.setProperty('--home-slide-line-duration', `${duration/1000}s`);
                document.querySelectorAll('[data-home-slider-line]')[0].classList.add('active');
            },
            slideChange: function () {
                const slide = document.querySelector('.active[data-home-slider-line]');
                if (slide) {
                    slide.classList.remove('active');
                }
                document.querySelectorAll('[data-home-slider-line]')[this.activeIndex].classList.add('active');
            }
        },
    });
    //data-home-slider-line

    ScrollTrigger.create({
        trigger: sliderContainer,
        onLeave: () => {
            slider.autoplay.start();
            
        },
        onEnterBack: () => {
            slider.autoplay.start();
        },
    })
}


frontScreenSlider();


paralaxesScreens('desktop', gsap);