import React, {Component} from 'react';
import './History.css'
import axios from 'axios'
import moment from 'moment'
import {SectionBox} from "./SectionBox";

class History extends Component {
    constructor() {
        super();
        this.state = {
            todayprice: {},
            yesterdayprice: {},
            twodaysprice: {},
            threedaysprice: {},
            fourdaysprice: {}
        };
         this.getBTCPrices = this.getBTCPrices.bind(this);
         this.getETHPrices = this.getETHPrices.bind(this);
         this.getLTCPrices = this.getLTCPrices.bind(this);
         this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
         this.restoreStateFromLocalStorage = this.restoreStateFromLocalStorage.bind(this);
         this.getPriceForDay = this.getPriceForDay.bind(this);
         this.getCurrencyPrice = this.getCurrencyPrice.bind(this);
    }

    /**
     * Let's create utilitary functions to keep our code D.R.Y.
     */

    saveStateToLocalStorage() {
        localStorage.setItem('history-state', JSON.stringify(this.state));
    }

    restoreStateFromLocalStorage() {
        const state = JSON.parse(localStorage.getItem('today-state'));
        console.log(state);
        this.setState(state);
    }

    getPriceForDay(daysCount = 0, key) {
        const time = moment().subtract(daysCount, 'days').unix();
        axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
            .then(axios.spread((eth, btc, ltc) => {
                /** Have clear names for your variables, what is f supposed to be? **/
                let f = {
                    date: moment.unix(time).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                };
                this.setState({
                    [key]: f
                }, this.saveStateToLocalStorage);
            }));
    }

    getCurrencyPrice(date, currency) {
        return axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${currency}&tsyms=USD&ts=${date}`);
    }

    getETHPrices(date) {
        return this.getCurrencyPrice(date, 'ETH')
    }

    getBTCPrices(date) {
        return this.getCurrencyPrice(date, 'BTC')
    }

    getLTCPrices(date) {
        return this.getCurrencyPrice(date, 'LTC')
    }



    componentDidMount() {
        if (!navigator.onLine) {
            this.restoreStateFromLocalStorage();
        }
        const days = ['today', 'yesterday', 'twodays', 'threedays', 'fourdays'];
        for (const day in days) {
            this.getPriceForDay(day, `${days[day]}price`);
        }

    }

    render() {
        /**
         * By creating components and extracting the variable at the top here, we created a much cleaner
         * version of it ! :-)
         */
        const {todayprice, yesterdayprice, twodaysprice, threedaysprice, fourdaysprice} = this.state;
        return (
            <div className="history--section container">
                <h2>History (Past 5 days)</h2>
                <div className="history--section__box">
                    <SectionBox price={todayprice}/>
                    <SectionBox price={yesterdayprice}/>
                    <SectionBox price={twodaysprice}/>
                    <SectionBox price={threedaysprice}/>
                    <SectionBox price={fourdaysprice}/>
                </div>
            </div>
        )
    }
}

export default History;