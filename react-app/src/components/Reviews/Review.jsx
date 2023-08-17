import dayjs from 'dayjs';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeleteModal';
import Stars from '../Stars';


function Review({ review }) {
  const history = useHistory()

  const user = useSelector(state => state.session.user);

  const sendToEditReview = () => {
    history.push(`/products/${review?.product_id}/review`, { review })
  }


  // console.log(review)
  return (
    <div className='review__container'>
        <div className='review__header'>
            <img src='https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png' alt='user' />
            <span>Name</span>
        </div>
        <div className='review__subheader'>
            <p className='product__stars'><Stars rating={review?.rating} /></p>
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
            <button onClick={sendToEditReview} className='review__user-edit'>Edit</button>
            <div className='review__user-delete'>
              <OpenModalButton
                modalComponent={<DeleteModal type={'review'} feature={review} />}
                buttonText='Delete'
                />
            </div>
          </div>
        ) : null}
    </div>
  )
}

export default Review
