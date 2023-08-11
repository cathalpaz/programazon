import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { thunkGetSingleProduct } from '../../store/products'
import Loading from '../Loading'
import './ProductInfo.css'

function ProductInfo() {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const product = useSelector(state => state.products.singleProduct.product)
  const currentUser = useSelector(state => state.session.user)
  console.log(currentUser)

  useEffect(() => {
    dispatch(thunkGetSingleProduct(productId))
  }, [dispatch, productId])

  if (!product) {
    return <Loading />
  }

  console.log(product)
  return (
    <div className='product__container'>
      <div className='product__display-container'>
        <img src={product?.image} alt='product' />
        <div className='product__display-info'>
          <span className='product__name'>{product?.name}</span>
          <p className='product__category'>View more {product?.category}</p>
          <div className='product__display-reviews'>
            <span>{product?.avg_rating}</span>
            <span className='product__stars'> 1 2 3 4 5 </span>
            <p>{product?.reviews?.length} rating(s)</p>
          </div>
          <p className='product__price'><p>$</p><span>{product?.price}</span></p>
          <img src='/images/prime-logo.png' alt='prime' className='prime-logo' />
          <span>{product?.description}</span>
        </div>
        <div className='product__display-buy'>
          <span>Buy new:</span>
          <span>${product?.price}</span>
          <img src='/images/prime-logo.png' alt='prime' className='prime-logo' />
          <span>FREE Returns</span>
          <span>FREE delivery <p>Fri, February 30.</p></span>
          <span>Order within 61 mins</span>
          {currentUser ? (
            <span><i className="fa-solid fa-location-dot"></i>Deliver to {currentUser?.username} - {currentUser?.address}</span>
          ) : null}
          {product?.stock_quantity > 0 ? (
            <span>In Stock <p>Only {product?.stock_quantity} left in stock.</p></span>
          ) : <span>Out of Stock</span>}
          <span>More information</span>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
