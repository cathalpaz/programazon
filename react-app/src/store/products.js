// TYPES
const GET_PRODUCTS = 'products/getProducts';
const GET_SINGLE_PRODUCT = 'products/getSingleProduct';
const CREATE_PRODUCT = 'products/createProduct';
const GET_USER_PRODUCTS = 'products/getUserProducts';
const DELETE_PRODUCT = 'products/deleteProduct';
const EDIT_PRODUCT = 'products/editProduct';
const SEARCH_PRODUCTS = 'products/searchProducts';



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
const actionCreateProduct = (product) => {
    return {
        type: CREATE_PRODUCT,
        payload: product
    }
}
const actionGetUserProducts = (products) => {
    return {
        type: GET_USER_PRODUCTS,
        payload: products
    }
}
const actionDeleteProduct = (productId) => {
    return {
        type: DELETE_PRODUCT,
        payload: productId
    }
}
const actionEditProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        payload: product
    }
}
const actionSearchProducts = (products) => {
    return {
        type: SEARCH_PRODUCTS,
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
export const thunkFilterGetProducts = (query) => async(dispatch) => {
    const res = await fetch(`/api/products?q=${query}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(actionSearchProducts(data));
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
export const thunkCreateProduct = (product) => async(dispatch) => {
    const res = await fetch('/api/products/new', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: product
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionCreateProduct(data))
        // dispatch(actionGetSingleProduct(data.product.id))
        return data
    } else {
        const errData = await res.json();
        return errData;
    }
}
export const thunkGetUserProducts = () => async(dispatch) => {
    const res = await fetch(`/api/products/current`)
    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetUserProducts(data))
        return data
    } else {
        const errData = await res.json();
        return errData;
    }
}
export const thunkDeleteProduct = (productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionDeleteProduct(productId))
        return data
    } else {
        const errData = await res.json();
        return errData;
    }
}
export const thunkEditProduct = (product, productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        // headers: { 'Content-Type': 'application/json' },
        body: product
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionEditProduct(data.product))
    } else {
        const errData = await res.json();
        return errData;
    }
}


// REDUCER
const initialState = { allProducts: {}, singleProduct: {}, userProducts: {}, filteredProducts: {} };

const productReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case GET_PRODUCTS: {
            const newState = { ...state }
            for (const product of action.payload.products) {
                newState.allProducts[product.id] = product
                // newState.filteredProducts[product.id] = product
            }
            return newState
        }
        case SEARCH_PRODUCTS: {

            const newFiltered = {}
            for (const product of action.payload.products) {
                newFiltered[product.id] = product
            }
            return {...state, filteredProducts: newFiltered}
        }
        case GET_SINGLE_PRODUCT: {
            return { ...state, singleProduct: action.payload }
        }
        case CREATE_PRODUCT: {
            const newState = { ...state }
            console.log('NEWSTATE BEFORE:', newState);
            console.log('ACTION:', action);

            const allProducts = { ...state.allProducts, [action.payload.id]: action.payload };
            newState.allProducts = allProducts
            console.log('NEWSTATE AFTER:', newState);
            return newState
        }
        case GET_USER_PRODUCTS: {
            const newUserProducts = {}
            for (const product of action.payload.products) {
                newUserProducts[product.id] = product
            }
            return {...state, userProducts: newUserProducts}
        }
        case DELETE_PRODUCT: {
            const newState = { ...state }
            delete newState.userProducts[action.payload]
            delete newState.allProducts[action.payload]
            return newState
        }
        case EDIT_PRODUCT: {
            const newState = { ...state }
            newState.allProducts[action.payload.id] = action.payload
            newState.userProducts[action.payload.id] = action.payload
            return newState
        }
        default:
            return state
    }
}

export default productReducer
