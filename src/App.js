import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';

class App extends Component {
  // Renderiza as rotas da aplicação.
  state = {
    productUp: '',
  }

  handleClickCartId = ({ target }) => {
    const { id } = target;
    this.setState({
      productUp: id,
    });
    console.log(id);
  }

  render() {
    const { productUp } = this.state;
    return (
      <>
        <h1>FrontEnd Online Store</h1>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => (
                <Home { ...props } handleClickCart={ this.handleClickCartId } />
              ) }
            />
            <Route
              path="/shoppingcart"
              render={ (props) => (
                <ShoppingCart { ...props } productUp={ productUp } />
              ) }
            />
            <Route exact path="/productdetail/:id" component={ ProductDetail } />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
