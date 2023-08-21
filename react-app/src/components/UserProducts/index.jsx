import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetProducts, thunkGetUserProducts } from '../../store/products';
import Loading from '../Loading'
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeleteModal';
import './UserProducts.css'


function UserProducts() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const allProducts = useSelector(state => Object.values(state.products.allProducts))

  const myProducts = allProducts.filter(product => product.seller_id == user.id)

  useEffect(() => {
    dispatch(thunkGetProducts())
  }, [dispatch])



  const sendToProduct = (id) => {
    history.push(`/products/${id}`)
  }
  const sendToEditProduct = (product) => {
    history.push('/products/new', { product })
  }
  const sendToProductForm = () => {
    history.push('/products/new')
  }

  return (
    <div className='user-products__container'>
      <div className='user-products__content'>

        <span>Your Products</span>

        {myProducts.length ? myProducts.map(product => (
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
                <button onClick={(() => sendToEditProduct(product))}>Edit Product</button>
              </div>
            </div>
            <div className='user-product__footer'>
              <OpenModalButton
                  modalComponent={<DeleteModal type={'product'} feature={product} />}
                  buttonText='Delete Product'
                  />
            </div>
          </div>
        )) : (
          <div className='user-no-products'>
            <span>You have no products listed. You will see all your products you have listed to sell here.</span>
            <span>Go to <p onClick={sendToProductForm}>product form</p>?</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProducts
