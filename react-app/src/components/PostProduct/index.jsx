import { useState } from 'react'
import "./PostProduct.css"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { thunkCreateProduct, thunkEditProduct } from '../../store/products';

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
  const [stock, setStock] = useState(product?.stock_quantity ?? '');
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
      <div className='post_product__header'>
        <img src='/images/programazon-dark.png' alt='logo' />
        <h1>services</h1>
      </div>
      <div className='product-form'>
        <h2>Start Selling</h2>
        <span>Please ensure that all the information you submit is accurate</span>
        <form onSubmit={handleSubmit}>
          <label>
            Product Name*
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={100}
              />
          </label>
          <label>
            Product Description*
            <textarea
              type='text'
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder='At least 1-3 sentences'
              />
          </label>
          <label>
            Retail Price*
            <span>$</span>
            <input
              type='number'
              value={price}
              onChange={e => setPrice(e.target.value)}
              min={0.99}
              max={9999}
              />
          </label>
          <label>
            Category*
            <select
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
          </label>
          <label>
            Available Stock Quantity*
            <input
              type='number'
              value={stock}
              onChange={e => setStock(e.target.value)}
              min={1}
              />
          </label>
          <label>
            Image URL*
            <input
              type='url'
              value={image}
              onChange={e => setImage(e.target.value)}
              />
          </label>
          <button type='submit'>List Product</button>
        </form>
      </div>
    </div>
  )
}

export default PostProduct
