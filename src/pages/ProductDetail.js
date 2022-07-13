import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductData } from '../services/api';

class ProductDetail extends Component {
  state = {
    currentProduct: {},
    cart: [],
  }

  // Realiza a requisição das informações do produto e recupera o carrinho da Local Storage.
  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const currentProduct = await getProductData(id);
    const previousCart = localStorage.getItem('cart');
    const recoverCart = previousCart === null ? [] : Object.values(JSON.parse(previousCart));
    const cart = recoverCart.map((item) => JSON.parse(item));
    this.setState({ currentProduct, cart });
  }

  // Adiciona um NOVO item ao carrinho.
  createProductCart = async () => {
    const { currentProduct, cart } = this.state;
    const id = currentProduct.id;
    const checkAddProduct = cart.some((product) => product.productID === id);
    if(checkAddProduct) return alert('Este produto já está adicionado ao carrinho.');

    const product = {
      productID: id,
      quantity: 1,
      productData: currentProduct,
      rating: null,
      valuation: null,
    };
    
    // Atualiza o carrinho de compras no estado e na Local Storage.
    this.setState(
      (previousState) => ({ cart: [ ...previousState.cart, product] }),
      () => {
        const { cart } = this.state;
        const convertCart = cart.reduce((acc, item, index) => {
          const content = JSON.stringify(item);
          acc[`${index}`] = content;
          return acc;
        }, {});
        localStorage.setItem('cart', JSON.stringify(convertCart));
      }
    ); 
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <>
        {/* Link para a página inicial. */}
        <Link to="/" >
          <h3>Home</h3>
        </Link>

        {/* Link para o carrinho de compras. */}
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <h3>Carrinho</h3>
        </Link>

        {/* Ficha técnica do produto. */}
        <p data-testid="product-detail-name">{ currentProduct.title }</p>
        <img alt="product-detail" src={ currentProduct.thumbnail } />
        <p>{ currentProduct.price }</p>

        {/* Botão que adiciona o produto ao carrinho de compras. */}
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          id={ currentProduct.id }
          onClick={ this.createProductCart }
        >
          Adicionar ao carrinho
        </button>
      </>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default ProductDetail;
