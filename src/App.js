import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';

class App extends Component {
  // Renderiza as rotas da aplicação.
  state = {
    clientData: {},
    cart: {},
    // Estrutura dos elementos da propriedade 'cart':
    //
    // productID('ID do produto'): {
    //   quantity: 'quantidade',
    //   productData: 'retorno da API sobre o produto',
    //   rating: 'nota do produto de 1 a 5 estrelas',
    //   valuation: 'avaliação comentada do produto',
    // }
  }

  updateState = ({ target }) => {
    const { state, action } = target;
    // switch(action) {
    //   case 
    // }
    this.setState({
      productUp: id,
    });
  }

  render() {
    return (
      <>
        <h1>FrontEnd Online Store</h1>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => (
                <Home { ...props } updateState={ this.updateState } />
              ) }
            />
            <Route
              path="/shoppingcart"
              render={ (props) => (
                <ShoppingCart { ...props } updateState={ this.updateState } />
              ) }
            />
            <Route
              path="/productdetail/:id"
              render={ (props) => (
                <ProductDetail { ...props } updateState={ this.updateState } />
              ) }
            />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
