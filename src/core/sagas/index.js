import { all } from 'redux-saga/effects'

import watcherGetDirections from './userSagas/getDirectionsSaga'
import watcherGetCities from './userSagas/getCitiesSaga'
import watcherGetTravels from './userSagas/getTravelsSaga'
import watcherPostUser from './userSagas/postUserSaga'
import watcherGetUser from './userSagas/getUserSaga'
import watcherDeleteUser from './userSagas/deleteUserSaga'
import watcherPostQueue from './userSagas/postQueueSaga'
import watcherGetQueue from './userSagas/getQueueSaga'
import watcherDeleteQueue from './userSagas/deleteQueueSaga'

import watcherDeleteQueueAdmin from './adminSagas/travelsSagas/deleteQueueAdminSaga'
import watcherGetTravelsAdmin from './adminSagas/travelsSagas/getTravelsAdminSaga'
import watcherDeleteTravelAdmin from './adminSagas/travelsSagas/deleteTravelAdminSaga'
import watcherDeletePersonAdmin from './adminSagas/travelsSagas/deletePersonAdminSaga'
import watcherPostTravelAdmin from './adminSagas/travelsSagas/postTravelAdminSaga'
import watcherChangeSeatsAdmin from './adminSagas/travelsSagas/changeSeatsAdminSaga'
import watcherGetQueuesAdmin from './adminSagas/travelsSagas/getQueuesAdminSaga'
import watcherPostDirectionAdmin from './adminSagas/directionsSagas/postDirectionSaga'
import watcherGetDirectionsAdmin from './adminSagas/directionsSagas/getDirectionsSaga'
import watcherDeleteDirectionAdmin from './adminSagas/directionsSagas/deleteDirectionSaga'
import watcherPostBusstopAdmin from './adminSagas/busstopsSagas/postBusstopAdminSaga'
import watcherGetBusstopsAdmin from './adminSagas/busstopsSagas/getBusstopsAdminSaga'
import watcherDeleteBusstopAdmin from './adminSagas/busstopsSagas/deleteBusstopAdminSaga'
import watcherPostCostAdmin from './adminSagas/costsSagas/postCostAdminSaga'
import watcherGetCostsAdmin from './adminSagas/costsSagas/getCostsAdminSaga'
import watcherDeleteCostAdmin from './adminSagas/costsSagas/deleteCostAdminSaga'
import watcherGetReport from './adminSagas/reportSagas/getReportSaga'
import watcherDeleteReport from './adminSagas/reportSagas/deleteReportSaga'
import watcherGetDriversAdmin from './adminSagas/driversSagas/getDriversSaga'
import watcherPostDriverAdmin from './adminSagas/driversSagas/postDriverSaga'
import watcherDeleteDriverAdmin from './adminSagas/driversSagas/deleteDriverSaga'

import watcherGetCodeSaga from './userSagas/getCodeSaga'
import watcherGetCodePersonal from './userSagas/getCodePersonalSaga.js'
import watcherPostMessage from './userSagas/postMessageSaga'

export default function* rootSaga() {
    yield all([
        watcherGetDirections(),
        watcherGetCities(),
        watcherGetTravels(), 
        watcherPostUser(), 
        watcherGetUser(), 
        watcherDeleteUser(),
        watcherPostQueue(),
        watcherGetQueue(),
        watcherDeleteQueue(),

        watcherGetTravelsAdmin(),
        watcherDeleteTravelAdmin(),
        watcherChangeSeatsAdmin(),
        watcherDeletePersonAdmin(),
        watcherPostTravelAdmin(),
        watcherGetQueuesAdmin(),
        watcherDeleteQueueAdmin(),
        watcherPostBusstopAdmin(),
        watcherGetBusstopsAdmin(),
        watcherDeleteBusstopAdmin(),
        watcherPostCostAdmin(),
        watcherGetCostsAdmin(),
        watcherDeleteCostAdmin(),
        watcherPostDirectionAdmin(),
        watcherGetDirectionsAdmin(),
        watcherDeleteDirectionAdmin(),
        watcherGetReport(),
        watcherDeleteReport(),
        watcherGetDriversAdmin(),
        watcherPostDriverAdmin(),
        watcherDeleteDriverAdmin(),

        watcherGetCodeSaga(),
        watcherGetCodePersonal(),
        watcherPostMessage()
    ])
}