import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { cartQuantity } from '../../utils/cart';
import { useState , useEffect } from 'react';
import './Header.css'
export function Header({ cart }) {
  const [ searchParams ] = useSearchParams();
  const searchText = searchParams.get('search');
  const [ search , setSearch ] = useState( searchText || '');
  const navigate = useNavigate();
  const updateSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    navigate(`/?search=${value}`);
  }
  const searchproduct = () => {
    if (search.trim() === '') {
      navigate('/');
    } else {
      navigate(`/?search=${search}`);
    }
  }
  function handleKeyDowwn (event) {
    if( event.key === 'Enter' ) {
      searchproduct();
    }
    if( event.key === 'Escape' ) {
      setSearch('');
      navigate('/');
    }
  }
  useEffect(() => {
  setSearch(searchText || '');
}, [searchText]);
  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img style={{ 
             width: '2rem'
            }} src="/favicon_io/favicon-32x32.png" alt="app-logo"/>
            {/* <img className="logo"
              src="images/logo-white.png" /> */}
            {/* <img className="mobile-logo"
              src="images/mobile-logo-white.png" /> */}
          </NavLink>
        </div>
        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" value={ search } onChange={ updateSearch } onKeyDown={ handleKeyDowwn }/>
          <button className="search-button" onClick={ searchproduct }>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{ cartQuantity( cart ) }</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
};