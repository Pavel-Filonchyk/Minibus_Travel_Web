export const sendCodeData = (data) => {
    return {
        type: 'SEND_CODE_DATA',
        payload: data 
    } 
}
export const SEND_CODE_DATA = 'SEND_CODE_DATA'
export const sendCodeDataSuccess = (data) => {
    return {
        type: 'SEND_CODE_DATA_SUCCESS',
        payload: data 
    } 
}
export const sendCodeDataError = (data) => {
    return {
        type: 'SEND_CODE_DATA_ERROR',
        payload: data 
    } 
}
export const resetErrorCode = (data) => {
    return {
        type: 'RESET_ERROR_CODE',
        payload: data 
    } 
}
// export const postMessage = (data) => {
//     return {
//         type: '',
//         payload: data 
//     } 
// }
// export const POST_MESSAGE = 'POST_MESSAGE'
export const postMessageSuccess = (data) => {
    return {
        type: 'POST_MESSAGE_SUCCESS',
        payload: data 
    } 
}
export const postMessageError = (data) => {
    return {
        type: 'POST_MESSAGE_ERROR',
        payload: data 
    } 
}

export const sendCodePersonal = (data) => {
    return {
        type: 'SEND_CODE_PERSONAL',
        payload: data 
    } 
}
export const SEND_CODE_PERSONAL = 'SEND_CODE_PERSONAL'
export const sendCodePersonalSuccess = (data) => {
    return {
        type: 'SEND_CODE_PERSONAL_SUCCESS',
        payload: data 
    } 
}
export const sendCodePersonalError = (data) => {
    return {
        type: 'SEND_CODE_PERSONAL_ERROR',
        payload: data 
    } 
}