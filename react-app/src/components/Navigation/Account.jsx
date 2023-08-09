import React from 'react'
import OpenModalButton from '../OpenModalButton'
import LoginFormPage from '../LoginFormPage'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


function Account({ user }) {
    const history = useHistory()

    const handleLogin = () => {
        history.push('/login')
    }

    const handleSignUp = () => {
        history.push('/signup')
    }

    console.log(user)
    return (
        <div>
            {!user ? (
                <div className='account__login-container'>
                    <button onClick={handleLogin}>Sign in</button>
                    <p>New customer? <span onClick={handleSignUp}>Start here.</span></p>
                </div>
            ) : (
                <div className='account__container'>
                    <div className='account__products'>
                        <h4>Your products</h4>
                        <p>Product Listings</p>
                    </div>
                    <div className='account__info'>
                        <h4>Your account</h4>
                        <p>Account</p>
                        <p>Orders</p>
                        <p>Sign Out</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Account
