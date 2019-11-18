import React, { Component } from 'react'
import styles from './index.less'
import { Icon,Button } from 'antd';



export default class ChartItem extends Component {

    state = {
        iconStyle : {
            fontSize: 20,
            marginRight:10
        },
    }



  render() {
    return (
        <Button icon={this.props.icon} type={this.props.checked?'primary':'default'} onClick={this.props.onClick} style={this.state.iconStyle}/>
    )
  }
}