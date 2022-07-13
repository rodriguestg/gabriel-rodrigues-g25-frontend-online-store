import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
  getProductData,
} from '../services/api';

class Home extends Component {
  state = {
    categories: [],
    searchTerm: '',
    searchResults: [],
    searchMessage: 'initial',
    clientData: {},
    cart: [],
    // Estrutura da propriedade 'cart':
    //
    // {
    //   productID: 'ID do produto',
    //   quantity: 'quantidade',
    //   productData: 'retorno da API sobre o produto',
    //   rating: 'nota do produto de 1 a 5 estrelas',
    //   valuation: 'avaliação comentada do produto',
    // }
  };

  // Realiza a requisição das categorias de produtos e recupera o carrinho da Local Storage.
  async componentDidMount() {
    const categories = await getCategories(); 
    const previousCart = localStorage.getItem('cart');
    const recoverCart = previousCart === null ? [] : Object.values(JSON.parse(previousCart));
    const cart = recoverCart.map((item) => JSON.parse(item));
    this.setState({ categories, cart });
  }

  // Controla o valor da barra de pesquisa.
  handleChange = ({ target }) => {
    const searchTerm = target.value;
    this.setState(() => ({ searchTerm }));
  };

  // Direciona para a página de detalhes, com os dados de um produto específico.
  productDetails = (productID) => {
    const { history } = this.props;
    history.push(`/productdetail/${productID}`);
  }

  // Adiciona um NOVO item ao carrinho.
  createProductCart = async (productID) => {
    const { cart } = this.state;
    const checkAddProduct = cart.some((product) => product.productID === productID);
    if(checkAddProduct) return alert('Este produto já está adicionado ao carrinho.');

    const productData = await getProductData(productID);
    const product = {
      productID,
      quantity: 1,
      productData,
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

  // Realiza uma busca através de um termo específico.
  searchItemsByTerm = async () => {
    const { searchTerm } = this.state;
    const response = await getProductsFromCategoryAndQuery({
      category: '',
      query: searchTerm,
    });
    const searchMessage = response.results.length === 0 ? 'null' : 'search';
    this.setState({ searchResults: response.results, searchMessage });
  };

  // Realiza uma busca através de uma categoria.
  searchItemsByCategorie = async ({ target: { value } }) => {
    const response = await getProductsFromCategoryAndQuery({
      category: value,
      query: '',
    });
    const searchMessage = response.results.length === 0 ? 'null' : 'search';
    this.setState({ searchResults: response.results, searchMessage });
  };

  render() {
    const { 
      categories, 
      searchTerm, 
      searchResults, 
      searchMessage,
    } = this.state;

    // Mensagens para "tela inicial" e "sem resultados de busca".
    const initialResults = (
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );
    const nullResults = <p>Nenhum produto foi encontrado</p>;

    return (
      <>
        {/* Barra de categorias de produtos. */}
        {categories.map((categorie) => (
          <button
            key={ categorie.id }
            data-testid="category"
            id={ categorie.name }
            type="button"
            value={ categorie.id }
            onClick={ this.searchItemsByCategorie }
          >
            {categorie.name}
          </button>
        ))}

        {/* Link para o carrinho de compras. */}
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <h3>Carrinho</h3>
        </Link>

        {/* Barra de pesquisa de produtos. */}
        <div id="searchBar">
          <label htmlFor="searchField">
            Digite o termo de pesquisa:
            <input
              data-testid="query-input"
              id="searchField"
              type="text"
              name="searchTerm"
              value={ searchTerm }
              onChange={ this.handleChange }
            />
          </label>

          <button
            data-testid="query-button"
            type="button"
            onClick={ this.searchItemsByTerm }
          >
            Pesquisar
          </button>
        </div>

        {/* Resultados de pesquisa de produtos. */}
        {searchMessage === 'initial' && initialResults}
        {searchMessage === 'null' && nullResults}
        {searchMessage === 'search'
          && searchResults.map((product) => (
            <div
              key={ product.id }
              data-testid="product"
            >

              {/* Informações básicas sobre o produto. */}
              <p>{product.title}</p>
              <img alt={ product.title } src={ product.thumbnail } />
              <p>{product.price}</p>

              {/* Botão que direciona para a página de detalhes do produto. */}
              <button
                data-testid="product-detail-link"
                type="button"
                onClick={ () => this.productDetails(product.id) }
              >
                Detalhes
              </button>

              {/* Botão que adiciona o produto ao carrinho de compras. */}
              <button                
                data-testid="product-add-to-cart"
                type="button"
                onClick={ () => this.createProductCart(product.id) }
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))}
      </>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Home;


