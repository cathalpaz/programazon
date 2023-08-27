import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetCart } from '../../store/cart'
import './Cart.css'

function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector(state => (state.cart))

    const cartItems = Object.values(cart.items)

    useEffect(() => {
        dispatch(thunkGetCart())
    }, [dispatch])

    return (
        <div className='cart__container'>
            {cartItems.length ? (
                <div className='cart__content'>
                    <div className='cart__left'>
                        <span>Shopping Cart</span>
                        <div className='cart__items'>
                            {cartItems.map(item => (
                                <div className='cart__item' key={item.id}>
                                    <div className='item__left'>
                                        <img src={item.product.image} alt={item.product.name} />
                                    </div>
                                    <div className='item__right'>
                                        <div className='item__details'>
                                            <span className='item__name'>{item.product.name}</span>
                                            <span className='item__price'>${item.product.price}</span>
                                            <p className='product__buy-in-stock item__stock'>In Stock</p>
                                            <img src='/images/prime-logo.png' alt='prime' className='prime-logo item__prime' />
                                        </div>
                                        <div className='item__edit-delete'>
                                            <button>Qty: {item.quantity}</button>
                                            <span>Delete</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='cart__total'>
                            <p>Subtotal ({cartItems?.length} items): <span>${cart.total}</span></p>
                        </div>
                    </div>
                    <div className='cart__right'>
                        <p>Subtotal ({cartItems?.length} items): <span>${cart.total}</span></p>
                    </div>
                </div>
            ) : (
                <div>Your Programazon Cart is empty.</div>
            )}
        </div>
    )
}

export default Cart
