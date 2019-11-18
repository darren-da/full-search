import React, { Component } from 'react'
import { Tag, Icon, Tooltip ,Button} from 'antd';
import styles from './index.less'
import ChartItem from './ChartItem'

import tbicon from 'assets/chart-table.svg'
import baricon from 'assets/chart-bar.svg'

class ChartTypeBar extends Component {

    state = {
        iconStyle : {
            fontSize: 20,
            marginRight:10
        },
    }

    render() {
        return (
            <div >
                <Tooltip placement="top" title="表格">
                    <Button icon={'table'} type={'table' === this.props.selected?'primary':'default'} onClick={() => this.props.onChange('table')} style={this.state.iconStyle}/>
                </Tooltip>
                <Tooltip placement="top" title='柱状图'>
                    <Button icon={'bar-chart'} type={'bar' === this.props.selected?'primary':'default'} onClick={() => this.props.onChange('bar')} style={this.state.iconStyle}/>
                </Tooltip>
                <Tooltip placement="top" title='饼状图'>
                    <Button icon={'pie-chart'} type={'pie' === this.props.selected?'primary':'default'} onClick={() => this.props.onChange('pie')} style={this.state.iconStyle}/>
                </Tooltip>
                <Tooltip placement="top" title='线状图'>
                    <Button icon={'line-chart'} type={'line' === this.props.selected?'primary':'default'} onClick={() => this.props.onChange('line')} style={this.state.iconStyle}/>
                </Tooltip>
                <Tooltip placement="top" title='散点图'>
                    <Button icon={'dot-chart'} type={'dot' === this.props.selected?'primary':'default'} onClick={() => this.props.onChange('dot')} style={this.state.iconStyle}/>
                </Tooltip>
            </div>
        )
    }
}

export default ChartTypeBar