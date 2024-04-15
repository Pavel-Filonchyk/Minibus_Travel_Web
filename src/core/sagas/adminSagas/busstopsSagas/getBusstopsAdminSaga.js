import { takeEvery, put, call } from 'redux-saga/effects'
import { GET_BUSSTOPS, getBusstopsSuccess, getBusstopsError } from '../../../actions/restAdminBusstopsActions'
import httpProvider from '../../../../common/httpProvider'
import { CITIES_URL } from '../../../../common/api'

function* workerLoader() {
    try {
        const { data } = yield call(httpProvider.get, CITIES_URL)
    
        yield put(getBusstopsSuccess(data))
      } catch (error) {
        yield put(getBusstopsError(error))
      }
  }

export default function* watcherGetBusstopsAdmin() {
  yield takeEvery(GET_BUSSTOPS, workerLoader)
}
  