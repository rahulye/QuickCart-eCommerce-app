import dayjs from 'dayjs';
import { formatPrice } from '../../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';
export function OrderSummary({ deliveryOption , cart }) {
  return (
    <div className="order-summary">
      {
        deliveryOption.length>0 && cart.map( ( cartItem ) => {
          const selectedDeliveryOption = deliveryOption.find( (deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
          })
          return (
            <div key={ cartItem.productId } className="cart-item-container">
              <div className="delivery-date">
                Delivery date: { dayjs( selectedDeliveryOption.estimatedDeliveryTimeMs ).format('dddd, MMM D') }
              </div>
              <div className="cart-item-details-grid">
                <img className="product-image"
                  src={ cartItem.product.image } />

                <div className="cart-item-details">
                  <div className="product-name">
                    { cartItem.product.name }
                  </div>
                  <div className="product-price">
                    { formatPrice( cartItem.product.priceCents ) }
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity: <span className="quantity-label">{ cartItem.product.quantity }</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>
                <DeliveryOptions deliveryOption={ deliveryOption } cartItem={ cartItem } />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}