import { takeEvery, put, call, select } from 'redux-saga/effects'
import { POST_DIRECTION, postDirectionSuccess } from '../../../actions/restAdminTravelActions'
import httpProvider from '../../../../common/httpProvider'
import { DIRECTIONS_URL } from '../../../../common/api'

function* workerLoader() {
    const postDirection = yield select(state => state.restAdminTravelReducer.postDirection)

    try {
      const { data } = yield call(httpProvider.post, DIRECTIONS_URL, {data: postDirection})
  
      yield put(postDirectionSuccess(data))
    } catch (error) {
      yield put(console.log(error))
    }
  }

export default function* watcherPostDirectionAdmin() {
    yield takeEvery(POST_DIRECTION, workerLoader)
}