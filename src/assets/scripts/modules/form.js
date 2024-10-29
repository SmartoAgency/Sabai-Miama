import i18next from 'i18next';
import { gsap } from 'gsap';
import * as yup from 'yup';
// eslint-disable-next-line import/no-extraneous-depende
import FormMonster from '../../../pug/components/form/form';
import SexyInput from '../../../pug/components/input/input';
import { useState } from './helpers/helpers';


/*
 * form handlers start
 */
const forms = [
    '[data-form]',
    '[data-form="bottom-form"]',
  ];
  console.log('ffff');
  forms.forEach((form) => {
    const $form = document.querySelector(form);
    if ($form) {
      /* eslint-disable */
      new FormMonster({
        /* eslint-enable */
        elements: {
          $form,
          successAction: () => { 

            const title = $form.querySelector('[data-form-sucess-message]');
            gsap.timeline()
              .to($form.children, {
                opacity: 0,
              })
              .set(title, {
                textContent: title.dataset.success,
              })
              .to(title, {
                opacity: 1,
              })

              setTimeout(() => {
                gsap.to($form.children, {
                  opacity: 1,
                });
                title.textContent = title.dataset.default;
              }, 6000);
          },
          $btnSubmit: $form.querySelector('[data-btn-submit]'),
          fields: {
            name: {
              inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
              rule: yup.string().required(i18next.t('required')).trim(),
              defaultMessage: i18next.t('name'),
              valid: false,
              error: [],
            },
  
            phone: {
              inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]'), typeInput: 'phone' }),
              rule: yup
                .string()
                .required(i18next.t('required'))
                .min(17, i18next.t('field_too_short', { cnt: 17 - 5 })),
  
              defaultMessage: i18next.t('phone'),
              valid: false,
              error: [],
            },
          },
  
        },
      });
    }
});


const [fromPopup, setFormPopup, useSetPopupEffect ] = useState(false);

useSetPopupEffect(({val, text}) => {
  if (val) {
    gsap.timeline().to('[data-form-popup]', {
      autoAlpha: 1,
      pointerEvents: 'all'
    });
    return;
  }
  gsap.timeline().to('[data-form-popup]', {
    autoAlpha: 0,
    pointerEvents: 'none'
  })
    .add(() => {
      document.body.style.overflow = '';
    }, '')
  ;
})


document.body.addEventListener('click', (evt) => {
  const target = evt.target.closest('[data-form-popup-call]');
  if (!target) return;
  console.log('target', target);
  
  setFormPopup({
    val: true,
    // text: target.querySelector('span').textContent
  });
})
document.body.addEventListener('click', (evt) => {
  const target = evt.target.closest('[data-form-popup-close]');
  if (!target) return;
  setFormPopup({
    val: false,
    // text: ''
  });
})