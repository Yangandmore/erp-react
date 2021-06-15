import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Row, Col, Form, Menu, Input, Button, Typography, Radio, message } from 'antd';
import { BrowserRouter, Route, Switch, withRouter, Link } from 'react-router-dom';
import styles from './styles';
import { mainAction, tokenSelect, userAction, roleAction, dirAction } from '../../redux';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Main extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // 判断是否登陆
    const { token, userId, history, dispatch } = this.props;
    if (token === undefined || token === '') {
      // 重定向到登陆
      history.replace({ pathname: '/login' });
      return;
    }
    // 获取字典
    dispatch(dirAction.actionDirList());
    // 获取用户信息
    dispatch(userAction.actionGetUser(userId));
    // 获取当前用户角色
    dispatch(roleAction.actionUserRole(userId));
  }

  headerClick = (e) => {
    const { key } = e;
    switch (key) {
      case 'me':
        this.props.history.push({ pathname: '/erp/me' });
        break;
      default:
        break;
    }
  }

  apiTest = () => {
    this.props.dispatch(mainAction.actionApiTest());
  };

  localTest = () => {
    console.log('-----local');
    this.props.dispatch(mainAction.actionLocalTest({ a: 1, b: 2 }));
  };

  onMenuClick = (e) => {
    console.log('----->', e);
    switch (e.key) {
      case 'dir':
        // 字典
        this.props.history.push({ pathname: '/erp/dir' });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Layout>
        <Header>
          <Row>
            <Col span={8}>
              <h1 style={styles.logoText}>ERP 系统</h1>
            </Col>
            <Col span={8} />
            <Col span={8}>
              <Menu onClick={this.headerClick} mode="horizontal" theme="dark">
                <Menu.Item key="me">
                  我的
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              style={styles.menuContainer}
              onClick={this.onMenuClick}
            >
              {/* 维护功能 */}
              <SubMenu key="maintain" title="维护功能">
                <Menu.Item key="user">用户维护</Menu.Item>
                <Menu.Item key="role">角色维护</Menu.Item>
                <Menu.Item key="permission">权限维护</Menu.Item>
                <Menu.Item key="dir">字典维护</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  token: tokenSelect.getTokenSelect(state),
  userId: tokenSelect.getUserIdSelect(state),
});
export default connect(mapStateToProps)(withRouter(Main));
