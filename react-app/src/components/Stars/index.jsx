import React from 'react'

function Stars({ rating }) {

    const roundedRating = Math.round(rating * 2) / 2;


  return (
    <span className='star-rating product__stars'>
        {roundedRating === 5 && (
            <span><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></span>
        )}
        {roundedRating === 4.5 && (
            <span><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i></span>
        )}
        {roundedRating === 4 && (
            <span><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i></span>
        )}
        {roundedRating === 3.5 && (
            <span><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i><i className="fa-regular fa-star"></i></span>
        )}
        {roundedRating === 3 && (
            <span><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i></span>
        )}
        {roundedRating === 2.5 && (
            <span><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i></span>
        )}
        {roundedRating === 2 && (
            <span><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i></span>
        )}
        {roundedRating === 1.5 && (
            <span><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i></span>
        )}
        {roundedRating === 1 && (
            <span><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i></span>
        )}
        {roundedRating === 0.5 && (
            <span><i className="fa-solid fa-star-half-stroke"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i></span>
        )}
        {roundedRating === 0 && (
            <span><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i></span>
        )}
    </span>
  )
}

export default Stars
