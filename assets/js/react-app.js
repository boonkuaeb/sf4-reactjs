"use strict";
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Today from './Componects/Today/Today'
import History from './Componects/History/History'

import T from 'i18n-react';
class App extends Component {
    render() {
        return (
            <div className="results--section__inner">
            <span className="well-lg">
                    <h1>{T.translate("welcome", {username: "Bruce Wayne"})}
                    </h1>
                <hr/>
            </span>
                <div>
                </div>
                <Today/>
                <History/>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('react-app'));
