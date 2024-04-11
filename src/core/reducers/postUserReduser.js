const initialState = {
    userData: [],
    blockId: '',
    postSuccess: false,
    postError: false
}

const postUserReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'POST_USER':
            const ticketData = action.payload
            const blockId = ticketData?.choiceRoutes[0]?.blockId
            const id = ticketData.id
            const totalSeats = ticketData.choiceRoutes[0]?.totalSeats
            const freeSeates = totalSeats > 0 ? totalSeats - ticketData.numberSeats : totalSeats
            const userData = {
                tripFrom: ticketData.choiceRoutes[0]?.tripFrom, tripTo: ticketData.choiceRoutes[0]?.tripTo, dateTrip: ticketData.choiceRoutes[0]?.dateTrip, timeTrips: ticketData.choiceRoutes[0]?.timeTrips, car: ticketData.choiceRoutes[0]?.car,
                totalSeats, freeSeates, reservedSeats: totalSeats - freeSeates, blockId,
                persons: [
                    ...ticketData?.choiceRoutes[0]?.persons,
                    {blockId, id, fullName: ticketData.fullName, tripFrom: ticketData.selectFrom, wayStart: ticketData.wayStart, tripTo: ticketData.selectTo, dateTrip: ticketData.choiceRoutes[0]?.dateTrip, timeTrips: ticketData.choiceRoutes[0]?.timeTrips, wayStop: ticketData.wayStop, phoneNumber: ticketData.phoneNumber, numberSeats: ticketData.numberSeats, cost: 20}
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
                postSuccess: action.payload,
            }
        case 'POST_USER_ERROR':
            return {
                ...state,
                postError: action.payload,
            }
        default: 
        return state;  
    }
}

export default postUserReducer
