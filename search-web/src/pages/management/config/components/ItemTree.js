import React, { Component } from 'react';
import { connect } from 'dva';
import { message } from 'antd'
import { Card, Tree, Input, Button, Icon } from 'antd';


const { TreeNode } = Tree;
const { Search } = Input;
const ButtonGroup = Button.Group;

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class ItemTree extends Component {

  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    hoverId: ''
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = e => {
    const { value } = e.target;
    const expandedKeys = this.props.item.treeList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, this.props.item.treeData);
        }
        return null;
      })
      .filter((item, i, self) => {
        return item && self.indexOf(item) === i
      });
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  onSelect = (key, e) => {
    console.log('select',this.props.item)
    this.props.dispatch({ type: 'item/findItemByCode', payload: { itemCode: key[0]} });
  }

  onMouseOver = (e, treeData) => {
    this.setState({
      hoverId: treeData.key
    })
  }

  addItem = () => {
    if(!this.props.item.editRecord){
      message.warning('请选择父节点');
      return;
    }
    this.props.dispatch({ type: 'item/saveState', payload: { 
        parent:{
          parentCode : this.props.item.editRecord.code,
          parentName : this.props.item.editRecord.name
        },
        editFlag:false,
        formKey:new Date(),
      } 
    });
  }
  
  deleteItem = () => {
    if(!this.props.item.editRecord){
      message.warning('请选择要删除的节点');
      return;
    }
    let code = this.props.item.editRecord.code;
    if(code == '01'){
      message.warning('根节点不允许删除');
      return;
    }
    this.props.dispatch({ type: 'item/delete', payload: { code: code } })
  }

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data => {
      if (!data) return;
      return data.map(treeData => {
        const index = treeData.title.indexOf(searchValue);
        const beforeStr = treeData.title.substr(0, index);
        const afterStr = treeData.title.substr(index + searchValue.length);
        const buttonGroup = this.state.hoverId === treeData.key ? (
          <ButtonGroup>
            <Button type="link" shape='circle' size='small' icon="plus-circle" />
            <Button type="link" shape='circle' size='small' icon="delete" />
          </ButtonGroup>
        ) : ''
        const title =
          index > -1 ? (
            <div onMouseOver={(e) => this.onMouseOver(e, treeData)}>
              <span>
                {beforeStr}
                <span style={{ color: '#f50' }}>{searchValue}</span>
                {afterStr}
              </span>
              {/* {buttonGroup} */}

            </div>

          ) : (
              <div onMouseOver={(e) => this.onMouseOver(e, treeData)}>
                <span>{treeData.title}</span>
                {/* {buttonGroup} */}
              </div>
            );
        if (treeData.children) {
          return (
            <TreeNode key={treeData.key} title={title}>
              {loop(treeData.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={treeData.key} title={title} />;
      });
    }

    return (
      <Card style={{ height: 450, overflow: 'auto' }} 
            actions={[
              <Icon type="plus-circle" key="plus-circle" onClick={this.addItem}/>,
              <Icon type="delete" key="delete" onClick={this.deleteItem}/>,
            ]}
      >
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree style={{ height: 310, overflow: 'auto' }}
          onSelect={this.onSelect}
          autoExpandParent={autoExpandParent}
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
        >
          {loop(this.props.item.treeData)}
        </Tree>
      </Card>
    )

  }
}

export default connect(state => {
  return {
    item: state.item
  }
})(ItemTree)