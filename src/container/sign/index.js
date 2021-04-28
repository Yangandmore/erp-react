import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { Layout, Row, Col, Form, Input, Button, Typography, Radio, message } from 'antd';
import styles from './styles';
import { userAction, userSelect } from '../../redux';

class Sign extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    loadSign: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      loadState: {
        signFetching: false
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { loadSign } = nextProps;
    const { loadState: { signFetching } } = prevState;
    let res = fromJS(prevState);
    if (loadSign.isFetching !== signFetching) {
      res = res.updateIn(['loadState', 'signFetching'], () => loadSign.isFetching);
    }
    return res.toJS();
  }

  componentDidUpdate(prevProps, prevState) {
    const { loadState } = this.state;
    const { loadState: newLoadState } = prevState;
    if (!loadState.signFetching && newLoadState.signFetching) {
      if (this.props.loadSign.err) {
        // 请求失败
        message.error(this.props.loadSign.err.errmsg);
      } else {
        // 请求成功
        message.success(this.props.loadSign.msg);
        // 跳转至登陆页面
        prevProps.history.replace({ pathname: '/login' });
      }
    }
  }

  onFinish = (value) => {
    // 登陆
    console.log('---', value);
    const { username, password, name, sex } = value;
    const { dispatch } = this.props;
    dispatch(userAction.actionSignUser({
      loginName: username,
      password,
      name,
      sex: sex === '1' ? '男' : '女'
    }));
  }

  onFinishFailed = (errorInfo) => {
    console.log('-onfisF', errorInfo);
  }

  render() {
    const { loadState } = this.state;
    return (
      <Layout style={styles.layoutContainer}>
        <Layout.Content>
          <Row justify="center" align="middle">
            <Col>
              <Typography.Title>注册系统账户</Typography.Title>
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Col span="6" pull="1">
              <Form
                labelCol={{ span: 8 }}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="用户名"
                  name="username"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, min: 8, message: '请输入密码' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="确认密码"
                  name="againPassword"
                  rules={[{ required: true, min: 8, message: '请再次输入密码' }, ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('请输入相同密码'));
                    },
                  })]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="姓名"
                  name="name"
                  rules={[{ required: true, message: '请输入您的姓名' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="性别"
                  name="sex"
                  rules={[{ required: true }]}
                >
                  <Radio.Group>
                    <Radio.Button value="1">男</Radio.Button>
                    <Radio.Button value="0">女</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8 }}>
                  <Button shape="round" type="primary" loading={loadState.signFetching} block htmlType="submit">
                    注册
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({
  loadSign: userSelect.loadSignSelect(state),
});
export default connect(mapStateToProps)(Sign);
