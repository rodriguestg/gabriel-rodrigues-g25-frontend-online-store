import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  render() {
    const { cart, updatestate } = this.props;
    const temp = Object.keys(cart);
    // console.log('Carrinho: ', cart)
    // if(Object.keys(cart).length !== 0) {
    //   console.log('1°: ', cart[temp[0]].productData.title);
    //   if(cart[temp[1]]) {
    //     console.log('2°: ', cart[temp[1]].productData.title);
    //   }      
    // }

    // Link para a página inicial.
    const buttonHome = (
      <Link to="/" >
        <h3>Home</h3>
      </Link>
    );

    // Renderiza a tela de carrinho vazio caso não haja produtos.
    if(Object.keys(cart).length === 0) return (
      <>
        {buttonHome}
        <div>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        </div>
      </>      
    );

    return (
      <>        
        {buttonHome}
        <h4>Carrinho de compras</h4>
        <button
          type='button'
          onClick={ () => updatestate({ 
            data: '',
            action: "clear"
          })}
        >
          Limpar carrinho
        </button>

        {/* Lista do carrinho de compras. */}
        {Object.entries(cart).map(([ id, product ]) => (
          <div key={ id }>
            <p data-testid="shopping-cart-product-name">
              { product.productData.title }
            </p>
            <img
              alt="product thumbnail"
              src={ product.productData.thumbnail }
            />
            <p>Preço: { product.productData.price }</p>
            <p data-testid="shopping-cart-product-quantity">
              { product.quantity }
            </p>
            <span>
              <button                
                data-testid="product-increase-quantity"
                type="button"
                onClick={ () => updatestate({ 
                  data: id,
                  action: "increase" 
                })}
              >
                + item
              </button>
              <button                
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ () => updatestate({ 
                  data: id,
                  action: "decrease" 
                })}
              >
                - item
              </button>
              <button
                type="button"
                onClick={ () => updatestate({ 
                  data: id,
                  action: "remove" 
                })}
              >
                Remover item
              </button>
            </span>
          </div>
        ))}
      </>
    );
  }
}

export default ShoppingCart;
