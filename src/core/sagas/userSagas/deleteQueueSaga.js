import { takeEvery, put, call, select } from 'redux-saga/effects'
import { DELETE_QUEUE, deleteQueueSuccess } from '../../actions/canselTravelActions'
import httpProvider from '../../../common/httpProvider'
import { queuesUrl } from '../../../common/api'

function* workerLoader() {
    const blockIdQueue = yield select(state => state.restUserReducer.blockIdQueue)
    const token = yield select(state => state.getTravelsReducer.token)
    try {
        const { data } = yield call(httpProvider.delete, queuesUrl(blockIdQueue, token))
    
        yield put(deleteQueueSuccess(data))
      } catch (error) {
        yield put(console.log(error))
      }
  }

export default function* watcherDeleteQueue() {
  yield takeEvery(DELETE_QUEUE, workerLoader)
}