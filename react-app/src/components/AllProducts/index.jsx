import React, { useEffect } from 'react'
import Loading from '../Loading'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetProducts } from '../../store/products'
import './AllProducts.css'

function AllProducts() {
  const dispatch = useDispatch()
  const allProducts = useSelector(state => Object.values(state.products.allProducts))

  useEffect(() => {
    dispatch(thunkGetProducts())
  }, [dispatch])

  if (!allProducts.length) return (
    <Loading />
  )

  return (
    <div className='products__container'>
      <div className='products__header'>
        <p>1 - 8 of {allProducts.length} results for <span>"All"</span></p>
      </div>
      <div className='products__list'>
        <h3>Results</h3>
        {allProducts.map(product => (
          <div className='products__product' key={product.id}>
            {console.log(product)}
            <div className='product__img'>
              <img src={product?.image} />
            </div>
            <div className='product__right-container'>
              <div className='product__right-name'>
                <span>{product?.name}</span>
              </div>
              <div className='product__right-info'>
                <div className='product__right-info-left'>
                  <span>{product?.avg_rating}<p>{product?.reviews?.length}</p></span>
                  <span>${product?.price}</span>
                </div>
                <div className='product__right-info-right'>
                  <img src='/images/prime-logo.png' alt='prime'></img>
                  <p>FREE delivery <span>Fri, Feb 30</span></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProducts
