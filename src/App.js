import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

class App extends Component {
  // Renderiza as rotas da aplicação.
  render() {
    return (
      <>
        <h1>FrontEnd Online Store</h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/shoppingcart" component={ ShoppingCart } />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
