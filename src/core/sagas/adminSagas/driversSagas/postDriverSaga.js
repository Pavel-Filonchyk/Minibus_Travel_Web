import { takeEvery, put, call, select } from 'redux-saga/effects'
import { POST_DRIVER, postDriverSuccess, postDriverError } from '../../../actions/restAdminDriverActions'
import httpProvider from '../../../../common/httpProvider'
import { DRIVERS_URL } from '../../../../common/api'

function* workerLoader() {
    const postDriver = yield select(state => state.restAdminDriverReducer.postDriver)

    try {
        const { data } = yield call(httpProvider.post, DRIVERS_URL, {data: postDriver})
    
        yield put(postDriverSuccess(data))
      } catch (error) {
        yield put(postDriverError(error))
      }
  }

export default function* watcherPostDriverAdmin() {
    yield takeEvery(POST_DRIVER, workerLoader)
}