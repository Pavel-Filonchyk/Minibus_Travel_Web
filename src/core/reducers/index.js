import getTravelsReducer from './getTravelsReducer'
import postUserReducer from './postUserReduser'
import restUserReducer from './restUserReducer'
import restAdminReducer from './restAdminReducer'

export const rootReducer = () => {
    return { getTravelsReducer, postUserReducer, restUserReducer, restAdminReducer }
}