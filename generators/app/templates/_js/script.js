'use strict';

//some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills from core-js

import helloworld_tpl from '../_hbs/helloworld';

(() => {

  const init = () => {
    console.log(helloworld_tpl({name: '<%= author %>'}));
  };

  init();

})();
