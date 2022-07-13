import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductData } from '../services/api';

class ProductDetail extends Component {
  state = {
    currentProduct: {},
    cart: {},
  }

  // Realiza a requisição das informações do produto e recupera o carrinho da Local Storage.
  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const currentProduct = await getProductData(id);
    const recoverCart = localStorage.getItem('cart');
    const cart = recoverCart === null ? {} : JSON.parse(recoverCart);
    this.setState({ currentProduct, cart });
  }

  // Adiciona um NOVO item ao carrinho.
  addProductCart = async () => {
    const { currentProduct } = this.state;
    const id = currentProduct.id;
    const unity = 1;

    const product = {
      quantity: unity,
      productData: currentProduct,
      rating: null,
      valuation: null,
    };
    
    // Atualiza o carrinho de compras no estado e na Local Storage.
    this.setState(
      (previousState) => ({ 
        cart: {
          ...previousState.cart,
          [id]: product,
        }}
      ),
      () => {
        const { cart } = this.state;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    ); 
  }

  render() {
    const { currentProduct, cart } = this.state;

    return (
      <>
        {/* Link para a página inicial. */}
        <Link to="/" >
          <h3>Home</h3>
        </Link>

        {/* Link para o carrinho de compras. */}
        <Link 
          to="/shoppingcart" 
          data-testid="shopping-cart-button"
          savecart={ cart }
        >
          <h3>Carrinho</h3>
        </Link>


        {/* Ficha técnica do produto. */}
        <p data-testid="product-detail-name">{ currentProduct.title }</p>
        <img alt="product-detail" src={ currentProduct.thumbnail } />
        <p>{ currentProduct.price }</p>

        {/* Botão que adiciona o produto ao carrinho de compras. */}
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.addProductCart }
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
