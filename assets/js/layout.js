'use strict';

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'flag-icon-css/css/flag-icon.min.css'

import '../css/layout.scss';

import T from 'i18n-react';

global.$ = $; // use for upgrade from native js  to webpack
let language = $('.userLanguage').attr('title');
T.setTexts(require(`json-loader!yaml-loader!./../../translations/messages.${language}.yml`));

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});