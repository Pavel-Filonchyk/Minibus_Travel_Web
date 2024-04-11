const initialState = {
    travels: [],
    getError: false
}

const getTravelsReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_TRAVELS_SUCCESS':
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                travels: list,
            }
        case 'GET_TRAVELS_ERROR':
            return {
                ...state,
                getError: action.payload,
            }

        default: 
        return state;  
    }
}

export default getTravelsReducer

