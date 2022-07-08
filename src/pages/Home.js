import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getCategories, getProductsFromCategoryAndQuery} from '../services/api';

class Home extends Component {
  state = {
    categorias: [],
    pesquisadoVazio: true,
    valueInput: '',
    pesquisado: [],
  };

  async componentDidMount() {
    const categorias = await getCategories();
    this.setState({categorias});
  }

  handleChange = ({target}) => {
    const valueInput = target.value;
    this.setState(() => ({valueInput}));
  };

  pesquisaItemsPorTermo = async () => {
    const {valueInput} = this.state;
    const query = valueInput;
    const response = await getProductsFromCategoryAndQuery({
      category: '',
      query,
    });
    const {results} = response;
    this.setState({pesquisado: results, pesquisadoVazio: false});
  };

  pesquisaItemsPorCategoria = async ({target}) => {
    const category = target.value;
    const response = await getProductsFromCategoryAndQuery({
      category,
      query: '',
    });
    const {results} = response;
    this.setState({pesquisado: results, pesquisadoVazio: false});
  };

  verificaCampoPesquisa = () => {
    const {pesquisadoVazio, pesquisado} = this.state;
    if (pesquisadoVazio) {
      return (
        <p data-testid='home-initial-message'>
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

    return pesquisado.map((produto) => (
      <div key={produto.id} data-testid='product'>
        <p>{produto.title}</p>
        <img alt='sla' src={produto.thumbnail} />
        <p>{produto.price}</p>
      </div>
    ));
  };

  render() {
    const {categorias, valueInput} = this.state;
    const listaButtons = categorias.map((categorie) => (
      <button
        type='button'
        key={categorie.id}
        data-testid='category'
        id={categorie.name}
        onClick={this.pesquisaItemsPorCategoria}
        value={categorie.id}
      >
        {categorie.name}
      </button>
    ));
    return (
      <div>
        {listaButtons}
        <div>
          <Link to='/shoppingCart' data-testid='shopping-cart-button'>
            Carrinho
          </Link>
        </div>
        <label htmlFor='inputBusca'>
          Pesquisar:
          <input
            id='inputBusca'
            type='text'
            data-testid='query-input'
            name='valueInput'
            value={valueInput}
            onChange={this.handleChange}
          />
        </label>
        <button
          type='button'
          data-testid='query-button'
          onClick={this.pesquisaItemsPorTermo}
        >
          Enviar
        </button>
        {this.verificaCampoPesquisa()}
      </div>
    );
  }
}

export default Home;
