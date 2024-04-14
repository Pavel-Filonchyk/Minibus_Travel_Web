import _ from 'lodash' 

const initialState = {
    busstops: [],
    busstopsData: [],
    postBusstop: [],
    blockId: ''
}

const restAdminBusstopsReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_BUSSTOPS_SUCCESS':
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            console.log(list)
            return {
                ...state,
                busstops: action.payload,
                busstopsData: list,
            }
        case 'POST_BUSSTOP':
            const busstops = []
            for (let item in action.payload) {
                busstops.push({[item]: action.payload[item]})
            }
            const cityBusstops = {city: busstops[0].city, busstops: busstops.slice(1, busstops.length).map(item => Object.values(item)).flat()}
            return {
                ...state,
                postBusstop: cityBusstops
            }
        case 'DELETE_BUSSTOP':
            const blockId = action.payload
            const deleteBusstop = state.busstopsData.filter(item => item.blockId !== blockId)
            
            return {
                ...state,
                busstopsData: deleteBusstop,
                blockId
            }
           
        default: 
        return state;  
    }
}
    
export default restAdminBusstopsReducer