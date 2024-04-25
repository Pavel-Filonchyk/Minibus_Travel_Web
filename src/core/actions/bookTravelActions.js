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
const getCities = (data) => {
    return {
        type: 'GET_CITIES',
        payload: data 
    }
}
export const GET_CITIES = 'GET_CITIES'

const getCitiesSuccess = (data) => {
    return {
        type: 'GET_CITIES_SUCCESS',
        payload: data 
    }
}

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

const postUser = (data) => {
    return {
        type: 'POST_USER',
        payload: data 
    } 
}
export const POST_USER = 'POST_USER'

const postUserSuccess = (data) => {
    return {
        type: 'POST_USER_SUCCESS',
        payload: data 
    } 
}
const postUserError = (data) => {
    return {
        type: 'POST_USER_ERROR',
        payload: data 
    } 
}

const closePostSuccess = (data) => {
    return {
        type: 'CLOSE_POST_SUCCESS',
        payload: data 
    } 
}
const postQueue = (data) => {
    return {
        type: 'POST_QUEUE',
        payload: data 
    } 
}
export const POST_QUEUE = 'POST_QUEUE'
const postQueueSuccess = (data) => {
    return {
        type: 'POST_QUEUE_SUCCESS',
        payload: data 
    } 
}

export {
    getDirections,
    getDirectionsSuccess,
    getTravels,
    getTravelsSuccess,
    getTravelsError,
    postUser,
    postUserSuccess,
    postUserError,
    closePostSuccess,
    getCities,
    getCitiesSuccess,
    postQueue,
    postQueueSuccess
}