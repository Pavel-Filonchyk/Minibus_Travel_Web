const initialState = {
    blockId: '',
    travelsData: [],
    postTravel: {},

    blockIdQueue: '',
    queuesData: [],

    blockIdSeats: '',
    changeSeatsTravel: {},

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
                tripFrom: postData.travelFrom, tripTo: postData.travelTo, dateTrip: postData.date, freeSeats: postData.freeSeats, timeTrips: postData.time,
                persons: [{id: '00000000', blockId: '00000000', fullName: 'DEFAULT', email: '-', tripFrom: '', wayStart: '', dateTrip:"00:00:00",  
                    timeTrips: '', tripTo: '', wayStop: '', phoneNumber: '-', numberSeats: 0, timeStart: '00:00', timeStop: '00:00', cost: 0
                }]
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

        case 'CHANGE_SEATS':
            const findBlock = state.travelsData.find(item => item.blockId === action.payload.blockId)
            const findIndexBlock = state.travelsData.indexOf(findBlock)
            const changeSeatsTravel = {
                cities: findBlock.cities,
                tripFrom: findBlock.tripFrom, 
                tripTo: findBlock.tripTo,
                dateTrip: findBlock.dateTrip, 
                freeSeats: action.payload.volue === 'plus' ? findBlock.freeSeats +1 : findBlock.freeSeats > 0 && action.payload.volue === 'minus' ? findBlock.freeSeats -1 : findBlock.freeSeats , 
                timeTrips: findBlock.timeTrips,
                persons: findBlock.persons,
                blockId: findBlock.blockId
            }

            return {
                ...state,
                travelsData: [
                    ...state.travelsData.splice(0, findIndexBlock),
                    changeSeatsTravel,
                    ...state.travelsData.splice(findIndexBlock + 1)
                ],
                blockIdSeats: action.payload.blockId,
                changeSeatsTravel
            }

        case 'DELETE_PERSON':
        const id = action.payload.id
        const blockIdPerson = action.payload.blockId
        const numberSeats = action.payload.numberSeats
        // удаление на экране (возвращает массив из всех рейсов, в одном из которых удален нужный юзер)
        const deletePerson = []
        for (let i of state.travelsData) {
            const travel = {
                tripFrom: i.tripFrom,
                tripTo: i.tripTo,
                dateTrip: i.dateTrip,
                freeSeats: i.freeSeats, 
                timeTrips: i.timeTrips,
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
            cities: personTravel[0]?.cities,
            tripFrom: personTravel[0]?.tripFrom,
            tripTo: personTravel[0]?.tripTo,
            dateTrip: personTravel[0]?.dateTrip,
            freeSeats: personTravel[0]?.freeSeats + Number(numberSeats),  
            timeTrips: personTravel[0]?.timeTrips, 
            persons: deletePersonTravel
        }
     
        return {
            ...state,
            travelsData: deletePerson, 
            blockIdPerson,
            newPersonTravel                
        }

        case 'GET_QUEUES_SUCCESS':
            const queuesList = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                queuesData: queuesList,
            }
        case 'DELETE_QUEUE':
            const deleteQueue = state.queuesData.filter(item => item.blockId !== action.payload)
            return {
                ...state,
                blockIdQueue: action.payload,
                queuesData: deleteQueue
            }

        case 'GET_DIRECTIONS_SUCCESS':
            const directions = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                directionsData: directions,
            }
        case 'POST_DIRECTION':
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