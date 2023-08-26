// TYPES
const GET_CART = 'cart/getCart';
const ADD_TO_CART = 'cart/addToCart';
const REMOVE_FROM_CART = 'cart/removeFromCart';



// ACTIONS
const actionGetCart = (cart) => {
    return {
        type: GET_CART,
        payload: cart
    }
}
const actionAddToCart = (cart) => {
    return {
        type: ADD_TO_CART,
        payload: cart
    }
}

// maybe cartId or productId
// const actionRemoveFromCart = (cart) => {
//     return {
//         type: REMOVE_FROM_CART,
//         payload: cart
//     }
// }


// THUNKS
export const thunkGetCart = () => async(dispatch) => {
    const res = await fetch(`/api/carts`);
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetCart(data));
        return data;
    } else {
        const errData = await res.json();
        return errData;
    }
}

export const thunkAddToCart = (quantity, productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}/add}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quantity)
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionAddToCart(data));
        return data;
    } else {
        const errData = await res.json();
        return errData;
    }
}


// REDUCER
const initialState = {  };

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CART: {
            // const newState = { cart: action.payload.cart };
            // for (let item of action.payload.cart.cart_items) {
            //     newState.cartItems[item.id] = item;
            // }
            // return newState;
            return { ...state, ...action.payload.cart}
        }
        case ADD_TO_CART: {
            const newState = { ...state };
            newState.cartItems = action.payload.cart.cart_items;
            return newState;
        }
        default:
            return state;
    }
}

export default cartReducer;
