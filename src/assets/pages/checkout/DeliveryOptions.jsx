import dayjs from "dayjs";
import { formatPrice } from "../../../utils/money";
import axios from "axios";
export function DeliveryOptions({ deliveryOption , cartItem , loadCart}) {
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
          const updateDeliveryOptions = async () => {
            await axios.put( `/api/cart-items/${ cartItem.productId }` , {
              deliveryOptionId : option.id
            });
            await loadCart();
          } 
          return (
            <label key={ option.id } className="delivery-option">
              <input type="radio" checked={ cartItem.deliveryOptionId === option.id } className="delivery-option-input" name={`delivery-option-${ cartItem.productId }`} onChange={ updateDeliveryOptions }/>
              <div>
                <div className="delivery-option-date">
                  { dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMM D') }
                </div>
                <div className="delivery-option-price">
                  { priceString }
                </div>
              </div>
            </label>
          )
        })
      }
    </div>
  )
}