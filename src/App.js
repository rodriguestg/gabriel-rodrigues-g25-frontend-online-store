import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';

class App extends Component {
  state = {
    cart: {},
    //
    // evaluations:
    //
    // data ('ID do produto'): {
    //   email: 'email do usuário',
    //   rating: 'nota de 1 a 5 sobre o produto',
    //   evaluation: 'avaliação do produto em texto',
    // }
    //
    // cart:
    //
    // data ('ID do produto'): {
    //   quantity: 'quantidade',
    //   productData: 'retorno da API sobre o produto',
    //   rating: 'nota do produto de 1 a 5 estrelas',
    //   valuation: 'avaliação comentada do produto',
    // }
  };

  updateState = async ({ data, action }) => {
    const { cart } = this.state;
    const unity = 1;
    const product = { quantity: unity, productData: data, rating: null, valuation: null };
    switch (action) {
    case 'addProductCart':
      if (data.id in cart) return;
      this.setState(
        (previousState) => ({
          cart: { ...previousState.cart, [data.id]: product },
        }),
      );
      break;
    case 'increase':
      cart[data].quantity += unity;
      this.setState({ cart });
      break;
    case 'decrease':
      if (cart[data].quantity === unity) return;
      cart[data].quantity -= unity;
      this.setState({ cart });
      break;
    case 'remove':
      delete cart[data];
      this.setState({ cart });
      break;
    default:
      this.setState({ cart: {} });
    }
  };

  render() {
    const { cart } = this.state;
    return (
      <>
        <h1>FrontEnd Online Store</h1>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => (
                <Home { ...props } updatestate={ this.updateState } />
              ) }
            />
            <Route
              path="/shoppingcart"
              render={ (props) => (
                <ShoppingCart
                  { ...props }
                  updatestate={ this.updateState }
                  cart={ cart }
                />
              ) }
            />
            <Route
              path="/productdetail/:id"
              render={ (props) => (
                <ProductDetail { ...props } updatestate={ this.updateState } />
              ) }
            />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
