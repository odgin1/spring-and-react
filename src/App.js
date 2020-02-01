import React, { useState, useEffect, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Comp} />
          <Route path="/xxx" component={Comp} />
        </Switch>
      </Router>
    </div>
  );
}

function Comp () {
    const [message, setMessage] = useState("");
    const [usdRate, setUsdRate] = useState("");
    const [eurRate, setEurRate] = useState("");

    const updateBnmExchangeRates = () => {
        var todaysDate = new Date()
        todaysDate = todaysDate.toLocaleDateString('ro-RO',
            { year: 'numeric', month: 'numeric', day: 'numeric' })

        fetch("https://cors-anywhere.herokuapp.com/http://bnm.md/ro/official_exchange_rates?get_xml=1&date="+todaysDate)
            .then(res => res.text())
            .then(
                (result) => {
                    var XMLParser = require('react-xml-parser')
                    var xml = new XMLParser().parseFromString(result)
                    console.log(xml)
                    var xmlNodes = xml.getElementsByTagName('Valute')
                    setEurRate(xmlNodes.find(node => (node.children[1].value === 'EUR')).children[4].value)
                    setUsdRate(xmlNodes.find(node => (node.children[1].value === 'USD')).children[4].value)
                },(error) => setError(error)
            )
    }

    useEffect(() => {
        fetch('/api/hello')
            .then(response => response.text())
            .then(message => {
                setMessage(message);
            });
        updateBnmExchangeRates()
    },[])

    return (
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">{message}</h1>
                {
                        <Fragment>
                            <h2 className="App-title">Today's MDL/USD rate: {usdRate}</h2>
                            <h2 className="App-title">Today's MDL/EUR rate: {eurRate}</h2>
                        </Fragment>
                }
            </header>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>
    )
}

export default App;