import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetOrders } from '../../store/orders'
import dayjs from 'dayjs'

function Orders() {
  const orders = useSelector(state => (Object.values(state.orders.orders)))
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(thunkGetOrders())
}, [dispatch])

  console.log(orders)

  return (
    <div className='user-products__container'>
        <div className='user-products__content'>
            <span>Your Orders</span>
            {orders.length ? orders.map(order => (
                <div className='order__container'>
                    <div className='order__header'>
                        <div>
                            <p>ORDER PLACED</p>
                            <span>{dayjs(order.created_at).format('MMMM D, YYYY')}</span>
                        </div>
                        <div>
                            <p>TOTAL</p>
                            <span>${order.total_price}</span>
                        </div>
                        <div>
                            <p>SHIP TO</p>
                            <span>{user.address}</span>
                        </div>
                        <span>ORDER #{order.id}</span>
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
                                    <span>{item.product.name}</span>
                                    <p>Ineligible for returns</p>
                                    <button>View your item</button>
                                </div>
                                <div className='order__product-review'>
                                    <button>Write a product review</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )) : (
                <p>no orders</p>
            )}
        </div>
    </div>
  )
}

export default Orders
