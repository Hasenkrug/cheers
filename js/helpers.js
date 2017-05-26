(function(window) {
    'use strict';

    // return array of selected elements - $$('img.dog')
    window.$$ = document.querySelectorAll.bind(document);
    // returns first element selected - $('input[name="food"]')
    window.$ = document.querySelector.bind(document);

})(window);
