import _ from 'lodash' 

const initialState = {
    busstopsData: [],
    postBusstop: [],
    blockId: '',
    citiesCollect: []
}

const restAdminBusstopsReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_BUSSTOPS_SUCCESS':
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                busstopsData: list,
            }
            
        case 'BUSSTOP_COLLECTOR':
            const city = action.payload.city
            const busstop = action.payload.busstop
            const time = action.payload.timeBusstop
            
            let citiesCollect
            if(state.citiesCollect.length > 0){
                for (let item of state.citiesCollect) {
                    if(item.city === city){
                        const index = state.citiesCollect.indexOf(item)
                        const newItem = {
                            city, 
                            busstops: [...item.busstops, {busstop, time}]
                        }
                        citiesCollect = [
                            ...state.citiesCollect.splice(0, index),
                            newItem,
                            ...state.citiesCollect.splice(index + 1)
                        ]
                    }else{
                        citiesCollect = [...state.citiesCollect, {city, busstops: [{busstop, time}]}]
                    }
                }
                return {
                    ...state,
                    citiesCollect
                }
            }else{
                return {
                    ...state,
                    citiesCollect: [{city, busstops: [{busstop, time}]}]
                }
            }
        
        case 'DELETE_BUSSTOP_COLLECTOR':
            const index = action.payload
            return {
                ...state,
                citiesCollect: [
                    ...state.citiesCollect.splice(0, index),
                    ...state.citiesCollect.splice(index + 1)
                ]
            }
        case 'POST_BUSSTOP':
            return {
                ...state,
                postBusstop: action.payload
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