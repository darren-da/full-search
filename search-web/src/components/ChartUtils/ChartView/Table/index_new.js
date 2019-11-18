import React, { Component } from 'react'
import lodash from 'lodash'

const test_data = [{ "year": "2015", "area1": "果洛州", "count": "55" }, { "year": "2016", "area1": "果洛州", "count": "54" }, { "year": "2015", "area1": "海东市", "count": "373" }, { "year": "2016", "area1": "海东市", "count": "297" }, { "year": "2015", "area1": "海北州", "count": "31" }, { "year": "2016", "area1": "海北州", "count": "31" }, { "year": "2015", "area1": "海南州", "count": "54" }, { "year": "2016", "area1": "海南州", "count": "54" }, { "year": "2015", "area1": "海西州", "count": "54" }, { "year": "2016", "area1": "海西州", "count": "37" }, { "year": "2015", "area1": "玉树州", "count": "114" }, { "year": "2016", "area1": "玉树州", "count": "113" }, { "year": "2015", "area1": "西宁市", "count": "160" }, { "year": "2016", "area1": "西宁市", "count": "151" }, { "year": "2015", "area1": "黄南州", "count": "145" }, { "year": "2016", "area1": "黄南州", "count": "147" }]
const test_mesu = [{ columnName: 'by_count' }]
const test_dimCol = [{ columnName: 'year' }, { columnName: 'area1' }]
export default class DataTable extends Component {

    fondNextGroup(){

    }

    componentDidMount() {
        let _data = test_data//this.props.data;
        let _dimsRow = null//this.props.dimsRow;
        let _dimsCol = test_dimCol//this.props.dimsCol;
        let _mesu = test_mesu//this.props.mesu;

        let _gourpHeaders = {};
        // let cName = _dimsCol[0].columnName;
        // let _group = lodash.groupBy(_data, function(item){ return item[cName] }) ;
        // _gourpHeaders.push(_group);

        let _headers = [];

        for (let i = 0; i < _dimsCol.length; i++) {
            let cName = _dimsCol[i].columnName;
            let _group = lodash.groupBy(_data, function (item) { return item[cName] });
            let keys = Object.keys(_group);
            for (let j = 0; j < keys.length; j++) {
                let wantGroup = _group[keys[j]];
                let _group1 = lodash.groupBy(wantGroup, function (item) { return item[cName] });
                _headers.push({name:_gourpHeaders[keys[j]], rowSpan: Object.keys(_group1).length});
            }
            let _group = lodash.groupBy(_data, function (item) { return item[cName] });
            _gourpHeaders = _group;
        }


        console.log('_gourpHeaders:', _gourpHeaders);

    }




    render() {
        return (
            <div>
                <table style={{ width: '100%', textAlign: 'center', }} border="1" >
                    <thead>

                    </thead>
                    <tbody  >

                    </tbody>
                </table>
            </div>
        )
    }
}