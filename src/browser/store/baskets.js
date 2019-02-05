export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const CLEAR_BASKET = 'CLEAR_BASKET';
export const CLEAR_ALL_BASKETS = 'CLEAR_ALL_BASKETS';

/*
 *  The baskets are implemented as nested hash lists
 *  So retrieving the products list for one restaurant basket is quick,
 *  and isn't dependent of the amount of data stored.
 */

export default (state = {}, action) => {
  switch (action.type) {
    case CLEAR_BASKET:
      return Object.keys(state).reduce((newState, currentBasketId) => {

        // This is the basket we need to clear
        // we don't include it in the new state
        if (currentBasketId == action.basketId) {
          return newState;
        }

        // Not the basket we need to clear, just return it
        newState[currentBasketId] = state[currentBasketId];
        return newState;
      }, {});

    case CLEAR_ALL_BASKETS:
      return {};

    case ADD_PRODUCT: {
      const { id } = action.product;
      const restaurantId = action.product.restaurant.id;
      const restaurantBasket = state[restaurantId];
      const productStored = restaurantBasket &&
        restaurantBasket.products &&
        restaurantBasket.products[id];


      return {
        ...state,
        [restaurantId]: {
          ...state[restaurantId],
          restaurant: action.product.restaurant,
          products: {
            // ALready existing products
            ...(state[restaurantId] ? state[restaurantId].products : {}),

            // For the product we want to add
            [id]: productStored

              // If the product already exists in the basket
              // We increase its quantity
              ? { ...productStored, quantity: productStored.quantity + 1 }

              // Else, we put it there
              : { ...action.product, quantity: 1 }
          }
        }
      };
    }

    case REMOVE_PRODUCT: {
      const { id, name } = action.product;
      const restaurantId = action.product.restaurant.id;
      const restaurantBasket = state[restaurantId];
      const productStored = restaurantBasket &&
        restaurantBasket.products &&
        restaurantBasket.products[id];

      // Product doesn't exist in baskets
      // This should never happen
      if (!productStored) {
        console.error(`Error: Unable to remove product id: ${id}, name: ${name}`);
        return state;
      }

      return Object.keys(state).reduce((newState, currentBasketId) => {

        // This is not the basket we need to remove
        // a product from, just return it
        if (currentBasketId != restaurantId) {
          newState[currentBasketId] = state[currentBasketId];
          return newState;
        }

        // The product we remove is the only one
        // In the whole basket, remove the basket
        if (productStored.quantity === 1 &&
          Object.keys(state[currentBasketId].products).length === 1) {
          return newState;
        }

        // Decrease the quantity of the removed product
        // In the basket
        newState[currentBasketId] = {
          ...newState[currentBasketId],
          products: Object.keys(state[currentBasketId].products).reduce((newBasketState, currentProductId) => {

            // Not the product we need to remove
            if (currentProductId != id) {
              newBasketState[currentProductId] = state[currentBasketId].products[currentProductId];
              return newBasketState;
            }

            // Only product left of that type, remove it
            if (productStored.quantity === 1) {
              return newBasketState;
            }

            // Decrease quantity
            newBasketState[currentProductId] = {
              ...state[currentBasketId].products[currentProductId],
              quantity: state[currentBasketId].products[currentProductId].quantity - 1
            };

            return newBasketState;
          }, {})
        };

        return newState;
      }, {});
    }

    default:
      return state;
  }
}
