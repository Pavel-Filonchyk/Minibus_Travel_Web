import { takeEvery, put, call, select } from 'redux-saga/effects'
import { DELETE_TRAVEL, deleteTravelSuccess, deleteTravelError } from '../../actions/restAdminTravelActions'
import httpProvider from '../../../common/httpProvider'
import { travelUrl } from '../../../common/api'

function* workerLoader() {
    const deleteTravelData = yield select(state => state.restAdminReducer.deleteTravelData)
    const blockId = yield select(state => state.restAdminReducer.blockId)

    try {
        const { data } = yield call(httpProvider.put, travelUrl(blockId), {data: deleteTravelData})
    
        yield put(deleteTravelSuccess(data))
      } catch (error) {
        yield put(deleteTravelError(error))
      }
  }

export default function* watcherDeleteTravelAdmin() {
  yield takeEvery(DELETE_TRAVEL, workerLoader)
}