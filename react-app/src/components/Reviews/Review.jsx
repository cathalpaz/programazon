import dayjs from 'dayjs';
import React from 'react'

function Review({ review }) {
  console.log(review)
  return (
    <div className='review__container'>
        <div className='review__header'>
            <img src='https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png' alt='user' />
            <span>Name</span>
        </div>
        <div className='review__subheader'>
            <p>{review?.rating} stars</p>
            <span>{review?.title}</span>
        </div>
        <span>Reviewed in the United States on {dayjs(review?.created_at).format('MMMM D, YYYY')}</span>
        <div className='review__verified'>Verified Purchase</div>
        <p>{review?.content}</p>
        {review?.image && (
            <img src={review?.image} />
        )}
    </div>
  )
}

export default Review
