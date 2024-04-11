import { takeEvery, put, call, select } from 'redux-saga/effects'
import { DELETE_USER, deleteUserSuccess, deleteUserError } from '../actions/canselTravelActions'
import httpProvider from '../../common/httpProvider'
import { travelUrl } from '../../common/api'

function* workerLoader() {
    const deleteUserData = yield select(state => state.restUserReducer.deleteUserData)
    const blockId = yield select(state => state.restUserReducer.blockId)

    try {
        const { data } = yield call(httpProvider.put, travelUrl(blockId), {data: deleteUserData})
    
        yield put(deleteUserSuccess(data))
      } catch (error) {
        yield put(deleteUserError(error))
      }
  }

export default function* watcherDeleteUser() {
  yield takeEvery(DELETE_USER, workerLoader)
}