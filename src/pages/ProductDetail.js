import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductData } from '../services/api';

class ProductDetail extends Component {
  state = {
    currentProduct: {},
  };

  // Realiza a requisição das informações do produto e recupera o carrinho da Local Storage.
  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.setState({
      currentProduct: await getProductData(id),
    });
  }

  render() {
    const {
      currentProduct,
    } = this.state;
    const { updatestate } = this.props;

    return (
      <>
        {/* Link para a página inicial. */}
        <Link to="/">
          <h3>Home</h3>
        </Link>

        {/* Link para o carrinho de compras. */}
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <h3>Carrinho</h3>
        </Link>

        {/* Ficha técnica do produto. */}
        <p data-testid="product-detail-name">{currentProduct.title}</p>
        <img alt="product-detail" src={ currentProduct.thumbnail } />
        <p>{currentProduct.price}</p>

        {/* Botão que adiciona o produto ao carrinho de compras. */}
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => updatestate({
            data: currentProduct,
            action: 'addProductCart',
          }) }
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
  updatestate: PropTypes.func.isRequired,
};

export default ProductDetail;
