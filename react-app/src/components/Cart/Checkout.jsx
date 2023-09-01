import React from 'react'
import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import ConfirmationModal from './ConfirmationModal'
import { useDispatch } from 'react-redux'
import { thunkPlaceOrder } from '../../store/orders'
import { useHistory } from 'react-router-dom'
import { thunkGetCart } from '../../store/cart'


function Checkout() {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => (state.session.user))
  const cart = useSelector(state => (state.cart))


  console.log(cart)
  if (!cart.total) {
    history.push('/cart')
  }

  const placeOrder = async(e) => {
    const res = await dispatch(thunkPlaceOrder())
    await dispatch(thunkGetCart())
    if (res.ok) {
      history.push('/orders')
    }
  }


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
                        <span className='checkout__item-title'>{item.product.name}</span>
                        <p className='checkout__item-price'><span>${item.product.price}</span> Prime FREE Delivery</p>
                        <p>& FREE Returns</p>
                        <p className='checkout__item-quantity'>Quantity: <span>{item.quantity}</span></p>
                        <span className='checkout__item-sold'>Sold by: Programazon</span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='checkout__right'>
            <div className='checkout__right-header'>
              <OpenModalButton onButtonClick={placeOrder} className='cart__checkout' buttonText={'Place your order'} modalComponent={<ConfirmationModal />} />
              <p>By placing your order, you agree to Programazon's conditions and understand this a totally fake cart.</p>
            </div>
            <div className='checkout__right-summary'>
              <h3>Order Summary</h3>
              <div className='checkout__right-summary-content'>
                <div className='checkout__right-summary-left'>
                  <p>Items ({Object.values(cart.items).length}):</p>
                  <p className='space'>Shipping & handling:</p>
                  <p>Total before tax:</p>
                  <p>Estimated tax to be collected:</p>
                  <span>Order Total:</span>
                </div>
                <div className='checkout__right-summary-right'>
                  <p>${cart.total}</p>
                  <p className='checkout__right-summary-right-border space'>$2.00</p>
                  <p>${parseFloat(cart.total) + 2}</p>
                  <p>$5.00</p>
                  <span>${parseFloat(cart.total) + 7}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
