const initialState = {
    costsData: [],
    postCost: [],
    blockId: ''
}

const restAdminCostsReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_COSTS_SUCCESS':
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                costsData: list,
            }
        case 'POST_COST':
            return {
                ...state,
                postCost: action.payload
            }

        case 'DELETE_COST':
            const blockId = action.payload
            const deleteCost = state.costsData.filter(item => item.blockId !== blockId)
            
            return {
                ...state,
                costsData: deleteCost,
                blockId
            }
           
        default: 
        return state;  
    }
}
    
export default restAdminCostsReducer