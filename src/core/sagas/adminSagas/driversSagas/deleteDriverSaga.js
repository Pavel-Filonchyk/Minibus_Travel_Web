import { takeEvery, put, call, select } from 'redux-saga/effects'
import {DELETE_DRIVER , deleteDriverSuccess, deleteDriverError } from '../../../actions/restAdminDriverActions'
import httpProvider from '../../../../common/httpProvider'
import { driversUrl } from '../../../../common/api'

function* workerLoader() {
    const blockId = yield select(state => state.restAdminDriverReducer.blockId)

    try {
      const { data } = yield call(httpProvider.delete, driversUrl(blockId))
  
      yield put(deleteDriverSuccess(data))
    } catch (error) {
      yield put(deleteDriverError(error))
    }
  }

export default function* watcherDeleteDriverAdmin() {
  yield takeEvery(DELETE_DRIVER, workerLoader)
}