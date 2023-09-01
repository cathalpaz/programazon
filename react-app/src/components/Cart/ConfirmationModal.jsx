import React from 'react'
import { useModal } from '../../context/Modal'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function ConfirmationModal() {
  const history = useHistory()
  const user = useSelector(state => (state.session.user))
  const { closeModal } = useModal()

  const sendToOrders = () => {
    history.push('/orders')
    closeModal()
  }

  return (
    <div className='confirmation__container'>
        <h3><i className="fa-solid fa-circle-check"></i>Order placed, thanks!</h3>
        <p className='confirmation-order'>Confirmation will be shown on <span onClick={sendToOrders}>your orders page</span>.</p>
        <p className='confirmation-deliver'><span>Delivering to {user.username}</span>, {user.address}</p>
        <div>
            <span>Friday, Sept 1</span>
            <p>Estimated delivery</p>
        </div>
    </div>
  )
}

export default ConfirmationModal
