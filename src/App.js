import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';

class App extends Component {
  // Renderiza as rotas da aplicação.
  render() {
    return (
      <>
        <h1>FrontEnd Online Store</h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/shoppingcart" component={ ShoppingCart } />
            <Route path="/productdetail/:id" component={ ProductDetail } />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
