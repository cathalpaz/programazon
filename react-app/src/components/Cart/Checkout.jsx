import React from 'react'
import { useSelector } from 'react-redux'

function Checkout() {
  const user = useSelector(state => (state.session.user))
  const cart = useSelector(state => (state.cart))


  console.log(cart)

  return (
    <div className='checkout__container'>
      <div className='checkout__header'>
        <img src='/images/programazon-dark.png' alt='logo' />
        <p>Checkout (<span>{Object.values(cart.items).length} items</span>)</p>
        <img src='https://m.media-amazon.com/images/G/01/x-locale/checkout/truespc/secured-ssl._CB485936932_.png' alt='lock' />
      </div>
      <div className='checkout__content-container'>
        <div className='checkout__content'>
          <div className='checkout__left'>
            <div className='checkout__address'>
              <h3>Shipping Address</h3>
              <div className='checkout__address-content'>
                <p>{user.username}</p>
                <p>{user.address}</p>
                <span>Not available for pickup</span>
              </div>
            </div>
            <div className='checkout__items'>
              <h3>Review items and shipping</h3>
              <div className='checkout__items-content'>
                {Object.values(cart.items).map(item => (
                  <div className='checkout__item' key={item.id}>
                    <div className='checkout__item-header'>
                      <h4>Delivery: Sept. 1, 2023</h4>
                      <p>Items shipped from Programazon</p>
                    </div>
                    <div className='checkout__item-content'>
                      <div className='checkout__item-left'>
                        <img src={item.product.image} alt={item.product.name} />
                      </div>
                      <div className='checkout__item-right'>
                        <span>{item.product.name}</span>
                        <span>Price: ${item.product.price}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='checkout__right'>
            <button className='cart__checkout'>Place your order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
