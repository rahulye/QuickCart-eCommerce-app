import axios from 'axios'
import dayjs from 'dayjs'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Header } from '../components/Header'
import { formatPrice } from '../../utils/money'
import './OrderPage.css'
export function OrderPage({ cart }) {
  const [ order , setOrder ] = useState([]);
  useEffect( () => {
    axios.get('/api/orders?expand=products')
    .then( (response) => {
      setOrder( response.data )
    })
  },[])
  return (
    <>
      <title>Orders</title>
      <Header cart={ cart } />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <div className="orders-grid">
          {
            order.map( (orderItem) => {  //to acees first array values
              return (
                <div key={ orderItem.id } className="order-container">

                  <div className="order-header">
                    <div className="order-header-left-section">
                      <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{ dayjs( orderItem.orderTimeMs ).format('MMM D') }</div>
                      </div>
                      <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>{ formatPrice( orderItem.totalCostCents )}</div>
                      </div>
                    </div>

                    <div className="order-header-right-section">
                      <div className="order-header-label">Order ID:</div>
                      <div>{ orderItem.id }</div>
                    </div>
                  </div>

                  <div className="order-details-grid">
                    {
                      orderItem.products.map( (productItem) => { //to acees second array values inside
                        return (
                          <Fragment key={ productItem.productId }> {/*in order to use key we cant use normal fragments <></>*/}
                            <div className="product-image-container">
                              <img src={ productItem.product.image } />
                            </div>

                            <div className="product-details">
                              <div className="product-name">
                                { productItem.product.name }
                              </div>
                              <div className="product-delivery-date">
                                Arriving on: { dayjs( productItem.estimatedDeliveryTimeMs ).format('MMM D') }
                              </div>
                              <div className="product-quantity">
                                Quantity: { productItem.quantity }
                              </div>
                              <button className="buy-again-button button-primary">
                                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                <span className="buy-again-message">Add to Cart</span>
                              </button>
                            </div>

                            <div className="product-actions">
                              <Link to="/track">
                                <button className="track-package-button button-secondary">
                                  Track package
                                </button>
                              </Link>
                            </div>
                          </Fragment>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}