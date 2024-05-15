import { takeEvery, put, call } from 'redux-saga/effects'
import { GET_REPORT, getReportSuccess } from '../../../actions/reportActions'
import httpProvider from '../../../../common/httpProvider'
import { REPORT_URL } from '../../../../common/api'

function* workerLoader() {
    try {
        const { data } = yield call(httpProvider.get, REPORT_URL)
    
        yield put(getReportSuccess(data))
      } catch (error) {
        yield put(console.log(error))
      }
  }

export default function* watcherGetReport() {
  yield takeEvery(GET_REPORT, workerLoader)
}
  