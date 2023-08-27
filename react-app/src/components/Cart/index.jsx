import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetCart } from '../../store/cart'
import { useHistory } from 'react-router-dom'
import { thunkRemoveFromCart } from '../../store/cart'
import './Cart.css'

function Cart() {
    const dispatch = useDispatch()
    const history = useHistory()
    const cart = useSelector(state => (state.cart))
    const cartItems = Object.values(cart.items)

  const [quantity, setQuantity] = useState(1)


    useEffect(() => {
        dispatch(thunkGetCart())
    }, [dispatch])

    const sendToProduct = (id) => {
        history.push(`/products/${id}`)
    }
    const removeFromCart = (productId) => {
        dispatch(thunkRemoveFromCart(productId))
        window.location.reload();
    }



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
                                        <img src={item.product.image} alt={item.product.name} onClick={() => sendToProduct(item.product.id)} />
                                    </div>
                                    <div className='item__right'>
                                        <div className='item__details'>
                                            <span className='item__name' onClick={() => sendToProduct(item.product.id)}>{item.product.name}</span>
                                            <span className='item__price'>${item.product.price}</span>
                                            <p className='product__buy-in-stock item__stock'>In Stock</p>
                                            <img src='/images/prime-logo.png' alt='prime' className='prime-logo item__prime' />
                                        </div>
                                        <div className='item__edit-delete'>
                                            <select
                                                value={item.quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                className='product__buy-quantity'
                                                >
                                                {Array.from({ length: item.product?.stock_quantity }, (_, i) => i + 1).map((num) => (
                                                    <option key={num} value={num}>Qty: {num}</option>
                                                ))}
                                            </select>
                                            <span onClick={() => removeFromCart(item.product.id)}>Remove from cart</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='cart__total'>
                            <p className='total'>Subtotal ({cartItems?.length} items): <span>${cart.total}</span></p>
                        </div>
                    </div>
                    <div className='cart__right'>
                        <p className='total'>Subtotal ({cartItems?.length} items): <span>${cart.total}</span></p>
                        <button className='cart__checkout'>Proceed to checkout</button>
                    </div>
                </div>
            ) : (
                <div className='cart__no-items'>
                    <span>Your Programazon Cart is empty.</span>
                    <p>Go to <span onClick={() => history.push('/products')}>all products?</span></p>
                </div>
            )}
        </div>
    )
}

export default Cart
