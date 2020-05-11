import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import SideBar from "./components/sideBar";
import HomePage from "./origin";
import HistoryPage from "./history";
import LoginPage from "./login";
import uploadPage from "./upload"
import menuConfig from "../config/menu";

import "./styles/base.scss";
import "./styles/site.scss";

import { Layout, Menu, Breadcrumb } from "antd";
import { BarChartOutlined, UpCircleFilled } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const PrimaryLayout = () => {
  const [breadCrumbArr, setBreadCrumbArr] = useState(['', ''])
  const [currentSideKey, setCurrentSideKey] = useState(['', ''])
  const [sideMenu, setSideMenu] = useState(menuConfig)
  useEffect(() => {
    const RouteArr = location.hash.match(/(?!\/)(\w*)-(\w*)/);
    if (!RouteArr) return;
    const menuOne = menuConfig.find((value) => {
      return value.key === RouteArr[1];
    })
    if (!menuOne) return ;
    const valueTwo = menuOne.children.find((value) => {
      return value.key === RouteArr[0];
    })
    setBreadCrumbArr([menuOne.value, valueTwo.value])
    setCurrentSideKey([menuOne.key, valueTwo.key])
  }, []);
  const handleSideBar = (key) => {
    console.log(key)
    const menuOne = menuConfig.find((value) => {
      return value.key === key[1];
    })
    const valueTwo = menuOne.children.find((value) => {
      return value.key === key[0];
    })
    setBreadCrumbArr([menuOne.value, valueTwo.value])
    setCurrentSideKey([menuOne.key, valueTwo.key])
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
            <SideBar sideMenu={sideMenu} currentSideKey={currentSideKey} handleSideBar={handleSideBar} />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {breadCrumbArr.map((item, index) => <Breadcrumb.Item key={index} >{item}</Breadcrumb.Item>)}
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 5,
                margin: 0,
                minHeight: 280
              }}
            >
              <Route path="/data-origin" exact component={HomePage} />
              <Route path="/data-history" exact component={HistoryPage} />
              <Route path="/data-upload" exact component={uploadPage} />
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
