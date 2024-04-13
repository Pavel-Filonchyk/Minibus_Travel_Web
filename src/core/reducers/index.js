import getTravelsReducer from './getTravelsReducer'
import postUserReducer from './postUserReduser'
import restUserReducer from './restUserReducer'
import restAdminTravelReducer from './restAdminTravelReducer'
import restAdminBusstopsReducer from './restAdminBusstopsReducer'

export const rootReducer = () => {
    return { getTravelsReducer, postUserReducer, restUserReducer, restAdminTravelReducer, restAdminBusstopsReducer }
}