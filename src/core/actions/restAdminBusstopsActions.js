const getBusstops = (data) => {
    return {
        type: 'GET_BUSSTOPS',
        payload: data 
    } 
}
export const GET_BUSSTOPS = 'GET_BUSSTOPS'

const getBusstopsSuccess = (data) => {
    return {
        type: 'GET_BUSSTOPS_SUCCESS',
        payload: data 
    } 
}
const getBusstopsError = (data) => {
    return {
        type: 'GET_BUSSTOPS_ERROR',
        payload: data 
    } 
}
const busstopCollector = (data) => {
    return {
        type: 'BUSSTOP_COLLECTOR',
        payload: data 
    }
}
const deleteBusstopCollector = (index) => {
    return {
        type: 'DELETE_BUSSTOP_COLLECTOR',
        payload: index 
    }
}
const postBusstop = (data) => {
    return {
        type: 'POST_BUSSTOP',
        payload: data 
    } 
}
export const POST_BUSSTOP = 'POST_BUSSTOP'

const postBusstopSuccess = (data) => {
    return {
        type: 'POST_BUSSTOP_SUCCESS',
        payload: data 
    } 
}
const postBusstopError = (data) => {
    return {
        type: 'POST_BUSSTOP_ERROR',
        payload: data 
    } 
}
const deleteBusstop = (data) => {
    return {
        type: 'DELETE_BUSSTOP',
        payload: data 
    } 
}
export const DELETE_BUSSTOP = 'DELETE_BUSSTOP'

const deleteBusstopSuccess = (data) => {
    return {
        type: 'DELETE_BUSSTOP_SUCCESS',
        payload: data 
    } 
}
const deleteBusstopError = (data) => {
    return {
        type: 'DELETE_BUSSTOP_ERROR',
        payload: data 
    } 
}

export {
    getBusstops,
    getBusstopsSuccess,
    getBusstopsError,
    busstopCollector,
    deleteBusstopCollector,
    postBusstop,
    postBusstopSuccess,
    postBusstopError,
    deleteBusstop,
    deleteBusstopSuccess,
    deleteBusstopError
}