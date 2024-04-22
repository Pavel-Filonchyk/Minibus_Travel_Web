import { takeEvery, put, call } from 'redux-saga/effects'
import { GET_QUEUES, getQueuesSuccess } from '../../../actions/restAdminTravelActions'
import httpProvider from '../../../../common/httpProvider'
import { QUEUES_URL } from '../../../../common/api'

function* workerLoader() {
    try {
        const { data } = yield call(httpProvider.get, QUEUES_URL)
    
        yield put(getQueuesSuccess(data))
      } catch (error) {
        yield console.log(error)
      }
  }

export default function* watcherGetQueuesAdmin() {
  yield takeEvery(GET_QUEUES, workerLoader)
}
  