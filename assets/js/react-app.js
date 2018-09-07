"use strict";

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './react-app.css'
import Today from './Componects/Today/Today'
import History from './Componects/History/History'


class App extends Component {
    render() {
        return (
            <div className="">
                <section className="results--section">
                    <div className="container">
                        <h1>This is a realtime price information about<br/> BTC, ETH and LTC.</h1>
                    </div>
                    <div className="results--section__inner">
                        <Today />
                        <History />
                    </div>
                </section>
            </div>
        );
    }
}
ReactDom.render(<App />, document.getElementById('react-app'));
