import { all } from 'redux-saga/effects'

import watcherGetDirections from './userSagas/getDirectionsSaga'
import watcherGetCities from './userSagas/getCitiesSaga'
import watcherGetTravels from './userSagas/getTravelsSaga'
import watcherPostUser from './userSagas/postUserSaga'
import watcherGetUser from './userSagas/getUserSaga'
import watcherDeleteUser from './userSagas/deleteUserSaga'
import watcherGetTravelsAdmin from './adminSagas/travelsSagas/getTravelsAdminSaga'
import watcherDeleteTravelAdmin from './adminSagas/travelsSagas/deleteTravelAdminSaga'
import watcherPostTravelAdmin from './adminSagas/travelsSagas/postTravelAdminSaga'
import watcherPostDirectionAdmin from './adminSagas/directionsSagas/postDirectionSaga'
import watcherGetDirectionsAdmin from './adminSagas/directionsSagas/getDirectionsSaga'
import watcherDeleteDirectionAdmin from './adminSagas/directionsSagas/deleteDirectionSaga'
import watcherPostBusstopAdmin from './adminSagas/busstopsSagas/postBusstopAdminSaga'
import watcherGetBusstopsAdmin from './adminSagas/busstopsSagas/getBusstopsAdminSaga'
import watcherDeleteBusstopAdmin from './adminSagas/busstopsSagas/deleteBusstopAdminSaga'
import watcherPostCostAdmin from './adminSagas/costsSagas/postCostAdminSaga'
import watcherGetCostsAdmin from './adminSagas/costsSagas/getCostsAdminSaga'
import watcherDeleteCostAdmin from './adminSagas/costsSagas/deleteCostAdminSaga'

export default function* rootSaga() {
    yield all([
        watcherGetDirections(),
        watcherGetCities(),
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
        watcherDeleteCostAdmin(),
        watcherPostDirectionAdmin(),
        watcherGetDirectionsAdmin(),
        watcherDeleteDirectionAdmin()
    ])
}