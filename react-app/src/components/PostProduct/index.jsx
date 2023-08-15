import { useState } from 'react'
import "./PostProduct.css"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { thunkCreateProduct, thunkEditProduct } from '../../store/products';
import './PostProduct.css'

function PostProduct() {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector(state => state.session.user);

  const location = useLocation()
  let product = null
  if (location.state) {
    product = location.state.product
  }

  console.log(product)

  const [name, setName] = useState(product?.name ?? '');
  const [price, setPrice] = useState(product?.price ?? 0.99);
  const [description, setDescription] = useState(product?.description ?? '');
  const [category, setCategory] = useState(product?.category ?? '');
  const [stock, setStock] = useState(product?.stock_quantity ?? 1);
  const [image, setImage] = useState(product?.image ?? '');
  const [errors, setErrors] = useState({});

  console.log(errors)

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log('submitted')
    // const formData = new FormData()
    // console.log(typeof(formData))
    const newProduct = {
      name,
      price,
      description,
      category,
      stock_quantity: stock,
      image,
      seller_id: user?.id
    }
    const editProduct = {
      id: product?.id,
      name,
      price,
      description,
      category,
      stock_quantity: stock,
      image
    }
    let res = null
    if (!product) {
      res = await dispatch(thunkCreateProduct(newProduct))
    } else {
      res = await dispatch(thunkEditProduct(editProduct))
    }
    history.push(`/products/my-products`)
  }

  return (
    <div className='post-product__container'>
      <div className='post-product__content'>
        <div className='post-product__header'>
          <img src='/images/programazon-dark.png' alt='logo' />
          <span>seller central</span>
        </div>
        <div className='product-form'>
          <span>Start Selling</span>
          <p>Please ensure that all the information you submit is accurate.</p>
          <form onSubmit={handleSubmit}>
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
            <div className='product-form__line'>
              <label>Retail Price*</label>
              <div className='product-form__price'>
                <span>$</span>
                <input
                className='product-form__price-input'
                type='number'
                value={price}
                onChange={e => setPrice(e.target.value)}
                min={0.99}
                max={9999}
                />
              </div>
            </div>
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
            <div className='product-form__line'>
              <label>Image URL*</label>
              <input
                className='line__long'
                type='url'
                value={image}
                onChange={e => setImage(e.target.value)}
                />
            </div>
            <div className='product-form__submit'>
              <button type='submit'>{product ? ('Save Product') : ('List Product')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostProduct
