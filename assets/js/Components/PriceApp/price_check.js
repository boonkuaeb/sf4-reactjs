"use strict";

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Today from './Today/Today'
import History from './History/History'
import $ from 'jquery';


import T from 'i18n-react';

let language = $('.userLanguage').attr('title');
T.setTexts(require(`json-loader!yaml-loader!./../../../../translations/messages.${language}.yml`));


class App extends Component {
    render() {
        return (
            <div className="well-lg">
                    <h1 className="h1_welcom">{T.translate("welcome", {username: "Bruce Wayne"})}</h1>
                <hr/>
                <Today/>
                <hr/>
                <History/>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('react-app'));
