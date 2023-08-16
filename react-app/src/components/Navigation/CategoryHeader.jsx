import React from 'react'
import { useHistory } from 'react-router-dom'

function CategoryHeader() {
  const history = useHistory()

  // SEND TO CATEGORIES:
  const sendToAll = () => {
    history.push('/products')
    window.location.reload();
  }
  const sendToAccessories = () => {
    history.push(`/products?q=accessories`)
    window.location.reload();
  }
  const sendToCourses = () => {
    history.push(`/products?q=courses/tutorials`)
    window.location.reload();
  }
  const sendToLicenses = () => {
    history.push(`/products?q=licenses`)
    window.location.reload();
  }
  const sendToMerchandise = () => {
    history.push(`/products?q=merchandise`)
    window.location.reload();
  }
  const sendToOther = () => {
    history.push(`/products?q=other`)
    window.location.reload();
  }

  return (
    <div className='category__container'>
      <span onClick={sendToAll}>All</span>
      <span onClick={sendToAccessories}>Accessories</span>
      <span onClick={sendToCourses}>Courses/Tutorials</span>
      <span onClick={sendToLicenses}>Licenses</span>
      <span onClick={sendToMerchandise}>Merchandise</span>
      <span onClick={sendToOther}>Other</span>
    </div>
  )
}

export default CategoryHeader
