import { all } from 'redux-saga/effects'

import watcherGetTravels from './getTravelsSaga'
import watcherPostUser from './postUserSaga'

export default function* rootSaga() {
    yield all([watcherGetTravels(), watcherPostUser()])
}