import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
  //stripe wants price is cents.
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_4CmDwegZDFvHZmmlVPR9uI0t00dBi0J2Qd'

  const onToken = token => {
    console.log('Token from Stripe: ', token)
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then(response => {
        // console.log('Payment success message: ', response)
        alert('Payment successful!')
      })
      .catch(error => {
        console.log('Payment error: ', error)
        alert(
          'There was an issue with your payment. Please use the provided FAKE credit card data '
        )
      })

    // TODO: Empty cart and provide own message/alert
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='Crown Shop'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton
