import Headroom from "headroom.js";
import './modules/scroll/leniscroll';
import { gsap, ScrollTrigger } from 'gsap/all';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import menu from './modules/menu';
import './modules/form';
import { formsHandler } from "./modules/form/formsHandler";

formsHandler();

gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

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

function mobileCallbackPopup() {
  document.body.addEventListener('click', function(evt) {
    const target = evt.target.closest('[data-mobile-callback-popup-call]');
    if (target) {
      document.querySelector('.header').classList.add('js-mobile-callback-opened');
      document.querySelector('[data-mobile-callback-popup]').classList.add('active');
    }
  });

  document.body.addEventListener('click', function(evt) {
    const target = evt.target.closest('[data-mobile-callback-close]');
    if (target) {
      document.querySelector('.header').classList.remove('js-mobile-callback-opened');
      document.querySelector('[data-mobile-callback-popup]').classList.remove('active');
    }
  });
}

mobileCallbackPopup();

splitToLinesAndFadeUp('[data-split-lines-and-fade-up]', gsap);

const pthname = window.location.pathname;
document.querySelectorAll('.header__link').forEach((link) => {
  if (pthname !== link.getAttribute('href')) {
    link.classList.remove('active');
  }
});

document.querySelectorAll('.home-front-screen').forEach((screen) => {
  const nextElement = screen.nextElementSibling;
  if (!nextElement) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: nextElement,
      scrub: true,
    }
  }).fromTo(screen, {
    y: 0
  }, { 
    y: window.innerHeight,
  });


});