const initialState = {
    travelsData: [],
    postTravel: {},
    blockId: '',
    directionsData: [],
    postDirection: [],
    blockIdDirection: '',
}

const restAdminTravelReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_TRAVELS_SUCCESS':
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                travelsData: list,
            }
        case 'POST_TRAVEL':
            const postData = action.payload
            const postTravel = {
                tripFrom: postData.travelFrom, tripTo: postData.travelTo, dateTrip: postData.date, totalSeats: postData.totalSeats, freeSeates: 0, reservedSeats: 0, timeTrips: postData.time, cost: postData.cost, car: '', 
                persons: [{id: '0000000', blockId: '00000000', fullName: '', tripFrom: '', wayStart: '', dateTrip:"00.00.00",  timeTrips: '', tripTo: '', wayStop: '', phoneNumber: '00000000000', numberSeats: 0},]
            }
            return {
                ...state,
                postTravel
            }
        case 'DELETE_TRAVEL':
            const blockId = action.payload

            if(blockId !== '-NvS829IaF_37dJptRIe'){
                const deleteTravel = state.travelsData.filter(item => item.blockId !== blockId)
                return {
                    ...state,
                    travelsData: deleteTravel,  // удаление на экране
                    blockId                     // передача id для удаления на сервере
                }
            }else{return {state}}

        case 'GET_DIRECTIONS_SUCCESS':
            const directions = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                directionsData: directions,
            }
        case 'POST_DIRECTION':
            console.log(action.payload)
            return {
                ...state,
                postDirection: {direction: action.payload}
            }
        case 'DELETE_DIRECTION':
            const blockIdDirection = action.payload
            const deleteDirection = state.directionsData.filter(item => item.blockId !== blockIdDirection)
            return {
                ...state,
                directionsData: deleteDirection,
                blockIdDirection
            }   
             
        default: 
        return state;  
    }
}
    
export default restAdminTravelReducer