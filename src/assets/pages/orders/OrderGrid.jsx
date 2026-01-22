import dayjs from "dayjs"
import { Fragment } from "react"
import { Link } from 'react-router'
import { OrderHeader } from "./OrderHeader"

export function OrderGrid({ order }) {
  return (
    <div className="orders-grid">
      {
        order.map( (orderItem) => {  //to acees first array values
          return (
            <div key={ orderItem.id } className="order-container">
              <OrderHeader orderItem={ orderItem }/>
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
                          <Link to={ `/track/${orderItem.id}/${productItem.productId}` }>
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
  )
}