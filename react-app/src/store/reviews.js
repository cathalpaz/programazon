// TYPES
const CREATE_REVIEW = 'reviews/createReview';
const EDIT_REVIEW = 'reviews/editReview';
const DELETE_REVIEW = 'reviews/deleteReview';


// ACTIONS
const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review
    }
}
const actionEditReview = (review) => {
    return {
        type: EDIT_REVIEW,
        payload: review
    }
}
const actionDeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
    }
}


// THUNKS
export const thunkCreateReview = (review, productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionCreateReview(data.review))
    } else {
        const errData = await res.json();
        return errData;
    }
}
export const thunkEditReview = (review) => async(dispatch) => {
    const res = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionEditReview(data.review))
    } else {
        const errData = await res.json();
        return errData;
    }
}
export const thunkDeleteReview = (reviewId) => async(dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionDeleteReview(reviewId))
        return data
    } else {
        const errData = await res.json();
        return errData;
    }
}


// REDUCER
const initialState = { productReviews: {} }

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_REVIEW: {
            const newState = { ...state }
            newState.productReviews[action.payload.id] = action.payload
            return newState
        }
        case EDIT_REVIEW: {
            const newState = { ...state }
            newState.productReviews[action.payload.id] = action.payload
            return newState
        }
        case DELETE_REVIEW: {
            const newState = { ...state }
            console.log('state: ', newState);
            console.log('payload:', action.payload);
            delete newState.productReviews[action.payload]
            return newState
        }
        default:
            return state
    }
}

export default reviewReducer
