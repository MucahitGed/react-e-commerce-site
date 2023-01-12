import React, {useEffect} from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByCategory } from '../../store/categorySlice';
import { useParams, Link } from 'react-router-dom';
import "./CategoryPage.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons'


const CategoryPage = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {catProductSingle: products, catProductSingleStatus: status} = useSelector((state) => state.category);

    useEffect(() => {
      dispatch(fetchProductsByCategory(id, 'single'));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
      <div className = "category-page">
        <div className = "container">
          <div className = "breadcrumb">
            <ul className = "breadcrumb-items flex">
              <li className = "breadcrumb-item">
                <Link to = "/">
                <FontAwesomeIcon icon={faHome} />
                  <span className = "breadcrumb-separator">
                  <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </Link>
              </li>
              <li>
                Category
                <span className = "breadcrumb-separator">
                <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </li>
              <li>
                { products[0] && products[0].category.name}
              </li>
            </ul>
          </div>
        </div>
        <ProductList products = {products} status = {status} />
      </div>
    )
}

export default CategoryPage