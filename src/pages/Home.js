import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
      pesquisadoVazio: true,
      pesquisado: [],
    };
  }

  async componentDidMount() {
    const response = await getCategories();
    this.setState({ categorias: response });
  }

  pesquisaItemsPorTermo = async () => {
    const input = document.getElementById('inputBusca');
    const busca = input.value;
    const ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?q=${busca}`;
    const response = await fetch(ENDPOINT);
    const respostaPesquisaPorTermo = await response.json();
    const { results } = respostaPesquisaPorTermo;
    this.setState({ pesquisado: results, pesquisadoVazio: false });
  };

  verificaCampoPesquisa = () => {
    const { pesquisadoVazio, pesquisado } = this.state;
    if (pesquisadoVazio) {
      return (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      );
    }
    if (pesquisado.length === 0) {
      return (
        <div>
          <p>Nenhum produto foi encontrado</p>
        </div>
      );
    }
    return (
      pesquisado.map((produto) => (
        <div key={ produto.id } data-testid="product">
          <p>{ produto.title }</p>
          <img alt="sla" src={ produto.thumbnail } />
          <p>{ produto.price }</p>
        </div>
      ))
    );
  }

  render() {
    const { categorias } = this.state;
    const listaButtons = categorias.map((categorie) => (
      <button
        type="button"
        key={ categorie.id }
        data-testid="category"
      >
        { categorie.name }
      </button>));
    return (
      <div>
        {
          listaButtons
        }
        <div>
          <Link to="/shoppingCart" data-testid="shopping-cart-button">Carrinho</Link>
        </div>
        <label htmlFor="inputBusca">
          Pesquisar:
          <input id="inputBusca" type="text" data-testid="query-input" />
        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.pesquisaItemsPorTermo }
        >
          Enviar
        </button>
        {
          this.verificaCampoPesquisa()
        }
      </div>
    );
  }
}

export default Home;
