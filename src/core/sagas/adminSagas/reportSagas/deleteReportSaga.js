import { takeEvery, put, call, select } from 'redux-saga/effects'
import {DELETE_REPORT , deleteReportSuccess } from '../../../actions/reportActions'
import httpProvider from '../../../../common/httpProvider'
import { reportUrl } from '../../../../common/api'

function* workerLoader() {
    const blockId = yield select(state => state.reportAdminReducer.blockId)

    try {
      const { data } = yield call(httpProvider.delete, reportUrl(blockId))
  
      yield put(deleteReportSuccess(data))
    } catch (error) {
      yield put(console.log(error))
    }
  }

export default function* watcherDeleteReport() {
  yield takeEvery(DELETE_REPORT, workerLoader)
}