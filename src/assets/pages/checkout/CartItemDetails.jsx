import dayjs from 'dayjs';
import { formatPrice } from '../../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';
import { useEffect, useState } from 'react';
import axios from 'axios';
export function CartItemDetails({ cartItem , selectedDeliveryOption , deliveryOption , loadCart }) {
  let [ isToggle , setIsToggle ] = useState(false);
  let [ quantity , setUpdateQuantity ] = useState(cartItem.quantity);
  const toggleInput = () => {
    setIsToggle(!isToggle);
  }
  //update-btn
  const updateQuantityInput = (event) => {
    setUpdateQuantity( event.target.value );
  }
  //save-btn
  const saveQuantity = async () => {
    const numericQuantity = Number(quantity);
    if ( !Number.isInteger( numericQuantity ) || numericQuantity < 1 || numericQuantity > 10 ) {
      alert("Invalid quantity. Enter whole number between 1 and 10");
      setUpdateQuantity(cartItem.quantity);
      setIsToggle(false);
      return;
    }
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: numericQuantity
    });
    await loadCart();
    setIsToggle(false);
  }
  useEffect( () => {
    setUpdateQuantity( cartItem.quantity )
  },[ cartItem.quantity ])
  //delete-btn
  const updateDeleteProduct = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }
  //onkey
  const updateOnKey = ( event ) => {
    if( event.key === 'Enter' ) {
      saveQuantity()
    }
    else if( event.key === 'Escape' ) {
      setUpdateQuantity(cartItem.quantity);
      setIsToggle(false);
    }
  }
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
              Quantity: { isToggle ? 
                <input className="quantity-input" 
                  type= 'number'
                  value={ quantity } 
                  onChange={ updateQuantityInput }
                  onKeyDown={ updateOnKey }
                /> :
                <span className="quantity-label">{ quantity } </span>
              }
            </span>
            { isToggle ? 
              <span onClick={ saveQuantity } className="update-quantity-link link-primary">
                Save
              </span> :
              <span onClick={ toggleInput } className="update-quantity-link link-primary">
                Update
              </span> 
            }
            <span onClick={ updateDeleteProduct } className="delete-quantity-link link-primary">
              Delete
            </span>
          </div>
        </div>
        <DeliveryOptions deliveryOption={ deliveryOption } cartItem={ cartItem } loadCart={ loadCart }/>
      </div>
    </div>
  )
}