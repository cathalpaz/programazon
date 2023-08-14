import React from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { thunkDeleteReview } from '../../store/reviews'

function DeleteModal({ type, feature }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const productId = feature?.product_id
  console.log(feature)

  const handleDelete = () => {
    if (type === 'review') {
        console.log('delete review')
        // DISPATCH THUNK HERE
        dispatch(thunkDeleteReview(feature?.id))
        closeModal()
        history.push(`/products/${productId}`)
        window.location.reload();
    } else {
        console.log('delete product')
        closeModal()
    }
  }


  return (
    <div className='delete__container'>
        <h4>Delete {type === 'review' ? ('Review') : ('Product')}</h4>
        <span>Are you sure you want to delete your {type === 'review' ? ('review') : ('product')}?</span>
        <div className='delete__btns'>
            <span onClick={closeModal}>Cancel</span>
            <button onClick={handleDelete}>Confirm Delete</button>
        </div>
    </div>
  )
}

export default DeleteModal
