import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return (
      <div>
        <p data-testid="product-detail-name">{ idInfos.title }</p>
        <img alt="" src={ idInfos.thumbnail } />
        <p>{ idInfos.price }</p>
      </div>
    );
  }
}

// asasasas

export default ProductDetail;

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
