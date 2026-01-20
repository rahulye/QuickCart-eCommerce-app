import dayjs from "dayjs"
import { formatPrice } from "../../../utils/money"
export function OrderHeader({ orderItem }) {
  return (
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
  )
}