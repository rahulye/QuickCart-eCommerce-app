import axios  from 'axios' 
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { ProductGrid } from './ProductGrid'
import './HomePage.css'

export function HomePage({ cart }) {
  useEffect(() => {
    document.title = 'QuickCart';
  }, []);
  const [ products , setProducts ] = useState( [] ); // to save and manage the products 

  // useEffect( () => {  // this makes render the products only once the HomePage component is created
  //   axios.get('/api/products') //to get products data
  //     .then( (response) => {
  //       setProducts(response.data);
  //     })
  //     .catch( error => console.error( "API error : " + error) );
  // },[]);

  //--> using async , we cant directly use the aysnc in useEffect cuz its returns a promise, so we create a function and we use async 
  useEffect( () => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products');
      setProducts( response.data );
    }
    fetchProducts();
  },[]);
  
  return (
    <>
      <Header cart={ cart }/> 
      <ProductGrid products={ products }/>
    </>
  )
};