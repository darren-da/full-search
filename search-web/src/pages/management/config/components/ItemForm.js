import React, { Component } from 'react'
import { connect } from 'dva';
import { Form, Input, Button, Card, Tabs, Icon, message, InputNumber,Tooltip } from 'antd'
import lodash from 'lodash'

const { TextArea } = Input;
const TabPane = Tabs.TabPane;

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

@Form.create()
class ItemForm extends Component {

    state = {
        
    }

    handleSave = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let _item = {
                    parentCode:this.props.item.parent.parentCode,
                    description: values.description,
                    keyword: values.keyword,
                    name: values.name,
                    timeLimit: values.timeLimit,
                }
                if(this.props.item.editFlag){
                    _item = {id:this.props.item.editRecord.id,..._item};
                }
                console.log('itemDto',_item);
                this.props.dispatch({ type: 'item/saveOrUpdate', payload: { itemDto:_item}});
            }
        });
    }

    componentDidMount() {
        if (this.props.item.editRecord) {
            
        }
    }

    render() {
        const { getFieldDecorator} = this.props.form;
        let parentName = '';
        console.log('editFlag',this.props.item.editFlag);
        if(this.props.item.editFlag){
            parentName = this.props.item.editRecord ? this.props.item.editRecord.parentName : ''
        }else {
            console.log('parentName',this.props.item.parent.parentName);
            parentName = this.props.item.parent.parentName;
        }
        return (
            
            <Card style={{ width: '100%' }} >
                    <Form>
                        <FormItem  {...formItemLayout} label="上级名称" >
                                {getFieldDecorator('parentName', {
                                        initialValue: this.props.item.editFlag ? (this.props.item.editRecord ? this.props.item.editRecord.parentName : '') : (this.props.item.parent ? this.props.item.parent.parentName : ''),
                                        
                                    })(
                                        <Input placeholder="上级名称" disabled={true}/>
                                    )}
                        </FormItem>
                        <FormItem  {...formItemLayout}
                            label={
                                <span>
                                  编码&nbsp;
                                  <Tooltip title="保存时自动生成">
                                    <Icon type="question-circle-o" />
                                  </Tooltip>
                                </span>
                              }
                        >
                            {getFieldDecorator('code', {
                                initialValue: this.props.item.editFlag && this.props.item.editRecord ? this.props.item.editRecord.code : '',
                                
                            })(
                                <Input placeholder="分理项编码" disabled={true}/>
                            )}
                        </FormItem>
                        <FormItem  {...formItemLayout} label="分理项名称" >
                            {getFieldDecorator('name', {
                                initialValue: this.props.item.editFlag && this.props.item.editRecord ? this.props.item.editRecord.name : '',
                                rules: [
                                    { required: true, message: '请填写分理项名称'},
                                    { max: 50, message: '请输入0-50个字符'},
                                ],
                            })(
                                <Input placeholder="请填写分理项名称" autoComplete="off"/>
                            )}
                        </FormItem>
                        <FormItem  {...formItemLayout} label="关键字" >
                            {getFieldDecorator('keyword', {
                                initialValue: this.props.item.editFlag && this.props.item.editRecord ? this.props.item.editRecord.keyword : '',
                                rules: [{ required: true, message: '请填写关键字', }],
                            })(
                                <Input placeholder="请填写关键字" />
                            )}
                        </FormItem>
                        <FormItem  {...formItemLayout} label="处置时限" >
                            {getFieldDecorator('timeLimit', {
                                initialValue: this.props.item.editFlag && this.props.item.editRecord ? this.props.item.editRecord.timeLimit : 1,
                                rules: [{ required: true, message: '请填处置时限', }],
                            })(
                                <InputNumber min={1}/>
                            )}
                        </FormItem>
                        <FormItem  {...formItemLayout} label="描述" >
                            {getFieldDecorator('description', {
                                initialValue: this.props.item.editFlag && this.props.item.editRecord ? this.props.item.editRecord.description : '',
                                rules: [{ max: 300, message: '请输入0-300个字符'},]
                            })(
                                <TextArea  placeholder="请填写描述" />
                            )}
                        </FormItem>
                        <FormItem  {...formItemLayout}>
                                <Button key="save" icon="save" type="primary" onClick={this.handleSave}>保存</Button>
                        </FormItem>
                    </Form>
            </Card>
        )
    }
}

export default connect(state => {
    return {
        item: state.item
    }
})(ItemForm)