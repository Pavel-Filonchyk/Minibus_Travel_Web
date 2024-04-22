import { takeEvery, put, call, select } from 'redux-saga/effects'
import { POST_QUEUE, postQueueSuccess } from '../../actions/bookTravelActions'
import httpProvider from '../../../common/httpProvider'
import { QUEUES_URL } from '../../../common/api'

function* workerLoader() {
    const postQueue = yield select(state => state.postUserReducer.postQueue)
    console.log(postQueue)
    try {
        const { data } = yield call(httpProvider.post, QUEUES_URL, {data: postQueue})
        
        yield put(postQueueSuccess(data))
      } catch (error) {
        yield put(console.log(error))
      }
  }

export default function* watcherPostQueue() {
  yield takeEvery(POST_QUEUE, workerLoader)
}