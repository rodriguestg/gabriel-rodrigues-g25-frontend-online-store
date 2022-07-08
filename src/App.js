import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/shoppingCart' component={ShoppingCart} />
      </Switch>
    );
  }
}

export default App;
