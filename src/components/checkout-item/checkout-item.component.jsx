import React from 'react'
import { connect } from 'react-redux'

import {
  addItem,
  decrementItemFromCart,
  clearItemFromCart,
} from '../../redux/cart/cart.actions'

import './checkout-item.styles.scss'

const CheckoutItem = ({
  cartItem,
  addItem,
  decrementItemFromCart,
  clearItemFromCart,
}) => {
  const { name, imageUrl, price, quantity } = cartItem
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='product item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => decrementItemFromCart(cartItem)}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className='price'>${quantity * price}</span>
      <div
        className='remove-button'
        onClick={() => clearItemFromCart(cartItem)}
      >
        &#10005;
      </div>
    </div>
  )
}

const mapDispatchToProps = { addItem, decrementItemFromCart, clearItemFromCart }

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem)
