const initialState = {
    directions: [],
    travels: [],
    // данные пользователя о бронировании
    getTravelsData: [],
    getError: false
}

const getTravelsReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_DIRECTIONS_SUCCESS':
            const directions = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                directions
            }
        case 'GET_TRAVELS':
            return {
                ...state,
                getTravelsData: action.payload
            }
        case 'GET_TRAVELS_SUCCESS':
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            
            const selectFrom = state.getTravelsData?.selectFrom
            const selectTo = state.getTravelsData?.selectTo
            const date = state.getTravelsData?.date
            console.log(selectFrom, selectTo,date )
            const findDateRoutes = list.filter(item => item.dateTrip === date)
            console.log(findDateRoutes)
            let collectRoutes = []
            for (let item of findDateRoutes) {
                const findRoutes = () => {
                    const findStartCity = item?.cities?.find(elem => elem.city === selectFrom)
                    const findIndexFrom = item?.cities?.indexOf(findStartCity)
                    const findFinishCity = item?.cities?.find(elem => elem.city === selectTo)
                    const findIndexTo = item?.cities?.indexOf(findFinishCity)
                    if(findIndexTo > findIndexFrom){
                        return item.blockId
                    }else{
                        return null
                    }
                }
                if(findRoutes() !== null){
                    const findRoute = list.filter(item => item.blockId === findRoutes())
                    collectRoutes.push(findRoute[0])
                }
            }   
            console.log(collectRoutes)
            return {
                ...state,
                travels: collectRoutes,
            }
        case 'GET_TRAVELS_ERROR':
            return {
                ...state,
                getError: action.payload,
            }

        default: 
        return state;  
    }
}

export default getTravelsReducer

