import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  state = {
    cartEmpty: false,
    products: [],
  }

  async componentDidMount() {
    const { productsAll } = this.props;
    if (productsAll.length !== 0) {
      this.setState({
        products: productsAll,
        cartEmpty: true,
      });
    }
  }

  renderCart = () => {
    const { products } = this.state;
    return products.map((product) => (
      <div key={ product.id }>
        <p data-testid="shopping-cart-product-name">{ product.title }</p>
        <img alt="" src={ product.thumbnail } />
        <p>{ product.price }</p>
        <p data-testid="shopping-cart-product-quantity"> X Produto</p>
      </div>
    ));
  };

  render() {
    const { cartEmpty } = this.state;
    const cartInitial = (
      <div>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </div>
    );
    return (
      <section>
        { cartEmpty ? this.renderCart() : cartInitial }
        <Link to="/">
          <button type="button">Voltar</button>
        </Link>
      </section>
    );
  }
}

export default ShoppingCart;

ShoppingCart.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  productsAll: PropTypes.string.isRequired,
};
