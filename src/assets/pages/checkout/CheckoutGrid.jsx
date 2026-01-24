import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
export function CheckoutGrid({ deliveryOption , paymentSummary , cart , loadCart}) {
  return (
    <div className="checkout-grid">
      <OrderSummary deliveryOption={ deliveryOption } cart={ cart } loadCart={ loadCart }/>
      <PaymentSummary paymentSummary={ paymentSummary } loadCart={ loadCart }/>
    </div>
  )
}