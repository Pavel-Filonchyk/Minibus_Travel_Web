const initialState = {
    userData: [],
    userDataID: [],
    postSuccess: false,
    postError: false
}

const postUserReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'POST_USER':
            const ticketData = action.payload
            const totalSeats = ticketData.choiceRoutes[0]?.totalSeats
            const freeSeates = totalSeats > 0 ? totalSeats - ticketData.numberSeats : totalSeats
            const userData = {
                tripFrom: ticketData.choiceRoutes[0]?.tripFrom, tripTo: ticketData.choiceRoutes[0]?.tripTo, dateTrip: ticketData.choiceRoutes[0]?.dateTrip, timeTrips: ticketData.choiceRoutes[0]?.timeTrips, car: ticketData.choiceRoutes[0]?.car,
                totalSeats, freeSeates, reservedSeats: totalSeats - freeSeates, 
                persons: [
                    ...ticketData?.choiceRoutes[0]?.persons,
                    {fullName: ticketData.fullName, tripFrom: ticketData.selectFrom, wayStart: ticketData.wayStart, tripTo: ticketData.selectTo, wayStop: ticketData.wayStop, phoneNumber: ticketData.phoneNumber, numberSeats: ticketData.numberSeats, cost: 20}
                ]
            }
            return {
                ...state,
                userDataID: ticketData?.choiceRoutes[0]?.id,
                userData
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
