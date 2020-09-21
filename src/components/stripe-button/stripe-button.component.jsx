import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100 ;
    const publishableKey = 'pk_test_51HTk1KAJH6f6anLH1SgiZu5dG0ZMKduTHbBuh7JgW3UEI7zY6MbheEbJYXpXbuMtuW8uM7DL4ZrOBHmrN4MsNloM00hDdbwUuZ';
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    return (
        <StripeCheckout 
            label='Pay Now'
            name = 'CROWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your totla price is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    )
}  

export default StripeCheckoutButton;