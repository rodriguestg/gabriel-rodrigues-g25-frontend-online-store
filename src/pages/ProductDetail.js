import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductData } from '../services/api';

class ProductDetail extends Component {
  state = {
    currentProduct: {},
    currentEvaluation: {
      email: '',
      rating: 0,
      evaluation: '',
    },
  }

  // Realiza a requisição das informações do produto e recupera o carrinho da Local Storage.
  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ currentProduct: await getProductData(id) });
  }

  handleChange = ({ target }) => {
    const property = target.name;
    const newValue = target.value;

    this.setState((previousState) => ({
      currentEvaluation: { ...previousState.currentEvaluation, [property]: newValue },
    }));
  }

  render() {
    const { 
      currentProduct,
      currentEvaluation: {
        email,
        rating,
        evaluation,
      },
      currentEvaluation,
    } = this.state;
    const { updatestate } = this.props;

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
          data-testid="product-detail-add-to-cart"
          onClick={ () => updatestate({ 
            data: currentProduct,
            action: "addProductCart" 
          }) }
        >
          Adicionar ao carrinho
        </button>

        <form>
          <label htmlFor="product-detail-email">
            e-mail:
            <input
              data-testid="product-detail-email"
              id="product-detail-email"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="product-detail-evaluation">
            Avaliação:
            <textarea
              data-testid="product-detail-evaluation"
              id="product-detail-evaluation"
              name="evaluation"
              value={ evaluation }
              onChange={ this.handleChange }
            >
              Escreva aqui sua avaliação.
            </textarea>
          </label>
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={ () => updatestate({ 
              data: currentEvaluation,
              action: "addProductEvaluation"
            }) }
          >
            Enviar Avaliação
          </button>
        </form>
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
