import React, { useEffect } from 'react'
import Loading from '../Loading'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetProducts } from '../../store/products'
import { useHistory } from 'react-router-dom'
import './AllProducts.css'

function AllProducts() {
  const dispatch = useDispatch()
  const history = useHistory()
  const allProducts = useSelector(state => Object.values(state.products.allProducts))

  useEffect(() => {
    dispatch(thunkGetProducts())
  }, [dispatch])

  if (!allProducts.length) return (
    <Loading />
  )

  const sendToProduct = (id) => {
    history.push(`/products/${id}`)
  }

  return (
    <div className='products__container'>
      <div className='products__header'>
        <p>1 - 8 of {allProducts.length} results for <span>"All"</span></p>
      </div>
      <div className='products__content'>
        <div className='products__content-left'>
          {/* <p>Delivery</p>
          <span>Get It by Tomorrow</span>
          <p>Customer Reviews</p>
          <p>Brands</p> */}
        </div>
        <div className='products__list'>
          <h3>Results</h3>
          {allProducts.map(product => (
            <div className='products__product' key={product.id}>
              <div className='product__img'>
                <img src={product?.image} alt='product' onClick={(() => sendToProduct(product?.id))} />
              </div>
              <div className='product__right-container'>
                <div className='product__right-name'>
                  <span onClick={(() => sendToProduct(product?.id))}>{product?.name}</span>
                </div>
                <div className='product__right-info'>
                  <div className='product__right-info-left'>
                    <span className='product__right-count'>1 Count (Pack of 1)</span>
                    <span className='product__right-rating'>{product?.avg_rating} stars<p>{product?.reviews?.length}</p></span>
                    <span className='product__right-price'><span>$</span><p>{product?.price}</p></span>
                  </div>
                  <div className='product__right-info-right'>
                    <img src='/images/prime-logo.png' alt='prime' />
                    <p>FREE delivery <span>Fri, Feb 30</span></p>
                    <span>{product.stock_quantity} left in stock - order soon.</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllProducts
