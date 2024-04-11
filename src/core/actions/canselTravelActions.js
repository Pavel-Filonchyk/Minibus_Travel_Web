const getUser = (data) => {
    return {
        type: 'GET_USER',
        payload: data 
    } 
}
export const GET_USER = 'GET_USER'

const getUserSuccess = (data) => {
    return {
        type: 'GET_USER_SUCCESS',
        payload: data 
    } 
}
const getUserError = (data) => {
    return {
        type: 'GET_USER_ERROR',
        payload: data 
    } 
}

const deleteUser = (data) => {
    return {
        type: 'DELETE_USER',
        payload: data 
    } 
}
export const DELETE_USER = 'DELETE_USER'

const deleteUserSuccess = (data) => {
    return {
        type: 'DELETE_USER_SUCCESS',
        payload: data 
    } 
}
const deleteUserError = (data) => {
    return {
        type: 'DELETE_USER_ERROR',
        payload: data 
    } 
}

export {
    getUser,
    getUserSuccess,
    getUserError,
    deleteUser,
    deleteUserSuccess,
    deleteUserError
}