/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
// App.js
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { debounce } from 'lodash-es';
import classnames from 'classnames';
import { Layout, Row, Col, AutoComplete, Input, Cascader, Space  } from "antd";
const { Header, Content, Footer } = Layout;

import DataTable from './components/dataTable'
import GraphArea from './components/graph'
const options = [
  { value: 'FrankLi' },
  { value: 'Jeffery' },
  { value: 'Lloyd' },
];

const cOpetion = [
  {
    value: 'levelOne',
    label: 'level One',
    children: [
      {
        value: 'levelOne-2',
        label: 'level One-2',
        children: [
          {
            value: 'levelOne-2-1',
            label: 'levelOne-2 1',
          },
          {
            value: 'levelOne-2-2',
            label: 'levelOne-2 2',
          },
        ],
      },
    ],
  },
];

const myData = [];
for (let i = 0; i < 46; i++) {
  myData.push({
    key: i,
    name: `Edward King ${i}`,
    age: i % 3 + (~(Math.random(0,1) * 100) * -1
    ),
    address: `London, Park Lane no. ${i % 5}`,
  });
}

const PageContext = () => {
  return (
    <>
    <Layout>
      <Header className="static-inner-header">
        <Row>
          <Col span={8}>
            <Space>
            {"筛选条件一"}
            <AutoComplete
              style={{ width: 200 }}
              options={options}
              placeholder="try to type `b`"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
            </Space>
          </Col>
          <Col span={8}>
            <Space>
            {"筛选条件二"}
            <Input />
            </Space>
          </Col>
          <Col span={8}>
            <Space>
            {"筛选条件三"}
            <Cascader options={cOpetion} placeholder="try pick one"/>
            </Space>
            </Col>
          <Col span={24}>
            <Space>
            {"筛选条件四"}
            <Input />
            {"~"}
            <Input />
            </Space>
          </Col>
        </Row>
      </Header>
      <Content>
        <DataTable myData={myData}/>
      </Content>
    </Layout>
    <GraphArea myData={myData}/>
    </>
  );
};

export default hot(module)(PageContext);
