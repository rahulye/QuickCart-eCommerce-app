import { Link } from 'react-router-dom';
import { cartQuantity } from '../../../utils/cart';
export function CheckoutHeader({ cart }) {
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img style={{ 
             width: '2rem'
            }} src="/favicon_io/favicon-32x32.png" alt="app-logo"/>
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
  )
}
