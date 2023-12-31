// TYPES
const GET_CART = 'cart/getCart';
const ADD_TO_CART = 'cart/addToCart';
const REMOVE_FROM_CART = 'cart/removeFromCart';
const UPDATE_CART = 'cart/updateCart';



// ACTIONS
const actionGetCart = (cart) => {
    return {
        type: GET_CART,
        payload: cart
    }
}
const actionAddToCart = (cart_item) => {
    return {
        type: ADD_TO_CART,
        payload: cart_item
    }
}

// maybe cartId or productId
const actionRemoveFromCart = (itemId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: itemId
    }
}
const updateCart = (cart_item) => {
    return {
        type: UPDATE_CART,
        payload: cart_item
    }
}


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
    const res = await fetch(`/api/products/${productId}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({quantity})
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
export const thunkRemoveFromCart = (productId) => async(dispatch) => {
    const res = await fetch(`/api/carts/${productId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionRemoveFromCart(productId));
        return data;
    } else {
        const errData = await res.json();
        return errData;
    }
}
export const thunkUpdateCart = (quantity, productId) => async(dispatch) => {
    const res = await fetch(`/api/carts/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({quantity})
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(updateCart(data));
        return data;
    } else {
        const errData = await res.json();
        return errData;
    }
}

// REDUCER
const initialState = { items: {}, total: 0 };

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CART: {
            const newState = { ...state };
            for (const item of action.payload.cart.cart_items) {
                newState.items[item.id] = item;
            }
            newState.total = action.payload.cart.total_price;
            return newState;
        }
        case ADD_TO_CART: {
            const newState = { ...state };
            newState.items[action.payload.cart_item.id] = action.payload.cart_item;
            newState.total += action.payload.cart_item.subtotal;
            return newState;
        }
        case REMOVE_FROM_CART: {
            const newState = { ...state };
            // newState.total -= action.payload.cart_item.subtotal;
            delete newState.items[action.payload];
            return newState;
        }
        case UPDATE_CART: {
            const newState = { ...state };
            newState.items[action.payload.cart_item.id] = action.payload.cart_item;
            newState.total = action.payload.cart_item.subtotal;
            return newState;
        }
        default:
            return state;
    }
}

export default cartReducer;
