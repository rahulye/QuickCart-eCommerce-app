import axios from 'axios'
import {Routes , Route } from 'react-router-dom'
import { useEffect , useState } from 'react'
import { HomePage } from './assets/pages/HomePage'
import { CheckoutPage } from './assets/pages/checkout/CheckoutPage'
import { OrderPage } from './assets/pages/OrderPage'
import { TrackingPage } from './assets/pages/TrackingPage'
import { NotFoundPage } from './assets/pages/NotFoundPage'
import './App.css'

function App() {
  const [ cart , setCart ] = useState( [] ); // to save and manage the products 
  useEffect( () => {
    axios.get('/api/cart-items?expand=product') //to get cart data and product data
      .then( (response) => {
        setCart(response.data);
      })
      .catch( (error) => console.error( "API error : " + error) );
  },[]);
  return (
    <>
      <Routes>
        {/* <Route path='/' element={ <HomePage/> }></Route> */}
        <Route index element={ <HomePage cart={ cart }/> }/>
        <Route path='checkout' element={ <CheckoutPage cart={ cart }/> }/>
        <Route path='orders' element={ <OrderPage cart={ cart } /> }/>
        <Route path='track' element={ <TrackingPage cart={ cart } /> }/>
        <Route path='*' element={ <NotFoundPage/> }/>
      </Routes>
    </>
  )
}

export default App
