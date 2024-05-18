const initialState = {
    phoneNumber: '',
    userData: [],
    deleteUserData: [],
    travels: [],
    blockId: '',
    deleteUserSuccess: false,
    getUserError: false,

    userQueue: [],
    blockIdQueue: '',
    deleteQueueSuccess: false,
}

const restUserReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_USER':
            return {
                ...state,
                phoneNumber: action.payload.phoneNumber,
            }
        case 'GET_USER_SUCCESS':
            // т.к. в main подтягивает данные с сервака через useEffect на авто при переходе на страницу, поэтому можно брать данные из getAllTravels
            // но необходимо заставить обновиться страницу main после брони
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            let peoples = []
            for (let i of list) {
                for (let s of i.persons) {
                    peoples.push(s)
                }
            }
            const userData = peoples.filter(item => item?.phoneNumber === state.phoneNumber)
            return {
                ...state,
                userData,
                travels: list
            }
        case 'DELETE_USER':
            const blockIdDelete = action.payload?.blockId
            const id = action.payload?.id
            const numberSeats = action.payload?.numberSeats
            // удаление из массива на экране
            const newUserData = state.userData.filter(item => item.id !== id)
       
            // изменение на сервере 
            const findBlockId = state.travels.filter(item => item.blockId === blockIdDelete)[0]
            const freeSeatsDelete = findBlockId?.freeSeats + Number(numberSeats)
        
            let deleteUserData
            if (findBlockId?.persons.length > 1){
            deleteUserData = {
                    cities: findBlockId?.cities,
                    tripFrom: findBlockId?.tripFrom, tripTo: findBlockId?.tripTo, dateTrip: findBlockId?.dateTrip, timeTrips: findBlockId?.timeTrips, blockId: blockIdDelete,
                    freeSeats: freeSeatsDelete, 
                    persons: findBlockId.persons.filter(item => item?.id !== id)
                }
            }
            // изменение travels, т.к. при удалении одной брони на сервере, дальнейшее удаление не происходит, т.к. не меняетя сам travels
            const newTravels = state.travels.filter(item => item.blockId !== blockIdDelete)
            return {
                ...state,
                blockId: blockIdDelete,
                userData: newUserData,
                deleteUserData,
                travels: [...newTravels, deleteUserData]
            }
        case 'DELETE_USER_SUCCESS':   
            return {
                ...state,
                deleteUserSuccess: true
            }
        case 'GET_USER_ERROR':
            return {
                ...state,
                getUserError: action.payload,
            }

        case 'GET_QUEUE_SUCCESS':
            const listQueue = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            const findUserQueue = listQueue?.filter(item => item?.phoneNumber === state.phoneNumber)
            return {
                ...state,
                userQueue: findUserQueue
            }
        case 'GET_QUEUE_ERROR':
        console.log(action.payload)
        return {
            ...state, 
        }
        case 'DELETE_QUEUE':
            const deleteQueue = state.userQueue?.filter(item => item.blockId !== action.payload)
            return {
                ...state,
                blockIdQueue: action.payload,
                userQueue: deleteQueue
            }
        case 'DELETE_QUEUE_SUCCESS':
            console.log(action.payload)
            return {
                ...state,
                //userQueue: deleteQueue
            }
        default: 
        return state;  
    }
}

export default restUserReducer