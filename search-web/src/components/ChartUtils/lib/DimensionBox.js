import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import DimensionItem from "./DimensionItem";
import DragTypes  from './DragTypes'
import { Col } from "antd";

const update = require('immutability-helper')


const boxTarget = {
	drop(props, monitor, component) {
        if(props.boxType &&  monitor.getItem().boxType && props.boxType !==  monitor.getItem().boxType){
            console.log('boxTarget', component)
            
            if(component.props.onRowColMoving ) 
                component.props.onRowColMoving(monitor.getItem().boxType, monitor.getItem().data, props.boxType);
            return ;
        }
        component.addItem(monitor.getItem().data)
	},
}

@DropTarget([DragTypes.treeNodeDims, DragTypes.dimension], boxTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class DimensionBox extends Component {

    state = {
        cards: []
    }

    addItem = (item) => {
        console.log('addItem ', item )
        if(this.props.onAddBoxItem) this.props.onAddBoxItem(item, this.props.boxType)
    }

    moveCard = (dragIndex, hoverIndex) => {
        // const { cards } = this.state
        // const dragCard = cards[dragIndex]
    
		// this.setState(
		// 	update(this.state, {
		// 		cards: {
		// 			$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
		// 		},
		// 	}),
        // )
        if(this.props.onItemSort) this.props.onItemSort(dragIndex, hoverIndex, this.props.boxType)
    }

    render () {
        const { canDrop, isOver, connectDropTarget } = this.props
  
        return connectDropTarget && connectDropTarget(
            <div style={{border: '1px solid #e8e8e8', padding: 3, minHeight: 38,  }} >
                {this.props.items.map((item, index) => 
                    <DimensionItem key={item.datasetId+item.columnName} 
                            index={index} boxType={this.props.boxType}
                            data={item} moveCard={this.moveCard} onMenuAction={this.props.onMenuAction} />
                )}
            </div>
        )
    }
}
