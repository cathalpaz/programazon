import React from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { thunkDeleteReview } from '../../store/reviews'
import './DeleteModal.css'

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
      <div className='delete__header'>
        <h4>Delete this {type === 'review' ? ('review') : ('product')}</h4>
        <i className="fa-solid fa-x" onClick={closeModal}></i>
      </div>
      {type === 'review' ? (
        <span>Your review will no longer appear to other users. Are you sure you want to delete?</span>
      ) : (
        <span>Your product will no longer be available to purchase by other users. Are you sure you want to delete?</span>
      )}
      <div className='delete__btns'>
        <button className='delete__close' onClick={closeModal}>Cancel</button>
        <button className='delete__delete' onClick={handleDelete}>Confirm Delete</button>
      </div>
    </div>
  )
}

export default DeleteModal
