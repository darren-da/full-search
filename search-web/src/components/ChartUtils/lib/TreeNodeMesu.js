import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom'
import { Icon } from "antd";
import DragTypes  from './DragTypes'
import { Button } from "antd";

const itemSource = {
    beginDrag(props) {
		return {
			data: props.data,
			index: props.index,
		}
	},
}

@DragSource(DragTypes.treeNodeMesu, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
export default class TreeNodeMesu extends Component {
    render () {
        const {data, isDragging, connectDragSource, connectDropTarget,} = this.props

        const opacity = isDragging ? 0 : 1

        return connectDragSource && connectDragSource(
            <div style={{float: 'left', width: 150, height: 30, marginRight: 2, }} >
                <Icon type="calculator" /> {data.memberName || data.columnName}  
            </div>
        )
    }
}
