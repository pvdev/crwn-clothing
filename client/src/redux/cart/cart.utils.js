export const addItemToCart = (cartItems, cartItemToAdd) => {
  //check if item in cart and grab if so
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  )

  //if item exist in cart, increment quantity and update property
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  // add quantity property on first time item added cart entry
  // support first item in empty cart also
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

export const clearItemFromCart = (cartItems, itemToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id)
}

export const decrementItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  )

  if (existingCartItem.quantity === 1) {
    return clearItemFromCart(cartItems, cartItemToRemove)
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}
