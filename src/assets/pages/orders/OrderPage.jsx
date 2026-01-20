import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { OrderGrid } from './OrderGrid';
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
        <OrderGrid order={ order }/>
      </div>
    </>
  )
}