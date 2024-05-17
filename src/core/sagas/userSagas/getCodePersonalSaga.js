import { takeEvery, put, call, select } from 'redux-saga/effects'
import { SEND_CODE_PERSONAL, sendCodePersonalSuccess, sendCodePersonalError } from '../../actions/authActions'
import httpProvider from '../../../common/httpProvider'
import { AUTH_URL } from '../../../common/api'

function* workerLoader() {
    const token = 'eee5c109f44cc564cddcb00732f0834a'
    const alphaname_id = '5074'
    const phoneNumber = yield select(state => state.authReducer.phoneNumber)
    const sendCodePersonal = yield select(state => state.authReducer.sendCodePersonal)

    try {
      const { data } = yield call(httpProvider.post, AUTH_URL, {
        data: {
          token, 
          alphaname_id,
          phone: phoneNumber,
          message: sendCodePersonal
        }
      })
      yield put(sendCodePersonalSuccess(data))
    } catch (error) {
      yield put(sendCodePersonalError(error))
    }
  }

export default function* watcherGetCodePersonal() {
  yield takeEvery(SEND_CODE_PERSONAL, workerLoader)
}