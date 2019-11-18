import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import MeasureItem from "./MeasureItem";
import DragTypes  from './DragTypes'

const update = require('immutability-helper')


const boxTarget = {
	drop(props, monitor, component) {
        component.addItem(monitor.getItem().data)
	},
}

@DropTarget(DragTypes.treeNodeMesu, boxTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class MeasureBox extends Component {

    state = {
        cards: []
    }

    addItem = (item) => {
        if(this.props.onAddBoxItem) this.props.onAddBoxItem(item, this.props.boxType)
    }

    moveCard = (dragIndex, hoverIndex) => {
        // console.log(1111)
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
            <div style={{border: '1px solid #e8e8e8', minHeight: 38, padding: 3 }} >
                {this.props.items.map((item, index) => 
                    <MeasureItem key={item.datasetId+item.columnName} index={index} boxType={this.props.boxType} 
                        data={item} moveCard={this.moveCard.bind(this)} />
                )}
            </div>
        )
    }
}
