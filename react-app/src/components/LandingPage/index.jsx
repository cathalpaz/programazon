import React from 'react'
import './LandingPage.css'

function LandingPage() {
  return (
    <div className='landing__container'>
        <div className='landing__banner'>
            <img src='/images/landing.jpg' alt='landing' />
            <div className='landing__categories'>
                <div className='landing__category'>
                    <h3>Ready for anything</h3>
                    <img src='/images/accessories.jpg' alt='accessories' />
                    <span>Shop accessories</span>
                </div>
                <div className='landing__category'>
                    <h3>Ready for anything</h3>
                    <img src='/images/accessories.jpg' alt='accessories' />
                    <span>Shop accessories</span>
                </div>
                <div className='landing__category'>
                    <h3>Ready for anything</h3>
                    <img src='/images/accessories.jpg' alt='accessories' />
                    <span>Shop accessories</span>
                </div>
                <div className='landing__category'>
                    <h3>Ready for anything</h3>
                    <img src='/images/accessories.jpg' alt='accessories' />
                    <span>Shop accessories</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage
