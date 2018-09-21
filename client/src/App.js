import React, { Component } from 'react';
import Moment from 'moment'

import './App.css';

class App extends Component {
  state = {
    average: 0,
    prices: []
  }
  
  fetchData() {
    fetch('http://ec2-18-191-186-71.us-east-2.compute.amazonaws.com:5000/latestAveragePrice')
    .then(response => response.json())  
    .then(res => {
      this.setState({ average: res.message.average })
      this.setState({ prices: res.message.data })
    });
  }

  refresh(e) {
    this.fetchData()
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div className="App">
        <div className="Header">
          The current average price is <span className="Average-price">${ Number(this.state.average).toFixed(2) }</span>
          <input className="Refresh-button" type="button" value="Refresh" onClick = {this.refresh.bind(this)} />
        </div>
        <div className="Price-list">
          {this.state.prices.map( priceItem =>
            <div className="Price-row">${Number(priceItem.price).toFixed(2)} - {Moment(priceItem.timestamp).format("YYYY-MM-DD hh:mm:ss")}</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
