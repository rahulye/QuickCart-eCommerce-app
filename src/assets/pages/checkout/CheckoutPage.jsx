import axios from 'axios';
import { useEffect, useState } from 'react';
import './CheckoutPage.css';
import './CheckoutPage-header.css'
import { CheckoutGrid } from './CheckoutGrid';
import { CheckoutHeader } from './CheckoutHeader';
export function CheckoutPage({ cart }) {
  const [ deliveryOption , setdeliveryOption ] = useState([]);
  const [ paymentSummary , setpaymentSummary ] = useState(null);
  useEffect(() => {
    document.title = 'Checkout';
  }, []);
  useEffect( () => {
    axios.get( '/api/delivery-options?expand=estimatedDeliveryTime' )
      .then( ( response ) => {
        setdeliveryOption( response.data )
      })
      .catch( (error) => console.log('API error : ' + error) )
    axios.get( '/api/payment-summary' )
      .then( ( response ) => {
        setpaymentSummary( response.data )
      })
      .catch( (error) => console.log('API error : ' + error) )
    }, [])
    return (
      <>
        <CheckoutHeader cart={ cart }/>
        <div className="checkout-page">
          <div className="page-title">Review your order</div>
          {paymentSummary &&
            <CheckoutGrid deliveryOption={ deliveryOption } paymentSummary={ paymentSummary } cart={ cart }/>
          }
        </div>
      </>
  );
};