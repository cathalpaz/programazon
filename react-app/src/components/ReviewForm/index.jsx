import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading';
import { thunkGetSingleProduct } from '../../store/products';
import { useParams, useHistory, useLocation} from 'react-router-dom'
import { thunkCreateReview, thunkEditReview } from '../../store/reviews';
import './ReviewForm.css';


function ReviewForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const { productId } = useParams()
  const product = useSelector(state => state.products.singleProduct.product)

  const location = useLocation()
  let review = null
  if (location.state) {
    review = location.state.review
  }

  const [rating, setRating] = useState(review?.rating ?? 0);
  const [title, setTitle] = useState(review?.title ?? "");
  const [image, setImage] = useState(review?.image ?? "");
  const [content, setContent] = useState(review?.content ?? "");
  const [errors, setErrors] = useState({});

  console.log(errors)

  useEffect(() => {
    dispatch(thunkGetSingleProduct(productId))
  }, [dispatch, productId])

  if (!product) {
    return <Loading />
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    let data = null

    if (!review) {
      const newReview = {
        product_id: product?.id,
        buyer_id: user?.id,
        title,
        content,
        rating,
        image
      }
      data = await dispatch(thunkCreateReview(newReview, product?.id))
    } else {
      const editReview = {
        id: review?.id,
        product_id: product?.id,
        buyer_id: user?.id,
        title,
        content,
        rating,
        image
      }
      data = await dispatch(thunkEditReview(editReview))
    }
    if (data && data.errors) {
      setErrors(data.errors)
    } else {
      history.push(`/products/${product?.id}`)
    }
  }

  return (
    <div className='review-form__container'>
      <div className='review-form__content'>
        <div className='review-form__header'>
            {review ? (
              <h1>Edit Review</h1>
            ) : (
              <h1>Create Review</h1>
            )}
            <div className='review-form__header-info'>
                <img src={product?.image} alt='product' />
                <span>{product?.name}</span>
            </div>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='review-form__input'>
                <label htmlFor="rating">Overall Rating</label>
                <input
                    type='number'
                    id='rating'
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                    min={1}
                    max={5}
                    />
            </div>
            <div className='review-form__input'>
                <label htmlFor='title'>Add a headline</label>
                <input
                    id='title'
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="What's most import to know?"
                    />
                {errors.title && <p className="review-errors"><span> ! </span>{errors.title}</p>}
            </div>
            <div className='review-form__input'>
                <label htmlFor='image'>Add a photo or video</label>
                <span>Shoppers find images and videos more helpful than text alone</span>
                <input
                    id='image'
                    type='text'
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    />
                {errors.image && <p className="review-errors"><span> ! </span>{errors.image}</p>}

            </div>
            <div className='review-form__input'>
                <label htmlFor='content'>Add a written review</label>
                <textarea
                    id='content'
                    type='text'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder='What did you like or dislike? What did you use this product for?'
                    />
                {errors.content && <p className="review-errors"><span> ! </span>{errors.content}</p>}
            </div>
            <div className='review__submit'>
              <button type='submit'>{review ? 'Submit Changes' : 'Submit'}</button>
            </div>
        </form>

      </div>
    </div>
  )
}

export default ReviewForm
