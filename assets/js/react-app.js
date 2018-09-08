"use strict";

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Today from './Componects/Today/Today'
import History from './Componects/History/History'


class App extends Component {
    render() {
        return (

            <div className="results--section__inner">
                <Today/>
                <History/>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('react-app'));
