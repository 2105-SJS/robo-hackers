

import React, {useEffect, useState} from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {CheckoutForm} from "./"
const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY || "pk_test_51JtOF7EVXf2zAV5xectHvOsZXQrBA7EgXR3OfcEXkoNSXr5XWMfP3kSFWEJLUHjrbQdW9BpIMmb16rIGpXmGOYCR00KVJtxBmT"
const stripePromise = loadStripe(stripeKey);


const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const dummyItem = {
          description: "tasty vanilla ice cream",
          price: 5.99,
          imageURL:"ice cream",
          inStock: true,
          category:'food'
        }
        fetch("/api/orders/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [dummyItem] }),
        })
          .then((res) => res.json())
          .then((data) => {
            setClientSecret(data.clientSecret)
          
          });
      }, []);
    
      const appearance = {
        theme: 'night',
      };
      const options = {
        clientSecret,
        appearance,
      };
    return <>
    {clientSecret && (
            <Elements options = {options} stripe = {stripePromise}>
              <CheckoutForm />
            </Elements>
          )}

    </>;
}

export default Checkout;