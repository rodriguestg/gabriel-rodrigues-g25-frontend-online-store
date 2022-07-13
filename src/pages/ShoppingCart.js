import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  state = {
    cart: [],
  }

  // Recupera o carrinho da Local Storage.
  async componentDidMount() {
    const previousCart = localStorage.getItem('cart');
    const recoverCart = previousCart === null ? [] : Object.values(JSON.parse(previousCart));
    const cart = recoverCart.map((item) => JSON.parse(item));
    this.setState({ cart });
  }

  render() {
    const { cart } = this.state;

    // Link para a página inicial.
    const buttonHome = (
      <Link to="/" >
        <h3>Home</h3>
      </Link>
    );

    // Tela de carrinho vazio.
    const cartNull = (
      <>
        {buttonHome}
        <div>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        </div>
      </>      
    );

    // Renderiza a tela de carrinho vazio caso não haja produtos.
    if(cart.length === 0) return cartNull

    return (
      <>        
        {buttonHome}
        <h4>Carrinho de compras</h4>
        {cart.map((product) => (
          <div key={ product.productData.id }>
            <p data-testid="shopping-cart-product-name">
              { product.productData.title }
            </p>
            <img
              alt={ product.productData.title }
              src={ product.productData.thumbnail }
            />
            <p>Preço: { product.productData.price }</p>
            <p data-testid="shopping-cart-product-quantity">
              { product.quantity }
            </p>
          </div>
        ))}
      </>
    );
  }
}

export default ShoppingCart;
