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


const UploadPage = (props) => {
    window.axios =axios;
    const [filePath, setFilePath] = useState('');
    useEffect(() => {
    },[]) 

    const uploadAction = () => {
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
        if (res.data && res.data.Success) {
          localStorage.setItem("UserNo", res.data.UserNo)
          props.history.push('/origin-search');
        } else {
          message.info(res.data.Message);
        }
      }, e => {
        message.info('系统繁忙，稍后再试')
      });
    }
    return (
      <Layout className="upload-page">
        <Content>
          上传
        </Content>
      </Layout>
    );
}

export default hot(module)(withRouter(UploadPage));