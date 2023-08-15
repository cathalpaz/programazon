import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetUserProducts } from '../../store/products';
import Loading from '../Loading'
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom'
import './UserProducts.css'



function UserProducts() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const userProducts = useSelector(state => Object.values(state.products.userProducts))

  useEffect(() => {
    dispatch(thunkGetUserProducts())
  }, dispatch)

  console.log(userProducts)
  if (!userProducts.length) return (
    <Loading />
  )

  const sendToProduct = (id) => {
    history.push(`/products/${id}`)
  }

  return (
    <div className='user-products__container'>
      <div className='user-products__content'>
        <span>Your Products</span>
        {userProducts.map(product => (
          <div key={product.id} className='user-product'>
            <div className='user-product__header'>
              <h3>Listed on {dayjs(product.created_at).format('MMMM D, YYYY')}</h3>
              <span>Category: {product.category}</span>
            </div>
            <div className='user-product__info'>
              <div className='user-product__image'>
                <img src={product.image} alt='product' />
              </div>
              <div className='user-product__middle'>
                <span onClick={(() => sendToProduct(product.id))}>{product.name}</span>
                <p>Retail Price: ${product.price}</p>
                <p>Remaining Stock: {product.stock_quantity}</p>
              </div>
              <div className='user-product__edit'>
                <button>Edit Product</button>
              </div>
            </div>
            <div className='user-product__footer'>
              <span>Delete Product</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserProducts
