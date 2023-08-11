import React from 'react'
import { useHistory } from 'react-router-dom'

function CategoryHeader() {
  const history = useHistory()

  // SEND TO CATEGORIES:
  const sendToAll = () => {
    history.push('/products')
  }



  return (
    <div className='category__container'>
      <span onClick={sendToAll}>All</span>
      <span>Accessories</span>
      <span>Courses/Tutorials</span>
      <span>Licenses</span>
      <span>Merchandise</span>
      <span>Other</span>
    </div>
  )
}

export default CategoryHeader
