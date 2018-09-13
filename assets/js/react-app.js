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
                <div>
                    <h1>
                        {T.translate("welcome", { username: "Bruce Wayne" })}
                    </h1>
                </div>
                <Today/>
                <History/>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('react-app'));
