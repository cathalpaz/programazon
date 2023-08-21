import { useHistory } from 'react-router-dom'
import './404Page.css'

function Page404() {
  const history = useHistory()
  const sendToHome = () => {
    history.push('/')
  }

  return (
    <div className='err-page__container'>
        <span className='err-page__header'>SORRY</span>
        <span className='err-page__sub'>we couldn't find that page</span>
        <span className='err-page__link'>Try searching or go to <p onClick={sendToHome}>Programazon's home page</p>.</span>
    </div>
  )
}

export default Page404
