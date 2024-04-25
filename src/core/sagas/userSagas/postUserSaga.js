import { takeEvery, put, call, select } from 'redux-saga/effects'
import { POST_USER, postUserSuccess, postUserError } from '../../actions/bookTravelActions'
import httpProvider from '../../../common/httpProvider'
import { travelUrl } from '../../../common/api'

function* workerLoader() {
    const userData = yield select(state => state.postUserReducer.userData)
    const blockId = yield select(state => state.postUserReducer.blockId)

    try {
      const { data } = yield call(httpProvider.put, travelUrl(blockId), {data: userData})
  
      yield put(postUserSuccess(data))
    } catch (error) {
      yield put(postUserError(error))
    }
  }

export default function* watcherPostUser() {
  yield takeEvery(POST_USER, workerLoader)
}