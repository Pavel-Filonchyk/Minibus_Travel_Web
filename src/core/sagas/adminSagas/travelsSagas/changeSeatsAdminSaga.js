import { takeEvery, put, call, select } from 'redux-saga/effects'
import { CHANGE_SEATS, changeSeatsSuccess } from '../../../actions/restAdminTravelActions'
import httpProvider from '../../../../common/httpProvider'
import { travelUrl } from '../../../../common/api'

function* workerLoader() {
    const blockId = yield select(state => state.restAdminTravelReducer.blockIdSeats)
    const changeSeatsTravel = yield select(state => state.restAdminTravelReducer.changeSeatsTravel)
    try {
        const { data } = yield call(httpProvider.put, travelUrl(blockId), {data: changeSeatsTravel})
        
        yield put(changeSeatsSuccess(data))
      } catch (error) {
        yield put(console.log(error))
      }
  }

export default function* watcherChangeSeatsAdmin() {
  yield takeEvery(CHANGE_SEATS, workerLoader)
}