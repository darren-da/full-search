import React from 'react'
import {Tree} from 'antd'
const TreeNode = Tree.TreeNode;
const DirectoryTree = Tree.DirectoryTree;

const BaseTree = (props) => {

    const renderTreeNodes = (data) => {
        if(!data) return;
        return data.map((item) => {
          if (item.children) {
            return (
              <TreeNode title={item.name} key={item.id} dataRef={item} isLeaf={item.isLeaf} >
                {renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode title={item.name} key={item.id} isLeaf={item.isLeaf} />;
        });
    }

    const onSelect = (key, e) => {
        console.log(key, e)
    }

    return (
        <DirectoryTree onSelect={onSelect} autoExpandParent={false} >
            {renderTreeNodes(props.treeData)}
        </DirectoryTree>
    )
}

export default BaseTree