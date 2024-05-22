const initialState = {
    driversData: [],
    postDriver: [],
    blockId: ''
}

const restAdminDriverReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_DRIVERS_SUCCESS':
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                driversData: list,
            }
        case 'POST_DRIVER':
            return {
                ...state,
                postDriver: action.payload
            }

        case 'DELETE_DRIVER':
            const blockId = action.payload
            const deleteDriver = state.driversData.filter(item => item.blockId !== blockId)
            
            return {
                ...state,
                driversData: deleteDriver,
                blockId
            }
           
        default: 
        return state;  
    }
}
    
export default restAdminDriverReducer