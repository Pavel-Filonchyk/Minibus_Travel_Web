const getTravels = (data) => {
    return {
        type: 'GET_TRAVELS',
        payload: data 
    } 
}
export const GET_USER = 'GET_TRAVELS'

const getTravelsSuccess = (data) => {
    return {
        type: 'GET_TRAVELS_SUCCESS',
        payload: data 
    } 
}
const getTravelsError = (data) => {
    return {
        type: 'GET_USER_ERROR',
        payload: data 
    } 
}

const deleteTravel = (data) => {
    return {
        type: 'DELETE_TRAVEL',
        payload: data 
    } 
}
export const DELETE_TRAVEL = 'DELETE_TRAVEL'

const deleteTravelSuccess = (data) => {
    return {
        type: 'DELETE_TRAVEL_SUCCESS',
        payload: data 
    } 
}
const deleteTravelError = (data) => {
    return {
        type: 'DELETE_TRAVEL_ERROR',
        payload: data 
    } 
}

export {
    getTravels,
    getTravelsSuccess,
    getTravelsError,
    deleteTravel,
    deleteTravelSuccess,
    deleteTravelError
}