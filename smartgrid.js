var smartgrid = require('smart-grid');
const { offset } = require('smart-grid/system/defaults/settings');

/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 4, /* number of grid columns */
    offset: '20px', /* gutter width px || % || rem */
    fields: '40px',
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1920px', /* max-width оn very large screen */
        fields: 'var(--page-side-fields)' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1200px', /* -> @media (max-width: 1100px) */
            fields: '20px',
        },
        md: {
            width: '992px',
            fields: '20px',
        },
        sm: {
            width: '768px',
            fields: '10px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '600px',
            offset: '10px',
        }
        /* 
        We can create any quantity of break points.
 
        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./src/assets/styles/assets', settings);