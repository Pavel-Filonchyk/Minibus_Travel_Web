const getCosts = (data) => {
    return {
        type: 'GET_COSTS',
        payload: data 
    } 
}
export const GET_COSTS = 'GET_COSTS'

const getCostsSuccess = (data) => {
    return {
        type: 'GET_COSTS_SUCCESS',
        payload: data 
    } 
}
const getCostsError = (data) => {
    return {
        type: 'GET_COSTS_ERROR',
        payload: data 
    } 
}
const postCost = (data) => {
    return {
        type: 'POST_COST',
        payload: data 
    } 
}
export const POST_COST = 'POST_COST'

const postCostSuccess = (data) => {
    return {
        type: 'POST_COST_SUCCESS',
        payload: data 
    } 
}
const postCostError = (data) => {
    return {
        type: 'POST_COST_ERROR',
        payload: data 
    } 
}
const deleteCost = (data) => {
    return {
        type: 'DELETE_COST',
        payload: data 
    } 
}
export const DELETE_COST = 'DELETE_COST'

const deleteCostSuccess = (data) => {
    return {
        type: 'DELETE_COST_SUCCESS',
        payload: data 
    } 
}
const deleteCostError = (data) => {
    return {
        type: 'DELETE_COST_ERROR',
        payload: data 
    } 
}

export {
    getCosts,
    getCostsSuccess,
    getCostsError,
    postCost,
    postCostSuccess,
    postCostError,
    deleteCost,
    deleteCostSuccess,
    deleteCostError
}