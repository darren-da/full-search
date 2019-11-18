import React, { Component, Fragment } from 'react'
import {Modal, Table, Divider, Icon, Select, Input, Button} from 'antd'
import lodash from 'lodash';
const {Column} = Table; 
const Option = Select.Option;


const oprations = {
  '1': '等于',
  '2': '不等于',
  '3': '大于',
  '4': '大于等于',
  '5': '小于',
  '6': '小于等于',
}

export default class FilterPanel extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: lodash.get(this.props, 'dimension.filters', []),
      editIndex: -1,
      editObj: null
    }
  }

  handleSave = () => {
    let data1 = lodash.cloneDeep(this.state.data);
    data1[this.state.editIndex] = this.state.editObj;
    this.setState({data: data1, editObj: null, editIndex: -1})
  }

  handleDelete = (index) => {
    let data1 = lodash.cloneDeep(this.state.data);
    data1.splice(index, 1)
    this.setState({data: data1})
  }

  handleAdd = () => {
    if(this.state.editIndex > -1) return;
    let editObj = {operator: '1', value: ''};
    let arr = [...this.state.data, editObj]
    this.setState({data: arr, editIndex: arr.length-1, editObj: editObj})
  }

  handleSubmit = () =>{
    if(this.props.onOk) this.props.onOk(this.state.data)
  }

  render() {
  
    return (
      <Modal title={'数据过滤: ' + lodash.get(this.props , 'data.memberName', '')} visible={this.props.visible} 
            onOk={this.handleSubmit}
            onCancel={this.props.onCancel} 
            footer={[
              <Button key="add" type="danger" icon="plus" onClick={this.handleAdd}>
                新增过滤条件
              </Button>,
              <Button key="submit" type="primary" icon="save" onClick={this.handleSubmit}>
                保存
              </Button>,
            ]}
            >

        <Table dataSource={this.state.data} pagination={false} rowKey={() => lodash.random(9999)} size="small" bordered >          
          <Column title="条件" key="2" width={150} dataIndex="operator" render={(text, item, index) => {
              if(this.state.editIndex == index) {
                return <Select defaultValue="1" style={{ width: '100%' }} value={lodash.get(this.state, 'editObj.operator')} 
                               onChange={(value) => this.setState({editObj: {...this.state.editObj, operator: value}})}>
                          {Object.keys(oprations).map(k => <Option key={k} value={k}>{oprations[k]}</Option>)}
                      </Select>
              }else return oprations[item.operator];
          }} />

          <Column title="值" key="3" width={150} dataIndex="value" render={(text, item, index) => {
              if(this.state.editIndex == index) {
                return <Input style={{ width: '100%' }} value={lodash.get(this.state, 'editObj.value')} 
                              onChange={(e) => this.setState({editObj: {...this.state.editObj, value: e.target.value}})} />
              }else return text;
          }} />

          <Column title="操作" key="4"  render={(text, item, index) => {
              if(this.state.editIndex == index) {
                return <Fragment>
                        <a onClick={this.handleSave} ><Icon type="save" /> 保存</a>
                        <Divider type="vertical" />
                        <a onClick={() => this.setState({editIndex: -1, editObj: null})}> <Icon type="close-circle" /> 取消</a>
                      </Fragment>
              }else return (
                <Fragment>
                  <a onClick={() => this.setState({editIndex: index, editObj: lodash.cloneDeep(item)})} ><Icon type="edit" /> 修改</a>
                  <Divider type="vertical" />
                  <a onClick={() => this.handleDelete(index)}> <Icon type="delete" /> 删除</a>
                </Fragment>
              );
            }}  />
            
        </Table>
        
      </Modal>
    )
  }
}
