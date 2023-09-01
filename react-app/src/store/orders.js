const GET_ORDERS = 'orders/getOrders'
const PLACE_ORDER = 'orders/placeOrder'


const getOrders = (orders) => {
    return {
        type: GET_ORDERS,
        payload: orders
    }
}
const placeOrder = (order) => {
    return {
        type: PLACE_ORDER,
        payload: order
    }
}


export const thunkGetOrders = () => async(dispatch) => {
    const res = await fetch(`/api/orders`);
    if (res.ok) {
        const data = await res.json()
        dispatch(getOrders(data))
        return data
    } else {
        const errData = await res.json()
        return errData
    }
}
export const thunkPlaceOrder = () => async(dispatch) => {
    const res = await fetch(`/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(placeOrder(data))
        return data
    } else {
        const errData = await res.json()
        return errData
    }
}


const initialState = { orders: {} }

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ORDERS: {
            const newState = { ...state }
            for (const order of action.payload.orders) {
                newState.orders[order.id] = order
            }
            return newState
        }
        case PLACE_ORDER: {
            const newState = { ...state }
            newState.orders[action.payload.order.id] = action.payload.order
            return newState
        }
        default:
            return state
    }
}

export default orderReducer;
