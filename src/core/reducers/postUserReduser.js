const initialState = {
    userData: [],
    blockId: '',
    postSuccess: false,
    postError: false,

    postQueue: {},
    postQueueSuccess: false
}

const postUserReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'POST_USER':
            const ticketData = action.payload
            const cities = ticketData?.choiceRoutes[0]?.cities
            const freeSeats = ticketData.choiceRoutes[0]?.freeSeats - ticketData.numberSeats
            const blockId = ticketData?.choiceRoutes[0]?.blockId

            // рейс со всеми пассажирами и вновь добавленным
            const userData = {
                cities,
                tripFrom: ticketData.choiceRoutes[0]?.tripFrom, tripTo: ticketData.choiceRoutes[0]?.tripTo, dateTrip: ticketData.choiceRoutes[0]?.dateTrip, timeTrips: ticketData.choiceRoutes[0]?.timeTrips,
                freeSeats,  blockId,
                persons: [
                    ...ticketData?.choiceRoutes[0]?.persons,
                    {
                        blockId, id: ticketData.id, fullName: ticketData.fullName, tripFrom: ticketData.selectFrom, tripTo: ticketData.selectTo, wayStart: ticketData.wayStart, wayStop: ticketData.wayStop, 
                        dateTrip: ticketData.choiceRoutes[0]?.dateTrip, phoneNumber: ticketData.phoneNumber, numberSeats: ticketData.numberSeats, 
                        timeStart: ticketData.timeStart, timeStop: ticketData.timeStop, cost: ticketData.costRoute
                    }
                ]
            }
            return {
                ...state,
                blockId,
                userData,
                postSuccess: false
            }

        case 'POST_USER_SUCCESS':
            return {
                ...state,
                postSuccess: true,
            }
            
        case 'CLOSE_POST_SUCCESS':
        return {
            ...state,
            postSuccess: false,
            postQueueSuccess: false
        }
        case 'POST_QUEUE':
            return {
                ...state,
                postQueue: action.payload
            }

        case 'POST_QUEUE_SUCCESS':
            return {
                ...state,
                postQueueSuccess: true
            } 
         
        default: 
        return state;  
    }
}

export default postUserReducer
