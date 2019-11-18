import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Icon, Button, Popconfirm, Row, Col ,Input, Form ,Tabs} from "antd";
import { Tree } from 'antd';
import ItemForm from './components/ItemForm'
import ItemTree from './components/ItemTree';

const { TextArea } = Input;
const TabPane = Tabs.TabPane;

const FormItem = Form.Item;

const { Search } = Input;
const { TreeNode } = Tree;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

class ItemMgr extends Component{
      render() {
        return (
            <div>
                <Card title="分理项管理" >
                    <Row gutter={16}>
                        <Col span={6} className='gutter-row'>
                            <ItemTree/>
                        </Col>
                        <Col span={18} className='gutter-row'>
                            <ItemForm key={this.props.item.formKey} addFlag={this.props.item.addFlag}/>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
      }
}

export default connect(state => {
    return {
        item:state.item
    }
})(ItemMgr)