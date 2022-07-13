import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import starVoid from '../images/starVoid.png';
import starFull from '../images/starFull.png';
import {getProductData} from '../services/api';

class ProductDetail extends Component {
  state = {
    currentProduct: {},
    currentEvaluation: {
      email: '',
      rating: 0,
      evaluation: '',
    },
  };

  // Realiza a requisição das informações do produto e recupera o carrinho da Local Storage.
  async componentDidMount() {
    const {
      match: {
        params: {id},
      },
    } = this.props;

    const recoverEvaluations = localStorage.getItem('evaluations');
    const evaluations =
      recoverEvaluations === null ? {} : JSON.parse(recoverEvaluations);
    const listEvaluations = Object.keys(evaluations);
    const currentEvaluation = listEvaluations.includes(id)
      ? {
          email: evaluations[id].email,
          rating: evaluations[id].rating,
          evaluation: evaluations[id].evaluation,
        }
      : {email: '', rating: 0, evaluation: ''};

    this.setState({
      currentProduct: await getProductData(id),
      currentEvaluation,
    });
  }

  handleChange = ({target}) => {
    const property = target.name;
    const newValue = target.value;

    this.setState((previousState) => ({
      currentEvaluation: {
        ...previousState.currentEvaluation,
        [property]: newValue,
      },
    }));
  };

  handleClick = (currentEvaluation) => {
    const {updatestate} = this.props;
    const {currentProduct} = this.state;
    // this.setState({
    //   currentEvaluation: {
    //     email: '',
    //     rating: 0,
    //     evaluation: '',
    //   },
    // });
    updatestate({
      data: {
        productID: currentProduct.id,
        currentEvaluation,
      },
      action: 'addProductEvaluation',
    });
  };

  handleClickRating = ({target}) => {
    const rating = Number(target.name);
    this.setState((previousState) => ({
      currentEvaluation: {
        ...previousState.currentEvaluation,
        rating,
      },
    }));
  };

  render() {
    const {
      currentProduct,
      currentEvaluation: {email, rating, evaluation},
      currentEvaluation,
    } = this.state;
    const {updatestate} = this.props;
    const initialRating = ['A', 'B', 'C', 'D', 'E'];

    return (
      <>
        {/* Link para a página inicial. */}
        <Link to='/'>
          <h3>Home</h3>
        </Link>

        {/* Link para o carrinho de compras. */}
        <Link to='/shoppingcart' data-testid='shopping-cart-button'>
          <h3>Carrinho</h3>
        </Link>

        {/* Ficha técnica do produto. */}
        <p data-testid='product-detail-name'>{currentProduct.title}</p>
        <img alt='product-detail' src={currentProduct.thumbnail} />
        <p>{currentProduct.price}</p>

        {/* Botão que adiciona o produto ao carrinho de compras. */}
        <button
          type='button'
          data-testid='product-detail-add-to-cart'
          onClick={() =>
            updatestate({
              data: currentProduct,
              action: 'addProductCart',
            })
          }
        >
          Adicionar ao carrinho
        </button>

        <form>
          <label htmlFor='product-detail-email'>
            e-mail:
            <input
              data-testid='product-detail-email'
              id='product-detail-email'
              type='text'
              name='email'
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor='product-detail-evaluation'>
            Avaliação:
            <textarea
              data-testid='product-detail-evaluation'
              id='product-detail-evaluation'
              name='evaluation'
              value={evaluation}
              onChange={this.handleChange}
            >
              Escreva aqui sua avaliação.
            </textarea>
          </label>
          <span>
            {initialRating.map((item, index) => {
              return (
                <span key={`${item + 1 + index}`}>
                  {index + 1 <= rating ? (
                    <img
                      data-testid={`${index + 1}-rating`}
                      name={`${index + 1}`}
                      alt='star full'
                      src={starFull}
                      onClick={this.handleClickRating}
                    />
                  ) : (
                    <img
                      data-testid={`${index + 1}-rating`}
                      name={`${index + 1}`}
                      alt='star void'
                      src={starVoid}
                      onClick={this.handleClickRating}
                    />
                  )}
                </span>
              );
            })}
          </span>
          <button
            data-testid='submit-review-btn'
            type='button'
            onClick={() => this.handleClick(currentEvaluation)}
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
  updatestate: PropTypes.func.isRequired,
};

export default ProductDetail;
