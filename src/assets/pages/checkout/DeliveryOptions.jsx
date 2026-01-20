import dayjs from "dayjs";
import { formatPrice } from "../../../utils/money";
export function DeliveryOptions({ deliveryOption , cartItem }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {
        deliveryOption.map( (option) => {
          let priceString = 'FREE Shipping';
          if( option.priceCents > 0 ) {
            priceString = `${formatPrice( option.priceCents )} - Shipping`;
          }
          return (
            <div key={ option.id } className="delivery-option">
              <input type="radio" checked = { cartItem.deliveryOptionId === option.id }  readOnly
                className="delivery-option-input"
                name= {`delivery-option-${ cartItem.productId }`}/>
              <div>
                <div className="delivery-option-date">
                  { dayjs( option.estimatedDeliveryTimeMs ).format('dddd, MMM D')}
                </div>
                <div className="delivery-option-price">
                  { priceString }
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}