import React from 'react';
import { Layout, Row, Col, Form, Menu, Input, Button, Typography, Radio, message } from 'antd';
import styles from './styles';
import { ListBtnGroupComponent } from '../../../component';

class Dir extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ListBtnGroupComponent data={{
          search: {
            show: true,
            data: [
              {
                title: '名称',
              },
              {
                title: '单位'
              },
              {
                title: 'ren '
              },
              {
                title: 'ren '
              },
              {
                title: 'ren '
              },
              {
                title: 'ren '
              },
              {
                title: 'ren '
              }
            ],
            search: () => {

            },
            reset: () => {

            }
          },
          add: {
            show: true,
            disable: false,
            click: () => {}
          },
          update: {
            show: true,
            disable: false,
            click: () => {

            }
          },
          delete: {
            show: true,
            disable: false,
            click: () => {

            }
          }
        }}
        />
      </div>
    );
  }
}
export default Dir;
