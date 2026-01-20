import axios  from 'axios' 
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { ProductGrid } from './ProductGrid'
import './HomePage.css'

export function HomePage({ cart }) {
  const [ products , setProducts ] = useState( [] ); // to save and manage the products 
  useEffect( () => {  // this makes render the products only once the HomePage component is created
    axios.get('/api/products') //to get products data
      .then( (response) => {
        setProducts(response.data);
      })
      .catch( error => console.error( "API error : " + error) );
  },[]);
  
  return (
    <>
      <title>QuickCart</title>
      <Header cart={ cart }/> 
      <ProductGrid products={ products }/>
    </>
  )
};