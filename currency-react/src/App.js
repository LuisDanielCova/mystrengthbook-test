import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GetRate from './components/GetRate';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" width="400" />
          <h1 className="App-title">
            Welcome to the MyStrengthBook Code Test!
          </h1>
        </header>

        <h2>CURRENCY</h2>

        <GetRate />

      </div>
    );
  }
}

export default App;
