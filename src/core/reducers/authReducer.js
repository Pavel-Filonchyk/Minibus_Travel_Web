const initialState = {
    sendCode: '',
    phoneNumber: '',
    postMessage: '',
    getCode: null, 
    errorCode: null,

    sendCodePersonal: '',
    getCodePersonal: null,
    errorCodePersonal: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'SEND_CODE_DATA':
            return {
                ...state,
                sendCode: action.payload.code,
                phoneNumber: action.payload.phoneNumber
            }
        case 'SEND_CODE_DATA_SUCCESS':
            return {
                ...state,
                getCode: true
            }
        case 'SEND_CODE_DATA_ERROR':
            console.log(action.payload)
            return {
                ...state,
                errorCode: true
            }

        case 'SEND_CODE_PERSONAL':
            console.log(action.payload)
            return {
                ...state,
                sendCodePersonal: action.payload.code,
                phoneNumber: action.payload.phoneNumber
            }
        case 'SEND_CODE_PERSONAL_SUCCESS':
            return {
                ...state,
                getCodePersonal: true
            }
        case 'SEND_CODE_PERSONAL_ERROR':
            console.log(action.payload)
            return {
                ...state,
                errorCodePersonal: true
            }
        case 'RESET_ERROR_CODE':
            return {
                ...state,
                errorCode: null,
                errorCodePersonal: null,
                getCode: null
            }

        case 'POST_MESSAGE_SUCCESS':
            return {
                ...state
            }
        case 'POST_MESSAGE_ERROR':
            console.log(action.payload)
            return {
                ...state 
            }
        default: 
        return state;  
    }
}

export default authReducer