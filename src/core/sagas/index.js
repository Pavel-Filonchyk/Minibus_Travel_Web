import { all } from 'redux-saga/effects'

import watcherGetTravels from './userSagas/getTravelsSaga'
import watcherPostUser from './userSagas/postUserSaga'
import watcherGetUser from './userSagas/getUserSaga'
import watcherDeleteUser from './userSagas/deleteUserSaga'
import watcherGetTravelsAdmin from './adminSagas/getTravelsAdminSaga'
import watcherDeleteTravelAdmin from './adminSagas/deleteTravelAdminSaga'
import watcherPostTravelAdmin from './adminSagas/postTravelAdminSaga'
import watcherPostBusstopAdmin from './adminSagas/postBusstopAdminSaga'
import watcherGetBusstopsAdmin from './adminSagas/getBusstopsAdminSaga'
import watcherDeleteBusstopAdmin from './adminSagas/deleteBusstopAdminSaga'
import watcherPostCostAdmin from './adminSagas/postCostAdminSaga'
import watcherGetCostsAdmin from './adminSagas/getCostsAdminSaga'
import watcherDeleteCostAdmin from './adminSagas/deleteCostAdminSaga'

export default function* rootSaga() {
    yield all([
        watcherGetTravels(), 
        watcherPostUser(), 
        watcherGetUser(), 
        watcherDeleteUser(),
        watcherGetTravelsAdmin(),
        watcherDeleteTravelAdmin(),
        watcherPostTravelAdmin(),
        watcherPostBusstopAdmin(),
        watcherGetBusstopsAdmin(),
        watcherDeleteBusstopAdmin(),
        watcherPostCostAdmin(),
        watcherGetCostsAdmin(),
        watcherDeleteCostAdmin()
    ])
}