import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { thunkGetSingleProduct } from '../../store/products'
import Loading from '../Loading'
import Reviews from '../Reviews'
import Stars from '../Stars'
import './ProductInfo.css'

function ProductInfo() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { productId } = useParams()
  const product = useSelector(state => state.products.singleProduct.product)
  const currentUser = useSelector(state => state.session.user)
  // console.log(currentUser)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    dispatch(thunkGetSingleProduct(productId))
  }, [dispatch, productId])

  if (!product) {
    return <Loading />
  }

  const descriptionList = product?.description.split('. ')

  const sendToCategory = (category) => {
    history.push(`/products?q=${category}`)
    window.location.reload()
  }


  // console.log(product)
  return (
    <div className='product__container'>
      <div className='product__display-container'>
        <div className='product__display-img'>
          <img src={product?.image} alt='product' />
        </div>
        <div className='product__display-info'>
          <span className='product__name'>{product?.name}</span>
          <p className='product__category' onClick={(() => sendToCategory(product?.category))} >View more {product?.category}</p>
          <div className='product__display-reviews'>
            <span>{product?.avg_rating}</span>
            <span className='product__stars'><Stars rating={product?.avg_rating} /></span>
            <p>{product?.reviews?.length} rating(s)</p>
          </div>
          <div className='product__price'><p>$</p><span>{product?.price}</span></div>
          <img src='/images/prime-logo.png' alt='prime' className='prime-logo' />
          <span className='product__returns'>FREE Returns</span>
          <p className='product__prime-visa'>Pay <span>${(product?.price / 6).toFixed(2)} for 6 months</span>, interest-free upon approval for Programazon Prime</p>
          <div className='product__description'>
            <h4>About this item</h4>
            <ul className='product__description-list'>
              {descriptionList.map((sentence, index) => (
                <li key={index}>{sentence}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='product__display-buy'>
          <span className='product__buy-title'>Buy new:</span>
          <div className='product__price'><p>$</p><span>{product?.price}</span></div>
          <img src='/images/prime-logo.png' alt='prime' className='prime-logo' />
          <span className='product__returns'>FREE Returns</span>
          <p className='product__buy-delivery'>FREE delivery <span>Friday, February 30.</span></p>
          <p className='product__buy-delivery-order'>Order within <span>61 mins</span></p>
          {currentUser ? (
            <p className='product__buy-address'><i className="fa-solid fa-location-dot"></i><span>Deliver to {currentUser?.username} - {currentUser?.address}</span></p>
          ) : null}
          {product?.stock_quantity > 0 ? (
            <p className='product__buy-in-stock'>In Stock <span>Only {product?.stock_quantity} left in stock.</span></p>
          ) : <p className='product_buy-no-stock'>Out of Stock</p>}
          <select
            value={quantity}
            onchange={(e) => setQuantity(e.target.value)}
            className='product__buy-quantity'
            >
            {Array.from({ length: product?.stock_quantity }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>Qty: {num}</option>
            ))}
          </select>
          <button className='product__buy-button'>Add to Cart</button>
          <div className='product__buy-extra'>
            <div className='product__buy-extra-left'>
              <span>Payment</span>
              <span>Ships from</span>
              <span>Sold by</span>
            </div>
            <div>
              <span className='product__buy-extra-secure'>Secure transaction</span>
              <span>Programazon</span>
              <span>Programazon</span>
            </div>
          </div>
        </div>
      </div>
      <Reviews product={product} />
    </div>
  )
}

export default ProductInfo
