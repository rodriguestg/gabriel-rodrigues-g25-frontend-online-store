import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductDetail extends Component {
  state = {
    idInfos: {},
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const ENDPOINT = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(ENDPOINT);
    const idInfos = await response.json();
    this.setState({ idInfos });
  }

  render() {
    const { idInfos } = this.state;
    const { handleClickCart } = this.props;
    return (
      <div>
        {/* Link para o carrinho de compras. */}
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          <h3>Carrinho</h3>
        </Link>
        <p data-testid="product-detail-name">{ idInfos.title }</p>
        <img alt="product-detail" src={ idInfos.thumbnail } />
        <p>{ idInfos.price }</p>
        <button
          id={ idInfos.id }
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ handleClickCart }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

export default ProductDetail;

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  handleClickCart: PropTypes.func.isRequired,
};
