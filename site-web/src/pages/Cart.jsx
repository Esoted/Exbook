import { useContext, useState, useEffect } from 'react';
import ProductContext from '../contexts/ProductContext';
import { ACTIONS } from '../reducer/reducer';
import '../styles/Cart.css';


function CartPage() {
  const { state, dispatch } = useContext(ProductContext);
  const [total, setTotal] = useState(0);

  const isCartEmpty = () => {
    return state.cartProducts.length === 0;
  };

  const cartButtons = isCartEmpty() ? 'base-button checkout empty-cart' : 'base-button checkout';

  // TODO : Calculer et afficher le prix total des produits dans le panier
  useEffect(() => {
    const totalPrice = state.cartProducts.reduce((currentTotal, product) => {
      return product.price + currentTotal;
    }, 0);
    setTotal(totalPrice.toFixed(2));
  }, [state.cartProducts]);

  return (
    <>
      <main>
        <section id='cart-content'>
          <h2>Votre panier</h2>
          {isCartEmpty() && (
            <div className='no-available-product'>
              <h3>Le panier est présentement vide</h3>
            </div>
          )}
          <div className='cart-products-wrapper'>
            {state.cartProducts.map((product) => (
              <div className='product-and-button' key={product.id}>
                <div className='cart-products-content'>
                  <span>{product.name} </span>
                  <span>{product.price}</span>
                </div>
                <button
                  onClick={() => {
                    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: { id: product.id } });
                  }}
                  className='base-button remove-item'
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div id='price'>Prix total : {total}$</div>
          {/* TODO : Rendre les boutons disponibles seulement si le panier n'est pas vide */}
          <div className='checkout-buttons-wrapper'>
            {/* TODO : Vider le panier */}
            <button
              id='empty-cart-button'
              onClick={() => { 
                dispatch({ type: ACTIONS.EMPTY_CART }); 
              }}
              className={cartButtons}
              disabled = {isCartEmpty()}
            >
              Vider le panier
            </button>
            {/* TODO : Procéder à l'achat */}
            <button
              id='checkout-button'
              onClick={() => {
                dispatch({ type: ACTIONS.CHECKOUT_CART });
               }}
              className={cartButtons}
              disabled = {isCartEmpty()}
            >
              Procéder à l'achat
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default CartPage;
