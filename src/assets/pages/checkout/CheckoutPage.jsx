import axios from 'axios';
import { useEffect, useState } from 'react';
import { CheckoutGrid } from './CheckoutGrid';
import { CheckoutHeader } from './CheckoutHeader';
import './CheckoutPage.css';
import './CheckoutPage-header.css'
export function CheckoutPage({ cart , loadCart }) {
  const [ deliveryOption , setdeliveryOption ] = useState([]);
  const [ paymentSummary , setpaymentSummary ] = useState(null);
  useEffect(() => {
    document.title = 'Checkout';
  }, []);
  useEffect( () => {
    const fetchCheckoutData = async () => {
      let response = await axios.get( '/api/delivery-options?expand=estimatedDeliveryTime' );
      setdeliveryOption( response.data );
      // response = await axios.get( '/api/payment-summary' );
      // setpaymentSummary( response.data )
    }
    fetchCheckoutData();
  }, []);
  useEffect( () => { // created this new beacuse to update the deliveryOptions regarding the payment 
    const fetchPayement = async () => {
      const response = await axios.get( '/api/payment-summary' );
      setpaymentSummary( response.data )
    };
    fetchPayement();
  }, [cart])
  return (
    <>
      <CheckoutHeader cart={ cart }/>
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        {paymentSummary &&
          <CheckoutGrid deliveryOption={ deliveryOption } paymentSummary={ paymentSummary } cart={ cart } loadCart={ loadCart } />
        }
      </div>
    </>
  );
};