
import { CartItemDetails } from './CartItemDetails';
export function OrderSummary({ deliveryOption , cart , loadCart }) {
  return (
    <div className="order-summary">
      {
        deliveryOption.length>0 && cart.map( ( cartItem ) => {
          const selectedDeliveryOption = deliveryOption.find( (deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
          })
          return (
            <CartItemDetails key={ cartItem.id } cartItem={ cartItem } selectedDeliveryOption= { selectedDeliveryOption } deliveryOption={ deliveryOption } loadCart={loadCart } />
          )
        })
      }
    </div>
  )
}