import React, { Component } from 'react'
import echarts from 'echarts'
import lodash from 'lodash'
import * as DataUtils from '../../../../utils/DataUtils'

const test_data = [{"year":"2015","area1":"果洛州","by_count":"5725"},{"year":"2016","area1":"果洛州","by_count":"6534"},{"year":"2015","area1":"海东市","by_count":"45584"},{"year":"2016","area1":"海东市","by_count":"46248"},{"year":"2015","area1":"海北州","by_count":"9768"},{"year":"2016","area1":"海北州","by_count":"9954"},{"year":"2015","area1":"海南州","by_count":"15867"},{"year":"2016","area1":"海南州","by_count":"15249"},{"year":"2015","area1":"海西州","by_count":"14918"},{"year":"2016","area1":"海西州","by_count":"14582"},{"year":"2015","area1":"玉树州","by_count":"11487"},{"year":"2016","area1":"玉树州","by_count":"12903"},{"year":"2015","area1":"西宁市","by_count":"64940"},{"year":"2016","area1":"西宁市","by_count":"65360"},{"year":"2015","area1":"黄南州","by_count":"9005"},{"year":"2016","area1":"黄南州","by_count":"9243"},{"year":"_合计","area1":"_合计","by_count":"357367"},{"year":"2015","area1":"_合计","by_count":"177294"},{"year":"2016","area1":"_合计","by_count":"180073"},{"year":"_合计","area1":"果洛州","by_count":"12259"},{"year":"_合计","area1":"海东市","by_count":"91832"},{"year":"_合计","area1":"海北州","by_count":"19722"},{"year":"_合计","area1":"海南州","by_count":"31116"},{"year":"_合计","area1":"海西州","by_count":"29500"},{"year":"_合计","area1":"玉树州","by_count":"24390"},{"year":"_合计","area1":"西宁市","by_count":"130300"},{"year":"_合计","area1":"黄南州","by_count":"18248"}]
const test_mesu = [{columnName:'by_count'}]
//柱状图
const barOption = (data, dimsRow, dimsCol, mesu) => {

    let xName = null;
    let yName = null;

    if (Array.isArray(dimsRow) && dimsRow.length == 1) {
        yName = dimsRow[0].columnName;
    }
    if (Array.isArray(dimsCol) && dimsCol.length == 1) {
        xName = dimsCol[0].columnName;
    }

    let _ser = [];
    let _xAxisData = [];
    for (let i = 0; i < mesu.length; i++) {
        let dataArray = DataUtils.jsonToArray(data, xName, yName, mesu[i].columnName);
        _xAxisData = dataArray[0].slice(1);
        for (let j=1; j < dataArray.length; j++) {
            _ser.push({
                type: 'bar',
                stack: mesu[i].columnName,
                name: dataArray[j][0]+'-'+mesu[i].memberName,
                data: dataArray[j].slice(1),
            })
        }
        
    }
    return {
        legend: {
            show: true,
            itemHeight: 20,
            itemWidth: 20,
            itemGap: 20,
        },
        xAxis: {
            type: 'category',
            data: _xAxisData,
            axisLabel: {
                interval: 0,
                rotate: 45,
                margin: 2
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            }
        },
        series: _ser
    }
};

export default class Bar extends Component {


    constructor(props) {
        super(props)
        this.chart = this.renderChart.bind(this)
    }

    componentDidMount() {
        this.chart = echarts.init(this.node); //初始化echarts
        this.renderChart(this.props)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!lodash.isEqual(this.props, nextProps)) {
            this.chart.resize();
            this.props = nextProps;
            this.renderChart(nextProps);
        }
    }

    renderChart(props) {
        this.chart.clear();
        this.chart.setOption(barOption(props.data, props.dimsRow, props.dimsCol, props.mesu));
    }



    render() {
        return (
            <div>
                <div>

                </div>
                <div ref={n => this.node = n} style={{ width: this.props.width || '100%', height: this.props.height || 500 }}>


                </div>
            </div>
        )
    }
}
