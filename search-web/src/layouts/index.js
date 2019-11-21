import { Component } from 'react';
import { connect } from 'dva';
import { Layout} from 'antd';

const { Content, Header } = Layout;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, location } = this.props;
    const { collapsed } = this.state;
    return (
      <Layout>
        
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            { children }
          </Content>
      </Layout>
    );
  }
}

export default connect(state => {
  return {
    appModel:state.appModel
  }
})(BasicLayout);
