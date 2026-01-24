import { Product } from "../checkout/Product";
export function ProductGrid({ products , loadCart }) {
  return (
    <div className="home-page">
        <div className="products-grid">
          {
            products.map( ( product ) => {
              return (  // we again created separate component cuz, the state should be in the closest to component function line not inside a loop
                <Product key={ product.id } product={ product } loadCart={ loadCart } />
              )
            })
          }
        </div>
      </div>
  )
}