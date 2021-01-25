import React from 'react';
import './Rate.css';
import Calc from '../calc/Calc';

class Rate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      currencyRate: {},
    }
    this.getRate();
    this.currency = ['USD', 'RUB', 'BRL', 'PHP'];


  }

  getRate = () => {
    fetch("https://api.exchangeratesapi.io/latest")
      .then(data => {
        return data.json()
      })
      .then(data => {
        this.setState({
          date: data.date
        })
        let result = {}
        for (let i = 0; i < this.currency.length; i++) {
          result[this.currency[i]] = data.rates[this.currency[i]]
        }
        this.setState({
          currencyRate: result
        })
      })

  }

  render() {
    const { date, currencyRate } = this.state


    return (
      <div className="rate">
        <h3> Курс валют на {date} </h3>
        <div className="flex-container">
          {Object.keys(currencyRate).map((keyName, ind) => {
            return <div className="block flex-item" key={keyName}>
              <div className="currency-name">{keyName}</div>
              <div className="currency-in">buy: {currencyRate[keyName].toFixed(2)}</div>
              <div className="currency-out">sell: {(currencyRate[keyName] * 0.11 * 10).toFixed(2)}</div>
            </div>
          })}
        </div>
        <Calc rate={currencyRate} />
      </div>

    );
  }

}

export default Rate;
