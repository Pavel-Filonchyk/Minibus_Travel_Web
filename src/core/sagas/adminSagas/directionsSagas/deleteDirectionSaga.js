import { takeEvery, put, call, select } from 'redux-saga/effects'
import {DELETE_DIRECTION , deleteDirectionSuccess } from '../../../actions/restAdminTravelActions'
import httpProvider from '../../../../common/httpProvider'
import { directionsUrl } from '../../../../common/api'

function* workerLoader() {
    const blockId = yield select(state => state.restAdminTravelReducer.blockIdDirection)

    try {
      const { data } = yield call(httpProvider.delete, directionsUrl(blockId))
  
      yield put(deleteDirectionSuccess(data))
    } catch (error) {
      yield put(console.log(error))
    }
  }

export default function* watcherDeleteDirectionAdmin() {
  yield takeEvery(DELETE_DIRECTION, workerLoader)
}