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
          <span>{product?.name}</span>
          <p>View more {product?.category}</p>
          <div className='product__display-reviews'>
            <span>{product?.avg_rating}</span>
            <span>stars</span>
            <span>{product?.reviews?.length}</span>
          </div>
          <div>
            <p>Price: <span>${product?.price}</span></p>
            <img src='/images/prime-logo.png' alt='prime' className='prime-logo' />
          </div>
          <span>{product?.description}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
