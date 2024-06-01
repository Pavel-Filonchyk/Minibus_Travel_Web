import { takeEvery, put, call, select } from 'redux-saga/effects'
import { POST_USER, postUserSuccess, postUserError, getAllTravelsSuccess, getAllTravelsError } from '../../actions/bookTravelActions'
import httpProvider from '../../../common/httpProvider'
import { TRAVELS_URL, travelUrl } from '../../../common/api'

function* workerLoader() {
  
    const userData = yield select(state => state.postUserReducer.userData)
    const blockId = yield select(state => state.postUserReducer.blockId)
    const numberSeats = yield select(state => state.postUserReducer.numberSeats)

    try {
      const { data } = yield call(httpProvider.get, TRAVELS_URL)
      const list = Object.keys(data).map(key => ({...data[key], blockId: key}))
      const findBlock = list.find(item => item.blockId === blockId)
 
      if(findBlock?.freeSeats >= numberSeats) {
        try {
          const { data } = yield call(httpProvider.put, travelUrl(blockId), {data: userData})
      
          yield put(postUserSuccess(data))
        } catch (error) {
          yield put(postUserError(error))
        }
      }else{
        yield put(postUserSuccess("На рейсе закончились места"))
      }

      yield put(getAllTravelsSuccess(data))
    } catch (error) {
      yield put(getAllTravelsError(error))
    }

    
  }

export default function* watcherPostUser() {
  yield takeEvery(POST_USER, workerLoader)
}