import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
export function CheckoutGrid({ deliveryOption , paymentSummary , cart}) {
  return (
    <div className="checkout-grid">
      <OrderSummary deliveryOption={ deliveryOption } cart={ cart } />
      <PaymentSummary paymentSummary={ paymentSummary }/>
    </div>
  )
}