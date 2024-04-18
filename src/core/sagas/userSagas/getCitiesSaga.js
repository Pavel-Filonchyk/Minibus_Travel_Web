import { takeEvery, put, call } from 'redux-saga/effects'
import { GET_CITIES, getCitiesSuccess } from '../../actions/bookTravelActions'
import httpProvider from '../../../common/httpProvider'
import { CITIES_URL } from '../../../common/api'

function* workerLoader() {
    try {
        //const { data } = yield call(httpProvider.get, CITIES_URL)
    
        //yield put(getCitiesSuccess(data))
      } catch (error) {
        yield put(console.log(error))
      }
  }

export default function* watcherGetCities() {
  yield takeEvery(GET_CITIES, workerLoader)
}
  