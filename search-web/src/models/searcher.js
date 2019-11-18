import * as api from 'services/ApiUtils'
import { message } from 'antd'

export default {

    namespace: 'searcher',

    state: {
        formLoading: false,
        results:[],
    },

    effects: {
        *search({ payload }, { call, put }) {
            const response = yield call(api.get, 'api/mutil_query_hit', payload);
            yield put({ type: 'saveState', payload: { results:response.list}});    
        }
    },

    reducers: {
        saveState(state, action) {
            return { ...state,...action.payload}
        }
    },

};