import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Cart.css'

function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector(state => (state.cart))

    console.log(cart)


    return (
        <div className='cart__container'>
                {cart ? (
                    <div className='cart__content'>
                        <div className='cart__left'>
                            <span>Shopping Cart</span>
                            <div className='cart__items'>
                                {cart.cart_items.map(item => (
                                    <div className='cart__item'>{item.product.name}</div>
                                ))}
                            </div>
                        </div>
                        <div className='cart__right'>
                            <p>Subtotal ({cart.cart_items.length} items): <span>${cart.total_price}</span></p>
                        </div>
                    </div>
                ) : (
                    <div>Your Programazon Cart is empty.</div>
                )}
        </div>
    )
}

export default Cart
