import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import SideBar from './components/sideBar'
import HomePage from './page'
import LoginPage from './login'

import './styles/base.scss';
import './styles/site.scss';

import { Layout, Menu, Breadcrumb } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const PrimaryLayout = () => (
  <div className="primary-layout">
    <Route path="/" exact component={LoginPage} />
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1"><BarChartOutlined />Project Name</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider>
          < SideBar />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>管理平台</Breadcrumb.Item>
            <Breadcrumb.Item>数据检索</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Route path="/home" exact component={HomePage} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
);

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('app'))