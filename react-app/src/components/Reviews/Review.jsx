import dayjs from 'dayjs';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetUsers } from '../../store/users';


function Review({ review }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user);


  console.log(review)
  return (
    <div className='review__container'>
        <div className='review__header'>
            <img src='https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png' alt='user' />
            <span>{review.buyer_id}</span>
        </div>
        <div className='review__subheader'>
            <p>{review?.rating} stars</p>
            <span>{review?.title}</span>
        </div>
        <span>Reviewed in the United States on {dayjs(review?.created_at).format('MMMM D, YYYY')}</span>
        <div className='review__verified'>Verified Purchase</div>
        <p>{review?.content}</p>
        {review?.image && (
            <img src={review?.image} alt='review' />
        )}
        {user?.id === review?.buyer_id ? (
          <div className='review__user-btns'>
            <button>Edit</button>
            <span>Delete</span>
          </div>
        ) : null}
    </div>
  )
}

export default Review
