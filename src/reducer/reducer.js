import HTTPManager from '../utils/http_manager';

export const ACTIONS = {
  ADD_TO_CART: 'addProductToCart',
  REMOVE_FROM_CART: 'removeFromCart',
  EMPTY_CART: 'emptyCart',
  CHECKOUT_CART: 'checkoutCart',
  REFUND_PURCHASE: 'refundPurchase',
  BUY_NOW: 'buyNow',
};

const httpManager = new HTTPManager();

export default function reducer(state, action) {
  async function purchaseProducts(cartProducts) {
    const productIds = [];
    let totalCost = 0;
    cartProducts.forEach((product) => {
      totalCost = totalCost + product.price;
      productIds.push(product.id);
    });
    const purchase = {
      productIds,
      totalCost,
    };
    await httpManager.makePurchase(purchase);
  }

  async function purchaseProduct(product) {
    purchaseProducts([product]);
  }

  async function refundPurchase(purchaseId) {
    await httpManager.deletePurchase(purchaseId);
  }

  switch (action.type) {
    // TODO : implémenter l'action d'ajout au panier
    case ACTIONS.ADD_TO_CART:
      const newProducts = [...state.cartProducts, action.payload.product];
      localStorage.setItem('cartProducts', JSON.stringify(newProducts));
      return {
        ...state,
        cartProducts: newProducts
      };
    // TODO : implémenter l'action de retrait du panier
    case ACTIONS.REMOVE_FROM_CART:
      const newArray = state.cartProducts.filter(p => p.id !== action.payload.id);
      localStorage.setItem('cartProducts',JSON.stringify(newArray));
      return {
        ...state,
        cartProducts:  newArray
      };
    // TODO : implémenter l'action de vider le panier
    case ACTIONS.EMPTY_CART:
      case ACTIONS.EMPTY_CART:
        localStorage.setItem('cartProducts',JSON.stringify([]));
        return {
          ...state,
          cartProducts:  []
        };
    case ACTIONS.CHECKOUT_CART:
      purchaseProducts([...state.cartProducts]);
      return {
        cartProducts: [],
      };
    case ACTIONS.BUY_NOW:
      purchaseProduct(action.payload.product);
      return {
        cartProducts: [...state.cartProducts],
      };
    case ACTIONS.REFUND_PURCHASE:
      refundPurchase(action.payload.id);
      return {
        cartProducts: [...state.cartProducts],
      };
    default:
      return state;
  }
}
