const initialState = {
    user: null,
    phoneNumber: '',
    userData: [],
    deleteUserData: [],
    travels: [],
    blockId: '',
    deleteUserSuccess: false,
    getUserError: false
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
            console.log(userData)
            return {
                ...state,
                userData,
                travels: action.payload
            }

        case 'DELETE_USER':
            const blockId = action.payload.blockId
            const id = action.payload.id
            
            // удаление из массива на экране
            const inx = state.userData.findIndex(item => item.id === id)
            let newUserData =  [
                ...state.userData.splice(0, inx),
                ...state.userData.splice(inx + 1)
            ]

            // изменение на сервере 
            const findBlockId = state.travels[blockId]
                // места
                const totalSeats = findBlockId?.totalSeats
                const freeSeates = totalSeats > 0 ? totalSeats - findBlockId.numberSeats : totalSeats
            const index = findBlockId?.persons.findIndex(item => item.id === id)
            
            let deleteUserData
            if (findBlockId?.persons.length > 1){
                deleteUserData = {
                    tripFrom: findBlockId?.tripFrom, tripTo: findBlockId?.tripTo, dateTrip: findBlockId?.dateTrip, timeTrips: findBlockId?.timeTrips, car: findBlockId?.car,
                    totalSeats, freeSeates, reservedSeats: totalSeats - freeSeates, blockId,
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
            getUserSuccess: true
        }

        case 'GET_USER_ERROR':
            return {
                ...state,
                getUserError: action.payload,
            }

        default: 
        return state;  
    }
}

export default restUserReducer