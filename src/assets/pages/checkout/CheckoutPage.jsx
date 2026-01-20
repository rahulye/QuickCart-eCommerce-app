import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/money';
import { cartQuantity } from '../../../utils/cart';
import './CheckoutPage.css';
import './CheckoutPage-header.css'
export function CheckoutPage({ cart }) {
  const [ deliveryOption , setdeliveryOption ] = useState([]);
  const [ paymentSummary , setpaymentSummary ] = useState(null);
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
  return(
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link"
              to="/">{ cartQuantity( cart ) } items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
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
                    </div>
                  </div>
                )
              })
            }
          </div>

          { // we need guard here cuz useeffect get axios after this componenet created when initial react try to render paySummary would be null-->rise error
            paymentSummary && ( 
            <div className="payment-summary">
              <div className="payment-summary-title">
                Payment Summary
              </div>

              <div className="payment-summary-row">
                <div>Items ({ paymentSummary.totalItems }):</div>
                <div className="payment-summary-money">{ formatPrice( paymentSummary.productCostCents ) }</div>
              </div>

              <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">{ formatPrice( paymentSummary.shippingCostCents ) }</div>
              </div>

              <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">{ formatPrice( paymentSummary.totalCostBeforeTaxCents ) }</div>
              </div>

              <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">{ formatPrice( paymentSummary.taxCents ) }</div>
              </div>

              <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">{ formatPrice( paymentSummary.totalCostCents ) }</div>
              </div>

              <button className="place-order-button button-primary">
                Place your order
              </button>
            </div>
            )
          }
        </div>
      </div>
    </>
  );
};