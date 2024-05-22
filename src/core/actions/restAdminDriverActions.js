export const getDrivers = (data) => {
    return {
        type: 'GET_DRIVERS',
        payload: data 
    } 
}
export const GET_DRIVERS = 'GET_DRIVERS'

export const getDriversSuccess = (data) => {
    return {
        type: 'GET_DRIVERS_SUCCESS',
        payload: data 
    } 
}
export const getDriversError = (data) => {
    return {
        type: 'GET_DRIVERS_ERROR',
        payload: data 
    } 
}

export const postDriverSuccess = (data) => {
    return {
        type: 'POST_DRIVER_SUCCESS',
        payload: data 
    } 
}
export const POST_DRIVER = 'POST_DRIVER'
export const postDriver = (data) => {
    return {
        type: 'POST_DRIVER',
        payload: data 
    } 
}
export const postDriverError = (data) => {
    return {
        type: 'POST_DRIVER_ERROR',
        payload: data 
    } 
}
export const deleteDriver = (data) => {
    return {
        type: 'DELETE_DRIVER',
        payload: data 
    } 
}
export const DELETE_DRIVER = 'DELETE_DRIVER'
export const deleteDriverSuccess = (data) => {
    return {
        type: 'DELETE_DRIVER_SUCCESS',
        payload: data 
    } 
}
export const deleteDriverError = (data) => {
    return {
        type: 'DELETE_DRIVER_ERROR',
        payload: data 
    } 
}