import getTravelsReducer from './getTravelsReducer'
import postUserReducer from './postUserReduser'
import restUserReducer from './restUserReducer'

export const rootReducer = () => {
    return { getTravelsReducer, postUserReducer, restUserReducer }
}