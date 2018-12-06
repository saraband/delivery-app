const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CLEAR_BASKET = 'CLEAR_BASKET';
const CLEAR_ALL_BASKETS = 'CLEAR_ALL_BASKETS';

export default (state = {}, action) => {
  switch (action.type) {
    case CLEAR_BASKET:
      return Object.keys(state).reduce((newState, currentBasketId) => {
        if (currentBasketId == action.basketId) {
          return newState;
        }

        newState[currentBasketId] = state[currentBasketId];
        return newState;
      }, {});

    case CLEAR_ALL_BASKETS:
      return {};

    case ADD_PRODUCT: {
      const {id, restaurantId} = action.product;
      const restaurantBasket = state[restaurantId];
      const productStored = restaurantBasket && restaurantBasket[id];

      return {
        ...state,
        [restaurantId]: {
          ...state[restaurantId],
          [id]: productStored
            ? { ...productStored, quantity: productStored.quantity + 1 }
            : { ...action.product, quantity: 1 }
        }
      };
    }

    case REMOVE_PRODUCT: {
      const {id, restaurantId, name} = action.product;
      const restaurantBasket = state[restaurantId];
      const productStored = restaurantBasket && restaurantBasket[id];

      // Product doesn't exist in baskets
      if (!productStored) {
        console.error(`Error: Unable to remove product id: ${id}, name: ${name}`);
        return state;
      }

      return Object.keys(state).reduce((newState, currentBasketId) => {
        if (currentBasketId != restaurantId) {
          newState[currentBasketId] = state[currentBasketId];
          return newState;
        }

        // Only product in basket, don't even return the basket
        if (productStored.quantity === 1 &&
          Object.keys(state[currentBasketId]).length === 1) {
          return newState;
        }

        newState[currentBasketId] = Object.keys(state[currentBasketId]).reduce((newBasketState, currentProductId) => {
          if (currentProductId != id) {
            newBasketState[currentProductId] = state[currentBasketId][currentProductId];
            return newBasketState;
          }

          newBasketState[currentProductId] = {
            ...state[currentBasketId][currentProductId],
            quantity: state[currentBasketId][currentProductId].quantity - 1
          };

          return newBasketState;
        }, {});

        return newState;
      }, {});
    }

    default:
      return state;
  }
}
