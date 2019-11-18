import React, { Component } from 'react'
import echarts from 'echarts'
import lodash from 'lodash'
import * as DataUtils from '../../../../utils/DataUtils'
//饼状图
const pieOption = (data, dimsRow, dimsCol, mesu) => {

    let xName = null;
    let yName = null;

    if (Array.isArray(dimsRow) && dimsRow.length == 1) {
        yName = dimsRow[0].columnName;
    }
    if (Array.isArray(dimsCol) && dimsCol.length == 1) {
        xName = dimsCol[0].columnName;
    }

    let _ser = [];
    for (let i = 0; i < mesu.length; i++) {
        let dataArray = DataUtils.jsonToArray(data, xName, yName, mesu[i].columnName);
        for (let j=1; j < dataArray.length; j++) {
            _ser.push({
                type: 'pie',
                name: dataArray[j][0]+'-'+mesu[i].memberName,
                data: dataArray[j].slice(1),
                label: {
                    show: true,
                    formatter: '{b}\n({d}%)',
                },
                radius: '50%',
                center: ['50%', '50%'],
            })
        }
        
    }

    return {
        legend: {
            show: true,
            itemHeight: 20,
            itemWidth: 20,
            itemGap: 20,
            textStyle: {
                color: '#ccc',
                fontSize: 12,
                fontWeight: 'bold'
            }
        },
        series: _ser
    }
};

export default class Pie extends Component {


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
        this.chart.setOption(pieOption(props.data, props.dimsRow, props.dimsCol, props.mesu));
    }



    render() {
        return (
            <div>
                <div>

                </div>
                <div ref={n => this.node = n} style={{ width: this.props.width || 1000, height: this.props.height || 500 }}>


                </div>
            </div>
        )
    }
}
