import React, { useState, useEffect} from 'react';
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import { getCartTotal } from '../../store/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faBars, faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'

const Navbar = () => {
  const dispatch = useDispatch();
  const {data: categories} = useSelector((state) => state.category);
  const {totalItems} = useSelector((state => state.cart));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className = "navbar">
      <div className='navbar-content'>
        <div className = "container">
          <div className = "navbar-top flex flex-between">
              <Link to = "/" className = "navbar-brand">
                <span className = "txt1">Mr.</span><span className='txt'>Gifter</span>
              </Link>

              <form className = "navbar-search flex">
                <input type ="text" className='inp' placeholder='Search...' />
                <button type = "submit" className = "navbar-search-btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>

              <div className = "navbar-btns">
                <Link to = "/cart" className="add-to-cart-btn flex">
                  <span className = "btn-ico">
                  <FontAwesomeIcon icon={faBagShopping} />
                  </span>
                  <div className='btn-txt fw-5'>Cart
                    <span className='cart-count-value'>{totalItems}</span>
                  </div>
                </Link>
              </div>
          </div>
        </div>
        
        <div className='navbar-bottom'>
          <div className='container flex flex-between'>
            <ul className = {`nav-links flex ${isSidebarOpen ? 'show-nav-links' : ""}`}>
              <button type = "button" className='navbar-hide-btn text-white' onClick={() => setIsSidebarOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
              </button>
              {
                categories.map(category => (
                  <li key = {category.id}><Link to = {`/category/${category.id}`} className = "nav-link text-white" onClick={() => setIsSidebarOpen(false)}>{category.name}</Link></li>
                ))
              }
            </ul>

            <button type = "button" className='navbar-show-btn text-gold' onClick={() => setIsSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;