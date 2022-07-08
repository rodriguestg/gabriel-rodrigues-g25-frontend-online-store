import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
    };
  }

  async componentDidMount() {
    const response = await getCategories();
    this.setState({ categorias: response });
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
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
