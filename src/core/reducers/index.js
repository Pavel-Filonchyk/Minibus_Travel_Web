import getTravelsReducer from './getTravelsReducer'
import postUserReducer from './postUserReduser'
import restUserReducer from './restUserReducer'
import restAdminTravelReducer from './restAdminTravelReducer'
import restAdminBusstopsReducer from './restAdminBusstopsReducer'
import restAdminCostsReducer from './restAdminCostsReducer'
import authReducer from './authReducer'
import reportAdminReducer from './reportAdminReducer'
import restAdminDriverReducer from './restAdminDriverReucer'

export const rootReducer = () => {
    return { 
        getTravelsReducer, 
        postUserReducer, 
        restUserReducer, 
        restAdminTravelReducer, 
        restAdminBusstopsReducer, 
        restAdminCostsReducer,
        authReducer,
        reportAdminReducer,
        restAdminDriverReducer
    }
}