import { takeEvery, put, call, select } from 'redux-saga/effects'
import { POST_BUSSTOP, postBusstopSuccess, postBusstopError } from '../../../actions/restAdminBusstopsActions'
import httpProvider from '../../../../common/httpProvider'
import { CITIES_URL } from '../../../../common/api'

function* workerLoader() {
    const postBusstop = yield select(state => state.restAdminBusstopsReducer.postBusstop)
    try {
        const { data } = yield call(httpProvider.post, CITIES_URL, {data: postBusstop})
        console.log(data)
        yield put(postBusstopSuccess(data))
      } catch (error) {
        yield put(postBusstopError(error))
      }
  }

export default function* watcherPostBusstopAdmin() {
    yield takeEvery(POST_BUSSTOP, workerLoader)
}