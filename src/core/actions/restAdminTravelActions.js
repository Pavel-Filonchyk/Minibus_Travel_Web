const getDirections = (data) => {
    return {
        type: 'GET_DIRECTIONS',
        payload: data 
    } 
}
export const GET_DIRECTIONS = 'GET_DIRECTIONS'

const getDirectionsSuccess = (data) => {
    return {
        type: 'GET_DIRECTIONS_SUCCESS',
        payload: data 
    } 
}

const postDirection = (data) => {
    return {
        type: 'POST_DIRECTION',
        payload: data 
    } 
}
export const POST_DIRECTION = 'POST_DIRECTION'

const postDirectionSuccess = (data) => {
    return {
        type: 'POST_DIRECTION_SUCCESS',
        payload: data 
    } 
}
const deleteDirection = (data) => {
    return {
        type: 'DELETE_DIRECTION',
        payload: data 
    } 
}
export const DELETE_DIRECTION = 'DELETE_DIRECTION'
const deleteDirectionSuccess = (data) => {
    return {
        type: 'DELETE_DIRECTION_SUCCESS',
        payload: data 
    } 
}
export const DELETE_COST = 'DELETE_DIRECTION'
const getTravels = (data) => {
    return {
        type: 'GET_TRAVELS',
        payload: data 
    } 
}
export const GET_TRAVELS = 'GET_TRAVELS'

const getTravelsSuccess = (data) => {
    return {
        type: 'GET_TRAVELS_SUCCESS',
        payload: data 
    } 
}
const getTravelsError = (data) => {
    return {
        type: 'GET_TRAVELS_ERROR',
        payload: data 
    } 
}
const postTravel = (data) => {
    return {
        type: 'POST_TRAVEL',
        payload: data 
    } 
}
export const POST_TRAVEL = 'POST_TRAVEL'

const postTravelSuccess = (data) => {
    return {
        type: 'POST_TRAVEL_SUCCESS',
        payload: data 
    } 
}
const postTravelError = (data) => {
    return {
        type: 'POST_TRAVEL_ERROR',
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
    getDirections,
    getDirectionsSuccess,
    postDirection,
    postDirectionSuccess,
    deleteDirection,
    deleteDirectionSuccess,
    getTravels,
    getTravelsSuccess,
    getTravelsError,
    postTravel,
    postTravelSuccess,
    postTravelError,
    deleteTravel,
    deleteTravelSuccess,
    deleteTravelError
}