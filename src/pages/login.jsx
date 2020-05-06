import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Input, Button  } from 'antd';
import { ContactsOutlined, UserOutlined, LoginOutlined  } from '@ant-design/icons';
import { hot } from 'react-hot-loader';
import axios from 'axios';

import './styles/login.scss'

const { Header, Footer, Sider, Content } = Layout;

const LoginPage = (props) => {
    window.axios =axios;
    const [username, setUsername] = useState('');
    const [password, setPasswort] = useState('');
    return (
      <Layout className="login-page">
        <Content>
          <div className="login-item">
            <ContactsOutlined />
          </div>
          <div className="login-item">霸气的名字</div>
          <div className="input-area">
            <div className="input-area-item">
              <Input
                size="large"
                placeholder="username"
                prefix={<UserOutlined/>}
                onChange={(e) => setUsername(e.currentTarget.value)}/>
            </div>
            <div className="input-area-item">
              <Input.Password 
                size="large"
                placeholder="password" 
                onChange={(e) => setPasswort(e.currentTarget.value)}/>
            </div>
          </div>
          <div className="login-item">
            <Button type="primary" shape="round" icon={<LoginOutlined />} size="large" onClick={() => {
              props.history.push('/home');
              // axios({
              //   method: 'get',
              //   url: 'http://127.0.0.1:8888/DBManagementSystemWcf/user/login',
              //   data: {
              //     name: username,
              //     password,
              //   }
              // }).then(res=> {
              //   console('成功', res)
              // }, e => {
              //   console('错误', e)
              // });
            }}>
              登录
            </Button>
          </div>
        </Content>
      </Layout>
    );
}

export default hot(module)(withRouter(LoginPage));