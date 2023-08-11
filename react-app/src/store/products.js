// TYPES
const GET_PRODUCTS = 'products/getProducts';
const GET_SINGLE_PRODUCT = 'products/getSingleProduct';




// ACTIONS
const actionGetProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}

const actionGetSingleProduct = (product) => {
    return {
        type: GET_SINGLE_PRODUCT,
        payload: product
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

export const thunkGetSingleProduct = (id) => async(dispatch) => {
    const res = await fetch(`/api/products/${id}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetSingleProduct(data));
        return data;
    } else {
        const errData = await res.json();
        return errData;
    }

}


// REDUCER
const initialState = { allProducts: {}, singleProduct: {} };

const productReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case GET_PRODUCTS: {
            const newState = { ...state }
            for (const product of action.payload.products) {
                newState.allProducts[product.id] = product
            }
            return newState
        }
        case GET_SINGLE_PRODUCT: {
            return { ...state, singleProduct: action.payload }
        }
        default:
            return state
    }
}

export default productReducer
