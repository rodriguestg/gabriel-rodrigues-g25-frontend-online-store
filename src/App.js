import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';

class App extends Component {
  state = {
    evaluations: {},
    cart: {},
    clientData: {},
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

  componentDidMount() {
    const recoverEvaluations = localStorage.getItem('evaluations');
    const evaluations =
      recoverEvaluations === null ? {} : JSON.parse(recoverEvaluations);
    const recoverCart = localStorage.getItem('cart');
    const cart = recoverCart === null ? {} : JSON.parse(recoverCart);
    const recoverClientData = localStorage.getItem('cart');
    const clientData =
      recoverClientData === null ? {} : JSON.parse(recoverClientData);

    this.setState({evaluations, cart, clientData});
  }

  updateState = async ({data, action}) => {
    const {cart} = this.state;
    const unity = 1;

    switch (action) {
      case 'addProductCart':
        if (data.id in cart) return;
        const product = {
          quantity: unity,
          productData: data,
          rating: null,
          valuation: null,
        };

        this.setState(
          (previousState) => ({
            cart: {
              ...previousState.cart,
              [data.id]: product,
            },
          }),
          () => {
            const {cart} = this.state;
            localStorage.setItem('cart', JSON.stringify(cart));
          }
        );
        break;
      case 'increase':
        cart[data].quantity += unity;
        this.setState({cart});
        localStorage.setItem('cart', JSON.stringify(cart));
        break;
      case 'decrease':
        if (cart[data].quantity === unity) return;
        cart[data].quantity -= unity;
        this.setState({cart});
        localStorage.setItem('cart', JSON.stringify(cart));
        break;
      case 'remove':
        delete cart[data];
        this.setState({cart});
        localStorage.setItem('cart', JSON.stringify(cart));
        break;
      case 'addProductEvaluation':
        this.setState(
          (previousState) => ({
            evaluations: {
              ...previousState.evaluations,
              [data.productID]: data.currentEvaluation,
            },
          }),
          () => {
            const {evaluations} = this.state;
            localStorage.setItem('evaluations', JSON.stringify(evaluations));
          }
        );
        break;
      default:
        this.setState({cart: {}});
        localStorage.clear();
    }
  };

  render() {
    const {evaluations, cart} = this.state;
    return (
      <>
        <h1>FrontEnd Online Store</h1>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Home {...props} updatestate={this.updateState} />
              )}
            />
            <Route
              path='/shoppingcart'
              render={(props) => (
                <ShoppingCart
                  {...props}
                  updatestate={this.updateState}
                  cart={cart}
                  evaluations={evaluations}
                />
              )}
            />
            <Route
              path='/productdetail/:id'
              render={(props) => (
                <ProductDetail {...props} updatestate={this.updateState} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
