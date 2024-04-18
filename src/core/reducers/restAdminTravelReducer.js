const initialState = {
    blockId: '',
    travelsData: [],
    postTravel: {},

    blockIdPerson: '',
    newPersonTravel: {},

    blockIdDirection: '',
    directionsData: [],
    postDirection: [],
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
                cities: postData.cities,
                tripFrom: postData.travelFrom, tripTo: postData.travelTo, dateTrip: postData.date, totalSeats: postData.totalSeats, freeSeates: 0, reservedSeats: 0, timeTrips: postData.time, cost: postData.cost, 
                persons: [{id: '00000000', blockId: '00000000', fullName: '', tripFrom: '', wayStart: '', dateTrip:"00.00.00",  timeTrips: '', tripTo: '', wayStop: '', phoneNumber: '00000000000', numberSeats: 0},]
            }
            return {
                ...state,
                postTravel
            }
        case 'DELETE_TRAVEL':
            const blockId = action.payload

            //if(blockId !== '-NvagtU0V3zwBcEFzIOx'){
                const deleteTravel = state.travelsData.filter(item => item.blockId !== blockId)
                return {
                    ...state,
                    travelsData: deleteTravel,  // удаление на экране
                    blockId                     // передача id для удаления на сервере
                }
            //}else{return {state}}

        case 'DELETE_PERSON':
        const id = action.payload.id
        const blockIdPerson = action.payload.blockId
       
        // удаление на экране (возвращает массив из всех рейсов, в одном из которых удален нужный юзер)
        const deletePerson = []
        for (let i of state.travelsData) {
            const travel = {
                tripFrom: i.tripFrom,
                tripTo: i.tripTo,
                dateTrip: i.dateTrip,
                totalSeats: i.totalSeats,
                freeSeates: i.freeSeates, 
                reservedSeats: i.reservedSeats, 
                timeTrips: i.timeTrips, 
                cost: i.cost,
                persons: i.persons?.filter(item => {
                    if(item.id !== '00000000'){
                        return item.id !== id
                    }else{
                        return item
                    }
                }) 
            }
            deletePerson.push(travel)
        }
      
        // удаление на сервере предполагает нахождение отдельного рейса и через put заменить в нем одного юзера
        const personTravel = state.travelsData?.filter(item => item.blockId === blockIdPerson)
        const deletePersonTravel = personTravel[0]?.persons?.filter(elem => {
            if(elem.id !== '00000000'){
                return elem.id !== id
            }else{return elem}
        })
        const newPersonTravel = {
            tripFrom: personTravel[0]?.tripFrom,
            tripTo: personTravel[0]?.tripTo,
            dateTrip: personTravel[0]?.dateTrip,
            totalSeats: personTravel[0]?.totalSeats,
            freeSeates: personTravel[0]?.freeSeates, 
            reservedSeats: personTravel[0]?.reservedSeats, 
            timeTrips: personTravel[0]?.timeTrips, 
            cost: personTravel[0]?.cost,
            persons: deletePersonTravel
        }
     
        return {
            ...state,
            travelsData: deletePerson, 
            blockIdPerson,
            newPersonTravel                
        }

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