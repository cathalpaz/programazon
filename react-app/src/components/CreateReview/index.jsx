import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading';
import { thunkGetSingleProduct } from '../../store/products';
import { useParams, useHistory } from 'react-router-dom'
import { thunkCreateReview, thunkEditReview } from '../../store/reviews';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './CreateReview.css';


function CreateReview() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const { productId } = useParams()
  const history = useHistory()
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


  useEffect(() => {
    dispatch(thunkGetSingleProduct(productId))
  }, [dispatch, productId])

  if (!product) {
    return <Loading />
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const newReview = {
        product_id: product?.id,
        buyer_id: user?.id,
        title,
        content,
        rating,
        image
    }
    const editReview = {
      id: review?.id,
      product_id: product?.id,
      buyer_id: user?.id,
      title,
      content,
      rating,
      image
    }
    
    if (!review) {
      await dispatch(thunkCreateReview(newReview, product?.id))
    } else {
      await dispatch(thunkEditReview(editReview))
    }
    history.push(`/products/${product?.id}`)
  }

  return (
    <div className='review-form__container'>
        <div className='review-form__header'>
            {review ? (
              <h2>Edit Review</h2>
            ) : (
              <h2>Create Review</h2>
            )}
            <div className='review-form__header-info'>
                <img src={product?.image} alt='product' />
                <span>{product?.name}</span>
            </div>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='review-form__rating'>
                <label for="rating">Overall Rating</label>
                <input
                    type='number'
                    id='rating'
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                    min={1}
                    max={5}
                    />
            </div>
            <div className='review-form__title'>
                <label for='title'>Add a headline</label>
                <input
                    id='title'
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="What's most import to know?"
                    />
            </div>
            <div className='review-form__image'>
                <label for='image'>Add a photo or video</label>
                <span>Shoppers find images and videos more helpful than text alone</span>
                <input
                    id='image'
                    type='text'
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    />
            </div>
            <div className='review-form__content'>
                <label for='content'>Add a written review</label>
                <textarea
                    id='content'
                    type='text'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder='What did you like or dislike? What did you use this product for?'
                    />
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default CreateReview
