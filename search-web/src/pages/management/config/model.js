import * as api from 'services/ApiUtils'
import { message } from 'antd'
import * as TreeUtils from '../../../utils/TreeUtils.js'

export default {

    namespace: 'item',

    state: {
        formLoading: false,
        formKey: new Date(),
        editFlag:true,
        editRecord: null,
        treeData: null,
        treeList: [],
        parent:null,
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            history.listen(location => {
                if (location.pathname === '/management/config') {
                    dispatch({
                        type: 'findTreeData'
                    })
                }
            })
        },
    },

    effects: {
        *findTreeData({ payload }, { call, put }) {
            const response = yield call(api.get, '/api/item/findTreeData', payload);
            if (response && response.result === "success")
                yield put({ type: 'saveState', payload: { treeList:response.data, treeData: TreeUtils.convertToTreeData(response.data) }});
        },
        *findItemByCode({ payload }, { call, put }){
            const response = yield call(api.get, '/api/item/findItemDetailByCode/' + payload.itemCode);
            if (response && response.result === "success")
                yield put({ type: 'setRecord', payload: { editRecord:response.data,editFlag:true} });
        },
        *saveOrUpdate({ payload }, { call, put }){
            const response = yield call(api.post, '/api/item/saveOrUpdate',payload.itemDto);
            if (response && response.result === "success"){
                message.success(response.text);
                yield put({ type: 'findTreeData', payload: {} });
            } else message.error(response.text);
        },
        *delete({ payload }, { call, put }){
            const response = yield call(api.get, '/api/item/delete/'+payload.code);
            if (response && response.result === "success") {
                message.success(response.text);
                yield put({ type: 'findTreeData', payload: {} });
            } else message.error(response.text);
        },
    },

    reducers: {
        saveState(state, action) {
            return { ...state,...action.payload}
        },
        setRecord(state, action) {
            return { ...state,...action.payload}
        }
    },

};