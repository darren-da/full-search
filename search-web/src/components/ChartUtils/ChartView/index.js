import React, { Component } from 'react';
import Table from './Table'
import Bar from './Bar'
import Pie from './Pie'
import Line from './Line'
import Dot from './Dot'

//test  data, dimsRow, dimsCol, mesu
// const data = testData();
// const dimsRow = [
//     {memberName: '地州', columnName: 'AREA1'},
//     {memberName: '区县', columnName: 'AREA2'},  
//     {memberName: '统计分类', columnName: 'TYPE1'},  
//     {memberName: '统计小类', columnName: 'TYPE2'},  
// ]
// const dimsCol = [
//     {memberName: '年份', columnName: 'YEAR'},
//     {memberName: '学校类别', columnName: 'SCHOOL_TYPE'},  
// ]
// const mesu = [{memberName: '数量', columnName: 'COUNT'}]


class ChartView extends Component {

    renderChartView = (chartType) => {
        switch (chartType) {
            case 'table':
                return (<Table data={this.props.data} dimsRow={this.props.dimsRow} dimsCol={this.props.dimsCol} mesu={this.props.mesu} />);
            case 'bar':
                return (<Bar data={this.props.data} dimsRow={this.props.dimsRow} dimsCol={this.props.dimsCol} mesu={this.props.mesu} />);
            case 'pie':
                return (<Pie data={this.props.data} dimsRow={this.props.dimsRow} dimsCol={this.props.dimsCol} mesu={this.props.mesu} />);
            case 'line':
                return (<Line data={this.props.data} dimsRow={this.props.dimsRow} dimsCol={this.props.dimsCol} mesu={this.props.mesu} />);
            case 'dot':
                return (<Dot data={this.props.data} dimsRow={this.props.dimsRow} dimsCol={this.props.dimsCol} mesu={this.props.mesu} />);
            default:
                return '请选择数据展示类型！';
        }

    }

    render() {
        return (
            <div style={{height: 'calc(100% - 250px)', overflow: 'auto'}} >
                {this.renderChartView(this.props.chartType)}
            </div>
        );
    }
}

export default ChartView;