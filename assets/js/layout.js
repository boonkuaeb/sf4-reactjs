'use strict';

import $ from 'jquery';
import 'bootstrap'
import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.css';
import '../css/layout.scss';
import T from 'i18n-react';

global.$ = $; // use for upgrade from native js  to webpack
let language = $('.userLanguage').attr('alt');
T.setTexts(require(`json-loader!yaml-loader!./../../translations/messages.${language}.yml`));



$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});