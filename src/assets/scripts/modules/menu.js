import gsap from 'gsap/all';


export default function menu() {
    document.body.addEventListener('click', function (evt) {
      const target = evt.target.closest('[data-not-desktop-menu-call]');
      if (!target) return;
      target.classList.toggle('opened-menu');
      document.querySelectorAll('[data-not-desktop-menu]').forEach((item) => {
        item.classList.toggle('active');
      });
    }) 
}