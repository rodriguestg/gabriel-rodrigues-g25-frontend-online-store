import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  state = {
    cart: {},
    minimumQuantity: 1,
  }

  // Recupera o carrinho da Local Storage.
  componentDidMount() {
    const { savecart } = this.props;
    const cart = savecart === null || savecart === undefined
    ? {} 
    : savecart;
    this.setState({ cart });
  }

  // Atualiza a quantidade de produtos e o carrinho da Local Storage.
  updateQuantity = ( productID, action) => {
    const { cart } = this.state;
    const unit = 1;
    let copyCart = JSON.parse(JSON.stringify(cart));

    if(action === 'increase') {
      copyCart[productID].quantity += unit;
    }
    if(action === 'decrease') {
      if(cart[productID].quantity === unit) return;
      copyCart[productID].quantity -= unit;
    }
    if(action === 'remove') {
      delete copyCart[productID];
    }

    this.setState({cart: copyCart});
    localStorage.setItem('cart', JSON.stringify(copyCart));
  }

  clearCart = () => {
    this.setState({cart: {}});
    localStorage.clear();
  }

  render() {
    const { cart } = this.state;
    const { savecart } = this.props;

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
    // if(Object.keys(cart).length === 0) return cartNull;

    return (
      <>        
        {buttonHome}
        <h4>Carrinho de compras</h4>
        <button
          type='button'
          onClick={ this.clearCart }
        >
          Limpar carrinho
        </button>

        {console.log(savecart)}
        {/* Lista do carrinho de compras. */}
        {Object.entries(cart).map(([ id, product ]) => (
          <div key={ id }>
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
            <span>
              <button                
                data-testid="product-increase-quantity"
                type="button"
                onClick={ () => this.updateQuantity( id, 'increase') }
              >
                + item
              </button>
              <button                
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ () => this.updateQuantity( id, 'decrease') }
              >
                - item
              </button>
              <button
                type="button"
                onClick={ () => this.updateQuantity( id, 'remove') }
              >
                Remover item
              </button>
            </span>
          </div>
        ))}
      </>
    );
  }
}

export default ShoppingCart;
