import { takeEvery, put, call } from 'redux-saga/effects'
import { GET_COSTS, getCostsSuccess, getCostsError } from '../../../actions/restAdminCostsActions'
import httpProvider from '../../../../common/httpProvider'
import { COSTS_URL } from '../../../../common/api'

function* workerLoader() {
    try {
        const { data } = yield call(httpProvider.get, COSTS_URL)
    
        yield put(getCostsSuccess(data))
      } catch (error) {
        yield put(getCostsError(error))
      }
  }

export default function* watcherGetCostsAdmin() {
  yield takeEvery(GET_COSTS, workerLoader)
}
  