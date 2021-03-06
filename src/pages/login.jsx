import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Input, Button, message } from 'antd';
import { ContactsOutlined, UserOutlined, LoginOutlined, LockOutlined  } from '@ant-design/icons';
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

const defaultKeyEvent = () => {
  if (event.keyCode==13) {
    return;
  }
}

const LoginPage = (props) => {
    window.axios =axios;
    const [username, setUsername] = useState('');
    const [password, setPasswort] = useState('');
    const usenameRef = useRef('');
    const passwordRef = useRef('');
    useEffect(() => {
      document.onkeydown = keyevent;
      return () => {
        document.onkeydown = defaultKeyEvent;
      }
    },[]) 
    useEffect(() => {
      usenameRef.current = username;
      passwordRef.current = password;
    });

    const keyevent = () => {
      if(event.keyCode==13) {
        loginAction();
      }
    }
    const loginAction = () => {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8888/DBManagementSystemWcf/user/login',
        data: {
          name: usenameRef.current,
          password: passwordRef.current,
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res=> {
        if (res.data && res.data.Success) {
          localStorage.setItem("UserNo", res.data.UserNo)
          props.history.push('/data-origin');
        } else {
          message.info(res.data.Message);
        }
      }, e => {
        message.info('系统繁忙，稍后再试')
      });
    }
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
                placeholder="用户名"
                prefix={<UserOutlined/>}
                onChange = {(e) => setUsername(e.currentTarget.value)}
                />
            </div>
            <div className="input-area-item">
              <Input.Password 
                size="large"
                placeholder="密码" 
                prefix={<LockOutlined/>}
                onChange={(e) => setPasswort(e.currentTarget.value)}/>
            </div>
          </div>
          <div className="login-item">
            <Button type="primary" shape="round" icon={<LoginOutlined />} size="large" onClick={loginAction}>
              登录
            </Button>
          </div>
        </Content>
      </Layout>
    );
}

export default hot(module)(withRouter(LoginPage));