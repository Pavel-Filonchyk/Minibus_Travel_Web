import { takeEvery, put, call, select } from 'redux-saga/effects'
import { POST_COST, postCostSuccess, postCostError } from '../../actions/restAdminCostsActions'
import httpProvider from '../../../common/httpProvider'
import { COSTS_URL } from '../../../common/api'

function* workerLoader() {
    const postCost = yield select(state => state.restAdminCostsReducer.postCost)

    try {
        const { data } = yield call(httpProvider.post, COSTS_URL, {data: postCost})
    
        yield put(postCostSuccess(data))
      } catch (error) {
        yield put(postCostError(error))
      }
  }

export default function* watcherPostCostAdmin() {
    yield takeEvery(POST_COST, workerLoader)
}