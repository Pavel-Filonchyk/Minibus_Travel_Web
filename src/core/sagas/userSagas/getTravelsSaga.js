import { takeEvery, put, call } from 'redux-saga/effects'
import { GET_TRAVELS, getTravelsSuccess, getTravelsError } from '../../actions/bookTravelActions'
import httpProvider from '../../../common/httpProvider'
import { TRAVELS_URL } from '../../../common/api'

function* workerLoader() {
    try {
        const { data } = yield call(httpProvider.get, TRAVELS_URL)
    
        yield put(getTravelsSuccess(data))
      } catch (error) {
        yield put(getTravelsError(error))
      }
  }

export default function* watcherGetTravels() {
  yield takeEvery(GET_TRAVELS, workerLoader)
}
  