import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetUserProducts } from '../../store/products';
import Loading from '../Loading'
import dayjs from 'dayjs';




function UserProducts() {
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

  return (
    <div className='user-products__container'>
      <span>Your Products</span>
      {userProducts.map(product => (
        <div key={product.id} className='user-product'>
          <div className='user-product__header'>
            <h3>Listed on {dayjs(product.created_at).format('MMMM D, YYYY')}</h3>
            <span>Category: {product.category}</span>
          </div>
          <div className='user-product__info'>
            <img src={product.image} alt='product' />
            <div className='user-product__middle'>
              <span>{product.name}</span>
              <span>Retail Price: ${product.price}</span>
              <span>Remaining Stock: {product.stock_quantity}</span>
            </div>
            <button>Edit Product</button>
          </div>
          <div className='user-product__footer'>
            <span>Delete Product</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserProducts
