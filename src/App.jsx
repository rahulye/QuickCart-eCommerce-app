import axios from 'axios'
import {Routes , Route } from 'react-router-dom'
import { useEffect , useState } from 'react'
import { HomePage } from './assets/pages/home/HomePage'
import { CheckoutPage } from './assets/pages/checkout/CheckoutPage'
import { OrderPage } from './assets/pages/orders/OrderPage'
import { TrackingPage } from './assets/pages/TrackingPage'
import { NotFoundPage } from './assets/pages/NotFoundPage'
import './App.css'

function App() {
  const [ cart , setCart ] = useState( [] ); // to save and manage the products 
  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product'); //to get cart data and product data
    setCart(response.data);        
  } 
  useEffect( () => {
    loadCart();
  },[]);
  return (
    <>    
      <Routes>
        {/* <Route path='/' element={ <HomePage/> }></Route> */}
        <Route index element={ <HomePage cart={ cart } loadCart= { loadCart } /> }/>
        <Route path='checkout' element={ <CheckoutPage cart={ cart } loadCart={ loadCart } /> }/>
        <Route path='orders' element={ <OrderPage cart={ cart } loadCart={ loadCart }/> }/>
        <Route path='track/:orderId/:productId' element={ <TrackingPage cart={ cart } /> }/>
        <Route path='*' element={ <NotFoundPage/> }/>
      </Routes>
    </>
  )
}             

export default App
 