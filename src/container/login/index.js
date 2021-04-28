import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Row, Col, Form, Input, Button, Typography, Divider } from 'antd';
import styles from './styles';

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onSign = () => {
    const { history } = this.props;
    history.push({ pathname: '/sign' });
  }

  onFinish = (value) => {
    const { username, password } = value;
    // 登陆
    console.log('---');
  }

  onFinishFailed = (errorInfo) => {
    console.log('-onfisF', errorInfo);
  }

  render() {
    return (
      <Layout style={styles.layoutContainer}>
        <Layout.Content>
          <Row justify="center" align="middle">
            <Col>
              <Typography.Title>ERP 系统</Typography.Title>
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
                <Form.Item wrapperCol={{ offset: 8 }}>
                  <Button shape="round" type="primary" block htmlType="submit">
                    登陆
                  </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8 }}>
                  <Button shape="round" block onClick={() => { this.onSign(); }}>
                    注册
                  </Button>
                  <Typography.Link>忘记密码?</Typography.Link>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Layout.Content>
        <Layout.Footer>
          <Divider><Typography.Text type="secondary">xxxx公司</Typography.Text></Divider>
        </Layout.Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({

});
export default connect(mapStateToProps)(Login);
