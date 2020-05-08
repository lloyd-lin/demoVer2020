import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Input, Button, message  } from 'antd';
import { ContactsOutlined, UserOutlined, LoginOutlined  } from '@ant-design/icons';
import { hot } from 'react-hot-loader';
import axios from 'axios';

import './styles/login.scss'

const { Header, Footer, Sider, Content } = Layout;
message.config({
  top: 400,
  duration: 2,
  maxCount: 1,
  rtl: true,
});

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
          <div className="login-item">登录系统</div>
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
              axios({
                method: 'post',
                url: 'http://127.0.0.1:8888/DBManagementSystemWcf/user/login',
                data: {
                  name: username,
                  password,
                },
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                }
              }).then(res=> {
                const { data} = res;
                if (data.res_code === '00' && data.data && data.data[0].Success) {
                  props.history.push('/home');
                } else {
                  message.info(data.data[0].Message);
                }
              }, e => {
                message.info('系统繁忙，稍后再试')
              });
            }}>
              登录
            </Button>
          </div>
        </Content>
      </Layout>
    );
}

export default hot(module)(withRouter(LoginPage));