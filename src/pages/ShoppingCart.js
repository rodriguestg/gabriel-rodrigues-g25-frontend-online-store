import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  state = {
    cartEmpty: false,
    products: [],
  }

  async componentDidMount() {
    const { productUp } = this.props;
    this.setState({
      productUpdate: productUp,
    }, () => {
      const { productUpdate } = this.state;
      if (productUpdate) { this.addProduct(); }
    });
  }

  addProduct = async () => {
    const { productUpdate } = this.state;
    const ENDPOINT = `https://api.mercadolibre.com/items/${productUpdate}`;
    const response = await fetch(ENDPOINT);
    const productAdd = await response.json();
    this.setState(({ products }) => ({
      cartEmpty: false,
      products: [...products, productAdd],
    }));
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
