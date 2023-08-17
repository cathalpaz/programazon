import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading';
import { thunkGetSingleProduct } from '../../store/products';
import { useParams, useHistory, useLocation} from 'react-router-dom'
import { thunkCreateReview, thunkEditReview } from '../../store/reviews';
import './ReviewForm.css';


function ReviewForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const fileRef = useRef()
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


  useEffect(() => {
    dispatch(thunkGetSingleProduct(productId))
  }, [dispatch, productId])

  if (!product) {
    return <Loading />
  }
  if (!user) {
    history.push('/')
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('rating', rating)
    if (image) {
      formData.append('image', image)
    }


    let data = null

    if (!review) {
      data = await dispatch(thunkCreateReview(formData, product?.id))
    } else {
      data = await dispatch(thunkEditReview(formData, review?.id))
    }
    if (data && data.errors) {
      setErrors(data.errors)
    } else {
      history.push(`/products/${product?.id}`)
    }
  }

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

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

                {!image || review ? (
                  <button className='form__file-upload' onClick={handleImageUpload}><i class="fa-solid fa-plus"></i></button>
                ) : (
                  <button className='form__file-pic'><img src={URL.createObjectURL(image)} alt='preview' /></button>
                )}
                <input
                    id='image'
                    ref={fileRef}
                    className='form__file-input'
                    type='file'
                    accept='image/*'
                    onChange={e => setImage(e.target.files[0])}
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
