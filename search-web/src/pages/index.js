import React, { Component } from 'react';
import { connect } from 'dva';
import { message } from 'antd'
import { Card, Icon, Button, Popconfirm, Row, Col ,Input, Form ,List} from "antd";
import styles from './index.css';

const { Search } = Input;

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
      <div className={styles.normal}>
        <div>
          <Row>
            <Col span={12} offset={6}>
              <Search
                enterButton="Search"
                size="large"
                onSearch={this.onSearch}
              />
            </Col>
          </Row>
        </div>
        <div style={{marginTop:'100px',textAlign:"center"}}>
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
                    <List.Item.Meta
                      title={
                        <a href="https://ant.design">
                          {item.highlight.title + "" + item.highlight.description}
                        </a>
                      }
                    />
                  </List.Item>
                )}
              />

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
