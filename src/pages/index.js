import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import SideBar from "./components/sideBar";
import HomePage from "./origin";
import HistoryPage from "./history";
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
    const menuOne = menuConfig.find((value) => {
      return value.key === key[1];
    })
    const valueTwo = menuOne.children.find((value) => {
      return value.key === key[0];
    })
    setBreadCrumbArr([menuOne.value, valueTwo.value])
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
              <Route path="/origin-search" exact component={HomePage} />
              <Route path="/history-search" exact component={HistoryPage} />
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
