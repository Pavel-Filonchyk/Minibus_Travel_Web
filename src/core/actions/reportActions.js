export const getReport = (data) => {
    return {
        type: 'GET_REPORT',
        payload: data 
    } 
}
export const GET_REPORT = 'GET_REPORT'

export const getReportSuccess = (data) => {
    return {
        type: 'GET_REPORT_SUCCESS',
        payload: data 
    } 
}

export const deleteReport = (data) => {
    return {
        type: 'DELETE_REPORT',
        payload: data 
    } 
}
export const DELETE_REPORT = 'DELETE_REPORT'

export const deleteReportSuccess = (data) => {
    return {
        type: 'DELETE_REPORT_SUCCESS',
        payload: data 
    } 
}