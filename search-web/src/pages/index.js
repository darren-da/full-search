import React, { Component } from 'react';
import { connect } from 'dva';
import { message } from 'antd'
import { Card,Input ,List,Tabs} from "antd";

const { Search } = Input;
const { TabPane } = Tabs;

class IndexPage extends Component{

  onSearch = (value,e) => {
    console.log(this.props)
    if(!value){
      message.warning('请输入搜索内容');
      return;
    }
    this.props.dispatch({ type: 'searcher/search', payload: { keyword:value}});
  }

  render() {
    console.log("results",this.props.searcher.results)
    return(
      <div style={{marginTop:'3em'}}>
        <div>
          <Search
            enterButton="搜索"
            size="large"
            allowClear
            style={{width:'35%'}}
            onSearch={this.onSearch}
          />          
        </div>
        <div style={{marginTop:'1em'}}>
          <Card style={{width:'70%',float:'left'}}>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="全部" key="1">
                <List
                  itemLayout="horizontal"
                  dataSource={this.props.searcher.results}
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 3,
                    current:1,
                    total:2
                  }}
                  renderItem={item => (
                    <List.Item>
                      <div>
                      <a href="https://ant.design" dangerouslySetInnerHTML={{__html: item.highlight.title}}></a>
                      <p dangerouslySetInnerHTML={{__html: item.highlight.description}}></p>
                      </div>
                    </List.Item>
                  )}
                />
                </TabPane>
                <TabPane tab="政策法规" key="2">
                Content of Tab Pane 2
                </TabPane>
                <TabPane tab="经典案件" key="3">
                Content of Tab Pane 3
                </TabPane>
            </Tabs>   
          </Card>
        </div>
        <div style={{ width: '15%' ,float:'left' , marginLeft:'1%'}}>
          <Card title="历史记录" extra={<a href="#">More</a>} >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            {/* <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p> */}
          </Card> 
        </div>
        <div style={{ width: '15%' ,float:'right' ,marginRight:'14%', marginTop:'1%' }}>
          <Card title="搜索热点" extra={<a href="#">More</a>}>
            <p>Card content1</p>
            <p>Card content2</p>
            <p>Card content3</p>
            <p>Card content4</p>
            <p>Card content5</p>                 
          </Card>
        </div>        
      </div>
    )
  }
}


export default connect(state => {
  return {
    searcher:state.searcher
  }
})(IndexPage);
