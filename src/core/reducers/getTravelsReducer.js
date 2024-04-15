const initialState = {
    directions: [],
    cities: [],
    travels: [],
    getError: false
}

const getTravelsReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_CITIES_SUCCESS':
            const cities = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                cities
            }
        case 'GET_DIRECTIONS_SUCCESS':
            const directions = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                directions
            }
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

