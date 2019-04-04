import React, { Component } from 'react';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import AllOrders from './components/AllOrders';


class App extends Component {
  render() {
    return (
      <div className="App">
        <AllOrders />
      </div>
    );
  }
}

export default App;
