import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
