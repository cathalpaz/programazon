import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { thunkCreateProduct, thunkEditProduct } from '../../store/products';
import './ProductForm.css'

function ProductForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const fileRef = useRef()
  const user = useSelector(state => state.session.user);

  if (!user) {
    history.push('/')
  }

  const location = useLocation()
  let product = null
  if (location.state) {
    product = location.state.product
  }

  const [name, setName] = useState(product?.name ?? '');
  const [price, setPrice] = useState(product?.price ?? 0.99);
  const [description, setDescription] = useState(product?.description ?? '');
  const [category, setCategory] = useState(product?.category ?? '');
  const [stock, setStock] = useState(product?.stock_quantity ?? 1);
  const [image, setImage] = useState(product?.image ?? '');
  const [errors, setErrors] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (!image) {
      e = {}
      e.image = 'Image required'
      setErrors(e)
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('stock_quantity', stock)
    formData.append('image', image)

    let data = null
    if (!product) {

      data = await dispatch(thunkCreateProduct(formData))
    } else {
      data = await dispatch(thunkEditProduct(formData, product.id))
    }

    if (data && data.errors) {
      setErrors(data.errors)
    } else {
      history.push(`/products/my-products`)
    }
  }

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <div className='post-product__container'>
      <div className='post-product__content'>
        <div className='post-product__header'>
          <img src='/images/programazon-dark.png' alt='logo' />
          <span>seller central</span>
        </div>
        <div className='product-form'>
          <span>{product ? ("Edit Product") : ("Start Selling")}</span>
          <p>Please ensure that all the information you submit is accurate.</p>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='product-form__line'>
              <label>Product Name*</label>
              <input
                className='line__long'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={100}
                />
            </div>
            {errors.name && <p className="form-errors"><span> ! </span>{errors.name}</p>}
            <div className='product-form__line'>
              <label>Retail Price*</label>
              <div className='product-form__price'>
                <span>$</span>
                <input
                className='product-form__price-input'
                type='number'
                value={price}
                onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>
            {errors.price && <p className="form-errors"><span> ! </span>{errors.price}</p>}
            <div className='product-form__line'>
              <label>Category*</label>
              <select
                className='line__long'
                value={category}
                onChange={e => setCategory(e.target.value)}
                >
                <option value="" disabled>Select</option>
                <option value="Accessories">Accessories</option>
                <option value="Courses/Tutorials">Courses/Tutorials</option>
                <option value="Licenses">Licenses</option>
                <option value="Merchandise">Merchandise</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.category && <p className="form-errors"><span> ! </span>{errors.category}</p>}
            <div className='product-form__line'>
              <label>Stock Quantity*</label>
              <input
                className='product-form__price-input product-form__quantity'
                type='number'
                value={stock}
                onChange={e => setStock(e.target.value)}
                min={1}
                max={20}
                />
            </div>
            {errors.stock_quantity && <p className="form-errors"><span> ! </span>{errors.stock_quantity}</p>}
            <div className='product-form__line'>
              <label>Product Description*</label>
              <textarea
                className='line__long product-form__desc'
                type='text'
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder='At least 1-3 sentences'
                />
            </div>
            {errors.description && <p className="form-errors"><span> ! </span>{errors.description}</p>}
            <div className='product-form__line'>
              <label>Image*</label>
              {!image || product ? (
                  <button className='form__file-upload' onClick={handleImageUpload}><i className="fa-solid fa-plus"></i></button>
                ) : (
                  <button className='form__file-pic'><img src={URL.createObjectURL(image)} alt='preview' /></button>
                )}
              <input
                ref={fileRef}
                className='form__file-input'
                type='file'
                accept='image/*'
                onChange={e => setImage(e.target.files[0])}
                />
            </div>
            {errors.image && <p className="form-errors"><span> ! </span>{errors.image}</p>}
            <div className='product-form__submit'>
              <button type='submit'>{product ? ('Save Product') : ('List Product')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductForm
