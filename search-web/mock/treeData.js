import mockjs from 'mockjs';

export default {
    'GET /users':{
        name: 'momo.zxy',
        sex: '男',
        userid: '00000001',
        notifyCount: 12,
    },
    // 使用 mockjs 等三方库
    'GET /tags': mockjs.mock({
        'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
    }) ,

    'GET /item/findItemDetailByCode':{
        result:'success',
        data:{
            parentName:'父节点',
            code:'0101',
            name:'节点1',
            keyword:'java,paython',
            timeLimit:10,
            description:'testtest'
        }
    },

    'GET /item/findAll' :{ 
        result:'success',
        data:[
            {
                key : '01',
                title : 'node01',
                isLeaf: false,
                children: [{
                    key : '0101',
                    title : 'node0101',
                    isLeaf: true,
                    children: null,
                },
                {
                    key : '0102',
                    parentKey: '01',
                    title : 'node0102',
                    isLeaf: true,
                    children: null,
                }],
            },
            {
                key : '02',
                title : 'node02',
                isLeaf: true,
                children: null,
            },
        ]
    },

    'GET /item/findTreeDataList' :{ 
        result:'success',
        data:[
            {
                key : '01',
                parentKey:'0',
                title : 'node01'
            },
            {
                key : '02',
                parentKey:'0',
                title : 'node02'
            },
            {
                key : '0101',
                parentKey:'01',
                title : 'node0101'
            },
            {
                key : '0102',
                parentKey:'01',
                title : 'node0102'
            },
            {
                key : '0201',
                parentKey:'02',
                title : 'node0201'
            },
            {
                key : '020101',
                parentKey:'0201',
                title : 'node0201'
            },
        ]
    },

    'GET /search' :{
        totalCount: 3,
        pageSize: 2,
        pageNo: 1,
        filterNo: 0,
        list: [{
            highlight: {
                description: "<span style='color:red'>停水</span>，处理单位：水务局，时限：2小时",
                title: "<span style='color:red'>停水</span>"
            },
            source: {
                createTime: 1573918152943,
                businessId: "1",
                description: "停水，处理单位：水务局，时限：2小时",
                id: null,
                type: "3",
                title: "停水"
            }
        }, {
            highlight: {
                description: "天山区<span style='color:red'>停水</span>，天山区 红旗路 泰隆社区附加大面积<span style='color:red'>停水</span>，举报人：张三，联系电话：18811111111，日期：2019-10-01 16:00:00",
                title: "天山区<span style='color:red'>停水</span>"
            },
            source: {
                createTime: 1573918121286,
                businessId: "1",
                description: "天山区停水，天山区 红旗路 泰隆社区附加大面积停水，举报人：张三，联系电话：18811111111，日期：2019-10-01 16:00:00",
                id: null,
                type: "1",
                title: "天山区停水"
            }
        }],
        firstResult: 0,
        firstPage: true,
        totalPage: 2,
        lastPage: false,
        nextPage: 2,
        prePage: 1
    }
    
    
}