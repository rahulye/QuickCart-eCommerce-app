import { Routes , Route } from 'react-router-dom'
import { HomePage } from './assets/pages/HomePage'
import { CheckoutPage } from './assets/pages/CheckoutPage'
import { OrderPage } from './assets/pages/OrderPage'
import { TrackingPage } from './assets/pages/TrackingPage'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/' element={ <HomePage/> }></Route> */}
        <Route index element={ <HomePage /> }></Route>
        <Route path='checkout' element={ <CheckoutPage/> }></Route>
        <Route path='orders' element={ <OrderPage/> }></Route>
        <Route path='track' element={ <TrackingPage/> }></Route>
      </Routes>
    </>
  )
}

export default App
