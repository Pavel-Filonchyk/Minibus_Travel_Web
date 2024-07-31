import { takeEvery, put, call, select } from 'redux-saga/effects'
import {DELETE_COST , deleteCostSuccess, deleteCostError } from '../../../actions/restAdminCostsActions'
import httpProvider from '../../../../common/httpProvider'
import { costsUrl } from '../../../../common/api'

function* workerLoader() {
    const blockId = yield select(state => state.restAdminCostsReducer.blockId)
    const token = yield select(state => state.getTravelsReducer.token)
    try {
      const { data } = yield call(httpProvider.delete, costsUrl(blockId, token))
  
      yield put(deleteCostSuccess(data))
    } catch (error) {
      yield put(deleteCostError(error))
    }
  }

export default function* watcherDeleteCostAdmin() {
  yield takeEvery(DELETE_COST, workerLoader)
}