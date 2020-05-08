import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import SideBar from "./components/sideBar";
import HomePage from "./page";
import LoginPage from "./login";
import menuConfig from "../config/menu";

import "./styles/base.scss";
import "./styles/site.scss";

import { Layout, Menu, Breadcrumb } from "antd";
import { BarChartOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const PrimaryLayout = () => {
  const [breadCrumbArr, setBreadCrumbArr] = useState(['数据检索', '原始数据检索查询'])
  const [sideMenu, setSideMenu] = useState(menuConfig)
  useEffect(() => {

  }, []);
  const handleSideBar = (key) => {
    console.log(key)
  }
  return (
    <div className="primary-layout">
      <Route path="/" exact component={LoginPage} />
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <BarChartOutlined />
              项目名
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider>
            <SideBar sideMenu={sideMenu} handleSideBar={handleSideBar} />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {breadCrumbArr.map((item, index) => <Breadcrumb.Item key={index} >{item}</Breadcrumb.Item>)}
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <Route path="/home" exact component={HomePage} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

const App = () => (
  <HashRouter>
    <PrimaryLayout />
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById("app"));
