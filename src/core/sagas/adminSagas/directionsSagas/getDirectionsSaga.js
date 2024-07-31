import { takeEvery, put, call, select } from 'redux-saga/effects'
import { GET_DIRECTIONS, getDirectionsSuccess } from '../../../actions/restAdminTravelActions'
import httpProvider from '../../../../common/httpProvider'
import { DIRECTIONS_URL } from '../../../../common/api'

function* workerLoader() {
    try {
        const { data } = yield call(httpProvider.get, DIRECTIONS_URL)
    
        yield put(getDirectionsSuccess(data))
      } catch (error) {
        yield put(console.log(error))
      }
  }

export default function* watcherGetDirectionsAdmin() {
  yield takeEvery(GET_DIRECTIONS, workerLoader)
}