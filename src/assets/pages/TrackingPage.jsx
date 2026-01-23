import { useEffect, useState } from 'react';
import { Link , useParams } from 'react-router'
import { Header } from '../components/Header'
import './TrackingPage.css'
import axios from 'axios';
import dayjs from 'dayjs';
export function TrackingPage({ cart }) {
  useEffect(() => {
    document.title = 'Track';
  }, []);
  
  const { orderId , productId } = useParams();
  const [ order , setOrder ] = useState(null);
  useEffect( () => {
    const fetchOrderData = async () => {
      const response =  await axios.get(`/api/orders/${ orderId }?expand=products`);
      setOrder( response.data );
    } 
    fetchOrderData();
  },[ orderId ]);
  if(!order) {
    return null;
  }

  const orderproduct = order.products.find( (productItem) => {
      return productItem.productId === productId;
  })
  
  const totalDeliveryTimeMs = orderproduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedSinceMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = Number( timePassedSinceMs / totalDeliveryTimeMs ) * 100;
  if (deliveryPercent > 100) deliveryPercent = 100;
  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;
  return (
    <>
      <Header cart={ cart }/>
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            { deliveryPercent >= 100 ? "Delivered on " : "Arriving on " }
            { dayjs( orderproduct.estimatedDeliveryTimeMs ).format('dddd, MMMM D') } 
          </div>

          <div className="product-info">
            { orderproduct.product.name }
          </div>

          <div className="product-info">
            Quantity: { orderproduct.quantity }
          </div>

          <img className="product-image" src={ orderproduct.product.image } />

          <div className="progress-labels-container">
            <div className= { `progress-label ${ isPreparing? 'current-status' : ''}`}>
              Preparing
            </div>
            <div className= { `progress-label ${ isShipped ? 'current-status' : ''}`}>
              Shipped 
            </div>
            <div className= { `progress-label ${ isDelivered ? 'current-status' : ''}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style= {{ 
              width: `${ deliveryPercent }%` 
            }}></div>
          </div>
        </div>
      </div>
    </>
  )
}