import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom'
import DragTypes  from './DragTypes'
import { Popover ,  Icon, Divider } from "antd";

const itemSource = {
    beginDrag(props) {
		return {
            data: props.data,
            boxType: props.boxType,
			index: props.index,
		}
	},
}

const fontColor = {
    color:'#777777'
}

const itemTarget = {
    hover: (props, monitor, component) => {
        if (!component) return null;
        if(monitor.getItem().boxType !== props.boxType) return;
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index
        // Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode( component ).getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientX = clientOffset.x - hoverBoundingRect.left
        
        // Dragging downwards
		if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
            // console.log('Dragging downwards')
			return
        }
        // Dragging upwards
		if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
            // console.log('Dragging upwards')
			return
		}

        // Time to actually perform the action
        if(props.moveCard)
		    props.moveCard(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
        
    }
}

@DropTarget(DragTypes.measure, itemTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(DragTypes.measure, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
export default class MeasureItem extends Component {

    handleMenuClick = () => {

    }

    render () {
        const {data, isDragging, connectDragSource, connectDropTarget,} = this.props

        const opacity = isDragging ? 0 : 1;

        return connectDragSource && connectDropTarget  &&  connectDragSource(connectDropTarget(
            <div style={{display: 'inline-block', width: 150, height: 26, margin: 2, opacity:opacity }} className={'ant-tag ant-tag-volcano'} >
                <div style={{marginLeft:'2px', ...fontColor, lineHeight:'24px',height:'24px'}} >{data.memberName}      
                <div style={{float: 'right'}} >
                    <Popover content={
                            <div  >
                                <div>
                                    <Icon type="setting" /> 
                                    <Divider type="vertical" />
                                    <a style={fontColor}>聚合</a>
                                </div>
                            </div>
                        } placement="bottomRight" trigger="click" >
                        <a style={{fontSize: 13}} >
                            <Icon type="bars" /> 
                        </a>
                    </Popover>
                </div>
                </div>
            </div>
        ))
    }
}
