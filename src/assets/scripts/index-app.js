import $ from "jquery";
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swiper, { EffectFade, FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import Headroom from "headroom.js";
import { lenis } from './modules/scroll/leniscroll';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import { gsap, ScrollTrigger } from 'gsap/all';
import "current-device";
import menu from './modules/menu';
import './modules/form';
import { formsHandler } from "./modules/form/formsHandler";


const scroller = lenis;

Swiper.use([EffectFade, Navigation, Pagination, Thumbs, FreeMode]);
/** ******************************* */
/*
 * smooth scroll start
 */
gsap.registerPlugin(ScrollTrigger);
gsap.core.globals("ScrollTrigger", ScrollTrigger);
// global.gsap = gsap;



formsHandler();

// lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
//   ScrollTrigger.update()
// })


var myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
headroom.init();


document.body.addEventListener('click',function(evt){
  const target = evt.target.closest('[data-call-form]');
  if (!target) return;
  document.querySelector('[data-form-wrapper]').classList.add('active');
  gsap.timeline()
    .fromTo('[data-form-wrapper] .form', {
      x: '100%',
    },{
      x: '0',
      duration: '1.25',
      ease: 'expo.out'
    })
});
document.body.addEventListener('click',function(evt){
  const target = evt.target.closest('[data-close-form]');
  if (!target) return;
  gsap.timeline()
  .to('[data-form-wrapper] .form', {
    x: '100%',
    duration: '0.75',
    ease: 'expo.out'
  })
  .add(() => {
    document.querySelector('[data-form-wrapper]').classList.remove('active');
  })
});
document.body.addEventListener('click',function(evt){
  
  if (!evt.target.classList.contains('form-wrapper')) return;
  console.log(evt.target);
  gsap.timeline()
  .to(evt.target.closest('.form-popup'), {
    autoAlpha: 0,
    pointerEvents: 'none',
  })
  .add(() => {
    document.querySelector('[data-form-wrapper]').classList.remove('active');
  })
});






document.body.addEventListener('click',function(evt){
  const target = evt.target.closest('[data-up-arrow]');
  if (!target) return;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
});



menu();
splitToLinesAndFadeUp('section:not(.section-1) .text-style-h-1, section  .text-style-h-3');
splitToLinesAndFadeUp('.text-style-h-1');


function mobileCallbackPopup() {
  document.body.addEventListener('click',function(evt){
    const target = evt.target.closest('[data-mobile-callback-popup-call]');
    if (!target) return;
    document.querySelector('.header').classList.add('js-mobile-callback-opened');
    document.querySelector('[data-mobile-callback-popup]').classList.add('active');
  });
  document.body.addEventListener('click',function(evt){
    const target = evt.target.closest('[data-mobile-callback-close]');
    if (!target) return;
    document.querySelector('.header').classList.remove('js-mobile-callback-opened');
    document.querySelector('[data-mobile-callback-popup]').classList.remove('active');
  });
}

mobileCallbackPopup();
