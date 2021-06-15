import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Button } from 'antd';
import {
  PlusOutlined
} from '@ant-design/icons';
import { fromJS } from 'immutable';
import styles from './styles';

class ListBtnGroupComponent extends React.Component {
  static propTypes = {
    /**
     * add
     * update
     * delete
     * {
     * add: {
     * show:
     * disable:
     * click
     * }
     * }
     * */
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      btnData: {},
      showSearch: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    let res = fromJS(prevState);
    // 更新data
    res = res.updateIn(['btnData'], () => data);
    console.log(prevState);
    return res.toJS();
  }

  showSearch = () => {
    const { showSearch } = this.state;
    this.setState({ showSearch: !showSearch });
  }

  getSearchItem = () => {
    const { btnData } = this.state;
    const searchHtml = [];
    if (btnData.search) {
      // 获取搜索框内的内容
      btnData.search.data.forEach((value, index) => {
        searchHtml.push(
          <Col span={12} key={index}>
            <Form.Item
              name={index}
              label={value.title}
            >
              <Input placeholder={value.title} />
            </Form.Item>
          </Col>
        );
      });
    }
    return searchHtml;
  }

  // 搜索
  onSearch = () => {
    // TODO 搜索
    const values = this.searchForm.getFieldsValue();
    console.log(values);
  }

  // 重置
  onReset = () => {
    this.searchForm.resetFields();
  }

  render() {
    const { btnData, showSearch } = this.state;
    return (
      <div style={styles.container}>
        {/* 多功能查询 */}
        {
          btnData.search && btnData.search.show && showSearch ? (
            <Row style={styles.searchContainer}>
              <Col span={10}>
                <Form
                  ref={(ref) => { this.searchForm = ref; }}
                  name="advanced_search"
                  className="ant-advanced-search-form"
                >
                  <Row gutter={[24, 0]}>{this.getSearchItem()}</Row>
                  <Row>
                    <Col span={24} style={styles.submitBtnContainer}>
                      <Button type="primary" style={styles.submitBtn} onClick={() => { this.onSearch(); }}>查询</Button>
                      <Button onClick={() => { this.onReset(); }}>重置</Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          ) : null
        }
        {/* 增删改等小功能 */}
        <Row>
          <Col>
            {
              btnData.add && btnData.add.show ? (
                <Button style={styles.btn} disabled={btnData.add.disable} onClick={btnData.add.click}>新增</Button>
              ) : null
            }
            {
              btnData.update && btnData.update.show ? (
                <Button style={styles.btn} disabled={btnData.update.disable} onClick={btnData.update.click}>修改</Button>

              ) : null
            }
            {btnData.delete && btnData.delete.show ? (
              <Button style={styles.btn} disabled={btnData.delete.disable} onClick={btnData.delete.click}>删除</Button>
            ) : null}
            {
              btnData.search && btnData.search.show ? (
                <Button style={styles.btn} onClick={this.showSearch}>搜索</Button>
              ) : null
            }
          </Col>
        </Row>
      </div>
    );
  }
}
export default ListBtnGroupComponent;
