import { all } from 'redux-saga/effects'

import watcherGetTravels from './getTravelsSaga'
import watcherPostUser from './postUserSaga'
import watcherGetUser from './getUserSaga'
import watcherDeleteUser from './deleteUserSaga'

export default function* rootSaga() {
    yield all([watcherGetTravels(), watcherPostUser(), watcherGetUser(), watcherDeleteUser()])
}