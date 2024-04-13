const initialState = {
    allBusstops: [],
    busstop: []
}

const restAdminBusstopsReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_BUSSTOPS_SUCCESS':
            
            return {
                ...state,
                busstops: action.payload
            }
        case 'POST_BUSSTOP':
            const busstops = []
            for (let item in action.payload) {
                busstops.push({[item]: action.payload[item]})
            }
            const cityBusstops = {city: busstops[0].city, busstops: busstops.slice(1, busstops.length).map(item => Object.values(item)).flat()}
            console.log(cityBusstops)
            return {
                ...state,
                busstop: cityBusstops
            }

        default: 
        return state;  
    }
}
    
export default restAdminBusstopsReducer