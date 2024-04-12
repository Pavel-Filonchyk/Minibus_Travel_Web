import _ from 'lodash'

const initialState = {
    travelsData: [],
    travels: [],
    postTravel: [],
    deleteTravelData: [],
    blockId: '',

}

const restAdminReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_TRAVELS_SUCCESS':
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                travelsData: list,
                travels: action.payload
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
            // удаление рейса на экране
            const index = state.travelsData.findIndex(item => item.blockId === blockId)
            let newTravelsData =  [
                ...state.travelsData.splice(0, index),
                ...state.travelsData.splice(index + 1)
            ]
            
            // удаление рейса на сервере
            const deleteTravelData = delete state.travels[blockId]
            if(deleteTravelData){
                return {
                    ...state,
                    travelsData: newTravelsData,
                    deleteTravelData: state.travels
                }
            }else{return state}
        case 'DELETE_TRAVEL_SUCCESS':
           
            return {
                ...state,
                
            }

        default: 
        return state;  
    }
}
    
export default restAdminReducer