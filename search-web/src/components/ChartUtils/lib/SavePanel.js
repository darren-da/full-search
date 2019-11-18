import React, { Component } from 'react'
import {Modal, Form, Input} from 'antd';
import html2canvas from 'html2canvas'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: {span: 14 },
  };

@Form.create()
export default class SavePanel extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err && this.props.onSubmit) {
            this.props.onSubmit(values)
          }
        });
    };

    capScreen = () => {
        const _self = this;
        html2canvas(document.getElementById("screenView"),{
            useCORS : true,
            foreignObjectRendering : true,
            allowTaint :false,
            logging: false
        }).then(canvas => {
            let canvas2 = document.createElement('canvas');
            canvas2.width = 240;
            canvas2.height = 135;
            canvas2.getContext('2d').drawImage(canvas, 0, 0, canvas.width, canvas.height, 0,0,240,135);
            // _self.setState({screenPreview: canvas2.toDataURL("image/jpeg")});

            let params = {
                screenId: this.props.data.id,
                imageData: canvas2.toDataURL("image/jpeg")
            }
            // post('/api/imageData/uploadBase64',params).then((res)=>{
            //     console.log(res)
            // })
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Modal visible={this.props.showSavePanel} 
                onOk={this.handleSubmit}
                onCancel={this.props.onCancel}
                okText="提交"
                cancelText="取消"
            >
                <Form  onSubmit={this.handleSubmit}>
                    <Form.Item label="图标名称" {...formItemLayout} >
                    {getFieldDecorator('name', {
                        initialValue: this.props.name,
                        rules: [{ required: true, message: '请输入图标名称!' }],
                    })(
                        <Input  />
                    )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
