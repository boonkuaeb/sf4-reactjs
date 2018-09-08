'use strict';

import $ from 'jquery';
import 'bootstrap'
import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.css';
import '../css/layout.scss';

global.$ = $; // use for upgrade from native js  to webpack

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});