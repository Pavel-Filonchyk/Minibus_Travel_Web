import getTravelsReducer from './getTravelsReducer'
import postUserReducer from './postUserReduser'

export const rootReducer = () => {
    return { getTravelsReducer, postUserReducer }
}