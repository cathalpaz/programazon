const GET_USERS = 'users/getUser'



const actionGetUser = user => {
    return {
        type: GET_USERS,
        payload: user
    }
}


export const thunkGetUsers = (id) => async(dispatch) => {
    const res = await fetch(`/api/users/`)
    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetUser(data))
        return data
    }
}



const initialState = { allUsers: {}, singleUser: {} }

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS: {
            const newState = { ...state }
            newState.allUsers = action.payload
            return newState
        }
        default:
            return state
    }
}

export default userReducer
