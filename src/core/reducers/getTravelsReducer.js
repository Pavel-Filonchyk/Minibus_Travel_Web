const initialState = {
    directions: [],
    allTravels: [],
    travels: [],
    // данные пользователя о бронировании
    getError: false
}

const getTravelsReducer = (state = initialState, action) => {
    switch (action.type){ 
        
        case 'GET_ALL_TRAVELS_SUCCESS':
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                allTravels: list
            }
        case 'GET_ALL_TRAVELS_ERROR':
            return {
                ...state,
                getError: action.payload,
            }

        case 'GET_DIRECTIONS_SUCCESS':
            const directions = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                directions
            }
        case 'GET_TRAVELS':
            const selectFrom = action.payload?.selectFrom
            const selectTo = action.payload?.selectTo
            const date = action.payload?.date
            
            const findDateRoutes = state.allTravels?.filter(item => item.dateTrip === date)
            
            let collectRoutes = []
            for (let item of findDateRoutes) {
                const findRoutes = () => {
                    const findStartCity = item?.cities?.find(elem => elem?.city === selectFrom)
                    const findIndexFrom = item?.cities?.indexOf(findStartCity)
                    const findFinishCity = item?.cities?.find(elem => elem?.city === selectTo)
                    const findIndexTo = item?.cities?.indexOf(findFinishCity)
                    if(findIndexTo > findIndexFrom){
                        return item.blockId
                    }else{
                        return null
                    }
                } // не показывает, т.к. пропадает cities при удалении
                if(findRoutes() !== null){
                    const findRoute = state.allTravels?.filter(item => item.blockId === findRoutes())
                    collectRoutes.push(findRoute[0])
                }
            }  
            return {
                ...state,
                travels: collectRoutes,
            }

        default: 
        return state;  
    }
}

export default getTravelsReducer

