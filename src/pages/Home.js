import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getCategories, getProductsFromCategoryAndQuery} from '../services/api';

class Home extends Component {
  state = {
    categories: [],
    searchTerm: '',
    searchResults: [],
    searchMessage: 'initial',
  };

  // Realiza a requisição das categorias de produtos e recupera o carrinho da Local Storage.
  async componentDidMount() {
    const categories = await getCategories();
    this.setState({categories});
  }

  // Controla o valor da barra de pesquisa.
  handleChange = ({target}) => {
    const searchTerm = target.value;
    this.setState(() => ({searchTerm}));
  };

  // Direciona para a página de detalhes, com os dados de um produto específico.
  productDetails = (productID) => {
    const {history} = this.props;
    history.push(`/productdetail/${productID}`);
  };

  // Realiza uma busca através de um termo específico.
  searchItemsByTerm = async () => {
    const {searchTerm} = this.state;
    const response = await getProductsFromCategoryAndQuery({
      category: '',
      query: searchTerm,
    });
    const searchMessage = response.results.length === 0 ? 'null' : 'search';
    this.setState({searchResults: response.results, searchMessage});
  };

  // Realiza uma busca através de uma categoria.
  searchItemsByCategorie = async ({target: {value}}) => {
    const response = await getProductsFromCategoryAndQuery({
      category: value,
      query: '',
    });
    const searchMessage = response.results.length === 0 ? 'null' : 'search';
    this.setState({searchResults: response.results, searchMessage});
  };

  render() {
    const {categories, searchTerm, searchResults, searchMessage} = this.state;
    const {updatestate} = this.props;

    // Mensagens para "tela inicial" e "sem resultados de busca".
    const initialResults = (
      <p data-testid='home-initial-message'>
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );
    const nullResults = <p>Nenhum produto foi encontrado</p>;

    return (
      <>
        {/* Barra de categorias de produtos. */}
        {categories.map((categorie) => (
          <button
            key={categorie.id}
            data-testid='category'
            id={categorie.name}
            type='button'
            value={categorie.id}
            onClick={this.searchItemsByCategorie}
          >
            {categorie.name}
          </button>
        ))}

        {/* Link para o carrinho de compras. */}
        <Link to='/shoppingcart' data-testid='shopping-cart-button'>
          <h3>Carrinho</h3>
        </Link>

        {/* Barra de pesquisa de produtos. */}
        <div id='searchBar'>
          <label htmlFor='searchField'>
            Digite o termo de pesquisa:
            <input
              data-testid='query-input'
              id='searchField'
              type='text'
              name='searchTerm'
              value={searchTerm}
              onChange={this.handleChange}
            />
          </label>

          <button
            data-testid='query-button'
            type='button'
            onClick={this.searchItemsByTerm}
          >
            Pesquisar
          </button>
        </div>

        {/* Resultados de pesquisa de produtos. */}
        {searchMessage === 'initial' && initialResults}
        {searchMessage === 'null' && nullResults}
        {searchMessage === 'search' &&
          searchResults.map((product) => (
            <div key={product.id} data-testid='product'>
              {/* Informações básicas sobre o produto. */}
              <p>{product.title}</p>
              <img alt={product.title} src={product.thumbnail} />
              <p>{product.price}</p>

              {/* Botão que direciona para a página de detalhes do produto. */}
              <button
                data-testid='product-detail-link'
                type='button'
                onClick={() => this.productDetails(product.id)}
              >
                Detalhes
              </button>

              {/* Botão que adiciona o produto ao carrinho de compras. */}
              <button
                data-testid='product-add-to-cart'
                type='button'
                onClick={() =>
                  updatestate({
                    data: product,
                    action: 'addProductCart',
                  })
                }
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
  updatestate: PropTypes.func.isRequired,
};

export default Home;
