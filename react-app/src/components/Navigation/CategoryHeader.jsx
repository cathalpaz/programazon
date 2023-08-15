import React from 'react'
import { useHistory } from 'react-router-dom'

function CategoryHeader() {
  const history = useHistory()

  // SEND TO CATEGORIES:
  const sendToAll = () => {
    history.push('/products')
  }
  const sendToCategory = () => {
    alert('Feature coming soon!')
  }


  return (
    <div className='category__container'>
      <span onClick={sendToAll}>All</span>
      <span onClick={sendToCategory}>Accessories</span>
      <span onClick={sendToCategory}>Courses/Tutorials</span>
      <span onClick={sendToCategory}>Licenses</span>
      <span onClick={sendToCategory}>Merchandise</span>
      <span onClick={sendToCategory}>Other</span>
    </div>
  )
}

export default CategoryHeader
