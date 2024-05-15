const initialState = {
    report: [],
    blockId: '',
    reportSuccess: null
}

const reportAdminReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_REPORT_SUCCESS':
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                report: list,
            }
        case 'DELETE_REPORT':
            const deleteReport = state.report.filter(item => item.blockId !== action.payload)
            return {
                ...state,
                blockId: action.payload,
                report: deleteReport
            }
        case 'DELETE_REPORT_SUCCESS':
            return {
                ...state,
                reportSuccess: 'OK',
            }

        default: 
        return state;  
    }
}
    
export default reportAdminReducer