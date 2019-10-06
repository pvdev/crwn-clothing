import CartActionTypes from './cart.types'
import {
  addItemToCart,
  clearItemFromCart,
  decrementItemFromCart,
} from './cart.utils'

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
}

const cartReducer = (cartState = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...cartState,
        hidden: !cartState.hidden,
      }
    case CartActionTypes.ADD_ITEM:
      return {
        ...cartState,
        cartItems: addItemToCart(cartState.cartItems, action.payload),
      }
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...cartState,
        cartItems: clearItemFromCart(cartState.cartItems, action.payload),
      }
    case CartActionTypes.DECREMENT_ITEM_FROM_CART:
      return {
        ...cartState,
        cartItems: decrementItemFromCart(cartState.cartItems, action.payload),
      }
    default:
      return cartState
  }
}

export default cartReducer
