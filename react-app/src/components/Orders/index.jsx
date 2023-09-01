import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetOrders } from '../../store/orders'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'
import './Orders.css'

function Orders() {
  const orders = useSelector(state => (Object.values(state.orders.orders).reverse()))
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(thunkGetOrders())
}, [dispatch])

  console.log(orders)

  const sendToProduct = (id) => {
    history.push(`/products/${id}`)
  }
  const sendToReviewProduct = (id) => {
    history.push(`/products/${id}/review`)
  }
  const sendToAllProducts = () => {
    history.push('/products')
  }

  return (
    <div className='user-products__container'>
        <div className='user-products__content'>
            <span>Your Orders</span>
            {orders.length ? orders.map(order => (
                <div className='order__container'>
                    <div className='order__header'>
                        <span>ORDER #{order.id}</span>
                        <div>
                            <p>ORDER PLACED</p>
                            <span>{dayjs(order.created_at).format('MMMM D, YYYY')}</span>
                        </div>
                        <div>
                            <p>TOTAL</p>
                            <span>${order.total_price}</span>
                        </div>
                        <div>
                            <p>SHIPPED TO</p>
                            <span>{user.address}</span>
                        </div>
                    </div>
                    <div className='order__title'>
                        <h3>Delivered</h3>
                        <p>Your package was left on your roof.</p>
                    </div>
                    <div className='order__products'>
                        {order.order_items.map(item => (
                            <div className='order__product'>
                                <div className='order__product-image'>
                                    <img src={item.product.image} alt='product' />
                                </div>
                                <div className='order__product-info'>
                                    <span onClick={() => sendToProduct(item.product.id)}>{item.product.name}</span>
                                    <p>Ineligible for returns</p>
                                    <button onClick={() => sendToProduct(item.product.id)}>View your item</button>
                                </div>
                                <div className='order__product-review'>
                                    <button onClick={() => sendToReviewProduct(item.product.id)}>Write a product review</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )) : (
                <div className='user-no-products no-orders'>
                    <span>You have no orders. You will see all your orders you have placed here.</span>
                    <span>Shop for <p onClick={sendToAllProducts}>all products</p>?</span>
                </div>
            )}
        </div>
    </div>
  )
}

export default Orders
