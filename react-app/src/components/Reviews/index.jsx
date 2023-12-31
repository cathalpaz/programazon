import React from 'react'
import Review from './Review'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Stars from '../Stars'
import './Reviews.css'

function Reviews({ product }) {
  const history = useHistory()
  const currentUser = useSelector(state => state.session.user)

  const ratingPercentage = (n) => {
    let count = 0
    if (!product?.reviews.length) return 0
    for (let review of product?.reviews) {
        if (review.rating === n) {
            count += 1
        }
    }
    return Math.round(count / product?.reviews.length * 100)
  }

  const sendToReviewForm = () => {
    history.push(`/products/${product?.id}/review`)
  }
  const sendToLogin = () => {
    history.push('/login')
  }

  return (
    <div className='reviews__container'>
        <div className='reviews__left'>
            <h3>Customer reviews</h3>
            <div className='reviews__rating'>
                <p className='product__stars'><Stars rating={product?.avg_rating} /></p>
                <p>{product?.avg_rating} out of 5</p>
            </div>
            <p>{product?.reviews?.length} global ratings</p>
            <div className='reviews__rating-percent'>
                <span>5 star(s) <Stars rating={5} /> {ratingPercentage(5)}%</span>
                <span>4 star(s) <Stars rating={4} /> {ratingPercentage(4)}%</span>
                <span>3 star(s) <Stars rating={3} /> {ratingPercentage(3)}%</span>
                <span>2 star(s) <Stars rating={2} /> {ratingPercentage(2)}%</span>
                <span>1 star(s) <Stars rating={1} /> {ratingPercentage(1)}%</span>
            </div>
            <div className='reviews__create-review'>
                <h4>Review this product</h4>
                <span>Share your thoughts with other customers</span>
                {currentUser ? (
                    <button onClick={sendToReviewForm}>Write a customer review</button>
                ) : (
                    <button onClick={sendToLogin}>Write a customer review</button>
                )}
            </div>
        </div>
        <div className='reviews__right'>
            <h4>Top reviews from customers</h4>
            {product?.reviews.map(review => {
                return <Review review={review} key={review.id} />
            })}
        </div>
    </div>
  )
}

export default Reviews
