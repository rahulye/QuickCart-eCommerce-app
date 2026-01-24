import axios  from 'axios' 
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { ProductGrid } from './ProductGrid'
import './HomePage.css'
import { useSearchParams } from 'react-router'

export function HomePage({ cart , loadCart }) {
  useEffect(() => {
    document.title = 'QuickCart';
  }, []);
  const [ products , setProducts ] = useState([]); // to save and manage the products 

  // useEffect( () => {  // this makes render the products only once the HomePage component is created
  //   axios.get('/api/products') //to get products data
  //     .then( (response) => {
  //       setProducts(response.data);
  //     })
  //     .catch( error => console.error( "API error : " + error) );
  // },[]);

  //--> using async , we cant directly use the aysnc in useEffect cuz its returns a promise, so we create a function and we use async 
  const [ searchParams ] = useSearchParams();
  const search = searchParams.get('search');
  
  useEffect( () => {
    const fetchProducts = async () => {
      const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(urlPath);
      setProducts( response.data );
    }
    fetchProducts();
  },[search]);

  
  return (
    <>
      <Header cart={ cart }/> 
      <ProductGrid products={ products } loadCart={ loadCart }/>
    </>
  )
};