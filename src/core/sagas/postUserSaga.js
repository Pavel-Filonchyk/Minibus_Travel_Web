import { takeEvery, put, call, select } from 'redux-saga/effects'
import { POST_USER, postUserSuccess, postUserError } from '../actions/restApiActions'
import httpProvider from '../../common/httpProvider'
import { travelUrl } from '../../common/api'

function* workerLoader() {
    const userData = yield select(state => state.postUserReducer.userData)
    const userDataID = yield select(state => state.postUserReducer.userDataID)

    try {
        const { data } = yield call(httpProvider.put, travelUrl(userDataID), {data: userData})
    
        yield put(postUserSuccess(data))
      } catch (error) {
        yield put(postUserError(error))
      }
  }

export default function* watcherPostUser() {
  yield takeEvery(POST_USER, workerLoader)
}