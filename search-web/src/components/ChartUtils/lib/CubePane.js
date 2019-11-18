import React, { Component } from 'react'
import { Tree, Card ,Select, Icon} from 'antd';
import TreeNodeDims from './TreeNodeDims'
import TreeNodeMesu from './TreeNodeMesu'
import lodash from 'lodash'
import * as ApiUtils from 'services/ApiUtils'
import { DragSource, DropTarget } from 'react-dnd';
import DragTypes  from './DragTypes'

const TreeNode = Tree.TreeNode;
const {Option} = Select;

const boxTarget = {
	drop(props, monitor, component) {
        if(component.props.onItemRemove ) 
            component.props.onItemRemove(monitor.getItem().boxType, monitor.getItem().data);
	},
}

@DropTarget([DragTypes.measure, DragTypes.dimension], boxTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
}))
class CubeTree extends Component {

    state = {
        datasets: [],
        list: [],
        publicDimensions: [],
        selectDisabled:{ disabled:false,loading:false }
      }
  
    componentDidMount(){
        ApiUtils.get('/api/config/datapackage/findList').then(res => {
            if(res && res.result == 'success'){
                this.setState({list: res.data }, () => {
                    if(this.props.pkgId){
                        this.onPkgdataChange(this.props.pkgId)
                    }
                });  
                
            }
        })
    }

    onPkgdataChange = (value) => {
        this.setState({selectDisabled:{ disabled:true,loading:true }})
        ApiUtils.get('/api/config/datapackage/findOneCascade/'+value).then(res => {
            if(res && res.result == 'success'){
                let datasets = lodash.get(res, 'data.datasets', [])

                let publicDimensions = []
                datasets.forEach(ds => {
                    let members = ds.members
                    members.forEach(member => {
                        if(member.publicDimensionId != null && lodash.findIndex(publicDimensions, {publicDimensionId: member.publicDimensionId}) == -1){
                            publicDimensions.push(member)
                        }
                    })
                });
                
                this.setState({datasets: datasets, publicDimensions: publicDimensions });  

                if(this.props.onPkgChange) this.props.onPkgChange(value)
            }
            this.setState({selectDisabled:{ disabled:false,loading:false }})
        })
    }
  
    renderMembers = (member) => {
        // console.log('member render: ' , member)
        if(member.publicDimensionId != null) 
            return (<div style={{float: 'left', width: 150, height: 30, marginRight: 2, color: '#b7a4a4' }} >
                    <Icon type="stop" /> {member.memberName || member.columnName}  
                </div>)
        else if(member.memberType == 1) 
            return <TreeNodeDims key={member.id} data={member} />
        else if(member.memberType == 2)
            return <TreeNodeMesu key={member.id} data={member} />
        else 
            return null
    }

    render () {
        const { canDrop, isOver, connectDropTarget } = this.props;
        // const activeBorder = canDrop ? '1px solid red' : '0px'
        return connectDropTarget && connectDropTarget(
            <div >
                <Card title="数据资源" type="inner" extra={<a href="#"><Icon type="reload" /> </a>} bodyStyle={{padding: 16, }} style={{minHeight: 800}} >
                    <Select style={{ width: 120 }} onChange={this.onPkgdataChange} style={{width: '100%'}} 
                            value={this.props.pkgId}
                            loading={this.state.selectDisabled.disabled} disabled={this.state.selectDisabled.loading}>
                        {this.state.list.map((item, index) => 
                            <Option key={index} value={item.id}>{item.name}</Option>
                        )}
                    </Select>
                    
                    {this.state.publicDimensions.length>0 &&
                        <Tree  defaultExpandAll >
                            <TreeNode title={ <h4>公共维度</h4>} key="publicDimensionsNode" >
                                {this.state.publicDimensions.map(item =>
                                    <TreeNode  key={item.id} title={<TreeNodeDims key={item.id} data={item} />}  />
                                )}
                            </TreeNode>
                        </Tree>
                    }

                    {this.state.datasets.length>0 &&
                        <Tree  defaultExpandAll >
                            {this.state.datasets.map((ds, index) =>{
                                const members = lodash.get(ds, 'members', [])
                                return <TreeNode title={ <h4> {ds.dataset.name}</h4>} key={ds.dataset.id} >
                                            {members.map((member, index2) => 
                                                <TreeNode  key={member.id} title={this.renderMembers(member)}  />
                                            )}
                        
                                        </TreeNode>
                            })}
                        </Tree>
                    }
                    </Card>
                </div>
        )
    }
}

export default CubeTree