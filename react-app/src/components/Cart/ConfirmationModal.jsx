import { useRef, useEffect } from 'react'
import { useModal } from '../../context/Modal'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function ConfirmationModal() {
  const modalRef = useRef(null)
  const history = useHistory()
  const user = useSelector(state => (state.session.user))
  const { closeModal } = useModal()

  const sendToOrders = () => {
    history.push('/orders')
    closeModal()
  }
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      history.push('/')
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className='confirmation__container' ref={modalRef}>
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
