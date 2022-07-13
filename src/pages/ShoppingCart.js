import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ShoppingCart extends Component {
  render() {
    const { updatestate, cart } = this.props;

    // Link para a página inicial.
    const buttonHome = (
      <Link to="/">
        <h3>Home</h3>
      </Link>
    );

    // Renderiza a tela de carrinho vazio caso não haja produtos.
    if (Object.keys(cart).length === 0) {
      return (
        <>
          {buttonHome}
          <div>
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          </div>
        </>
      );
    }

    return (
      <>
        {buttonHome}
        <h4>Carrinho de compras</h4>
        <button
          type="button"
          onClick={ () => updatestate({
            data: '',
            action: 'clear',
          }) }
        >
          Limpar carrinho
        </button>

        {/* Lista do carrinho de compras. */}
        {Object.entries(cart).map(([id, product]) => (
          <div key={ id }>
            <p data-testid="shopping-cart-product-name">
              { product.productData.title }
            </p>
            <img alt="product thumbnail" src={ product.productData.thumbnail } />
            <p>
              Preço:
              { product.productData.price }
            </p>
            <p data-testid="shopping-cart-product-quantity">
              {product.quantity}
            </p>
            <span>
              <button
                data-testid="product-increase-quantity"
                type="button"
                onClick={ () => updatestate({
                  data: id,
                  action: 'increase',
                }) }
              >
                + item
              </button>
              <button
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ () => updatestate({
                  data: id,
                  action: 'decrease',
                }) }
              >
                - item
              </button>
              <button
                type="button"
                onClick={ () => updatestate({
                  data: id,
                  action: 'remove',
                }) }
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

ShoppingCart.propTypes = {
  updatestate: PropTypes.func.isRequired,
  cart: PropTypes.objectOf.isRequired,
};

export default ShoppingCart;
