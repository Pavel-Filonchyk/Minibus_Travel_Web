import { takeEvery, put, call, select } from 'redux-saga/effects'
import { DELETE_QUEUE, deleteQueueSuccess } from '../../../actions/restAdminTravelActions'
import httpProvider from '../../../../common/httpProvider'
import { queuesUrl } from '../../../../common/api'

function* workerLoader() {
    const blockId = yield select(state => state.restAdminTravelReducer.blockIdQueue)
    try {
        const { data } = yield call(httpProvider.delete, queuesUrl(blockId))
        
        yield put(deleteQueueSuccess(data))
      } catch (error) {
        yield put(console.log(error))
      }
  }

export default function* watcherDeleteQueueAdmin() {
  yield takeEvery(DELETE_QUEUE, workerLoader)
}
