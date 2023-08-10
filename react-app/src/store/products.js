// TYPES
const GET_PRODUCTS = 'products/getProducts';





// ACTIONS
const actionGetProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}



// THUNKS
export const thunkGetProducts = () => async(dispatch) => {
    const res = await fetch(`/api/products`);

    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetProducts(data));
        return data;
    } else {
        const errData = await res.json();
        return errData;
    }
}


// REDUCER
const initialState = { allProducts: {}, singleProduct: {} };

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PRODUCTS: {
            const newState = { ...state }
            for (const product of action.payload.products) {
                newState.allProducts[product.id] = product
            }
            return newState
        }
        default:
            return state
    }
}

export default productReducer
