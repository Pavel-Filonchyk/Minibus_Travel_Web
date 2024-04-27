const initialState = {
    user: null,
    phoneNumber: '',
    userData: [],
    deleteUserData: [],
    travels: [],
    blockId: '',
    deleteUserSuccess: false,
    getUserError: false,

    userQueue: [],
    blockIdQueue: '',
    deleteQueueSuccess: false
}

const restUserReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_USER':
            return {
                ...state,
                user: action.payload.user,
                phoneNumber: action.payload.phoneNumber,
            }
        case 'GET_USER_SUCCESS':
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
                travels: action.payload
            }
        case 'DELETE_USER':
            const blockId = action.payload.blockId
            const id = action.payload.id
            const numberSeats = action.payload.numberSeats
            // удаление из массива на экране
            const inx = state.userData.findIndex(item => item.id === id)
            let newUserData =  [
                ...state.userData.splice(0, inx),
                ...state.userData.splice(inx + 1)
            ]

            // изменение на сервере 
            const findBlockId = state.travels[blockId]
            const freeSeats = findBlockId?.freeSeats + Number(numberSeats)
            const index = findBlockId?.persons.findIndex(item => item.id === id)
            
            let deleteUserData
            if (findBlockId?.persons.length > 1){
                deleteUserData = {
                    cities: findBlockId?.cities,
                    tripFrom: findBlockId?.tripFrom, tripTo: findBlockId?.tripTo, dateTrip: findBlockId?.dateTrip, timeTrips: findBlockId?.timeTrips, blockId,
                    freeSeats, 
                    persons:  [
                        ...findBlockId?.persons.splice(0, index),
                        ...findBlockId?.persons.splice(index + 1)
                    ]
                }
            }
            return {
                ...state,
                blockId,
                userData: newUserData,
                deleteUserData,
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
            const findUserQueue = listQueue?.filter(item => item.phoneNumber === state.phoneNumber)
            return {
                ...state,
                userQueue: findUserQueue
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
            // const deleteQueue = state.userQueue?.filter(item => item.blockId !== state.blockIdQueue)
            // console.log(deleteQueue)
            return {
                ...state,
                //userQueue: deleteQueue
            }
        default: 
        return state;  
    }
}

export default restUserReducer