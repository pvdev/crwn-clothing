import CartActionTypes from './cart.types'
import { addItemToCart } from './cart.utils'

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
    default:
      return cartState
  }
}

export default cartReducer
