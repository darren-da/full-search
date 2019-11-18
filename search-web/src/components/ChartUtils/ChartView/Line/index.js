import React, { Component } from 'react'
import echarts from 'echarts'
import lodash from 'lodash'
import * as DataUtils from '../../../../utils/DataUtils'

//线图
const lineOption = (data, dimsRow, dimsCol, mesu) => {

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
                type: 'line',
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

export default class Line extends Component {


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
        this.chart.setOption(lineOption(props.data, props.dimsRow, props.dimsCol, props.mesu));
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
