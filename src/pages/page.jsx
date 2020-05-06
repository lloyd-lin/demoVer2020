/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
// App.js
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { debounce } from 'lodash-es';
import classnames from 'classnames';
import { Layout, Row, Col, Select, Input, Space, Button  } from "antd";
const { Header, Content, Footer } = Layout;
const { Option } = Select;
import DataTable from './components/dataTable'
import GraphArea from './components/graph'
import axios from 'axios';
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
  const [conditionOne, setConditionOne] = useState('');
  const [conditionTwoMin, setConditionTwoMin] = useState('');
  const [conditionTwoMax, setConditionTwoMax] = useState('');
  const handleChange = (value) => {
    setConditionOne(value);
  }
  return (
    <>
      <Layout>
        <Header className="static-inner-header">
          <Row>
            <Col span={24}>
              <Space style={{ width: "100%" }}>
                {"筛选条件一"}
                <Select
                  mode="multiple"
                  style={{ "minWidth": "30rem" }}
                  placeholder="选择筛选条件"
                  defaultValue={[]}
                  onChange={handleChange}
                  optionLabelProp="label"
                >
                  <Option value="前15" label="befor15">
                    <div className="demo-option-label-item">
                      前15
                    </div>
                  </Option>
                  <Option value="16至30" label="15to30">
                    <div className="demo-option-label-item">
                      16至30
                    </div>
                  </Option>
                  <Option value="31至60" label="31to60">
                    <div className="demo-option-label-item">
                     31至60
                    </div>
                  </Option>
                  <Option value="60后" label="after60">
                    <div className="demo-option-label-item">
                     60后
                    </div>
                  </Option>
                </Select>
              </Space>
            </Col>
            <Col span={18}>
              <Space>
                {"筛选条件四"}
                <Input onChange={(e) => setConditionTwoMin(e.currentTarget.value)}/>
                {"~"}
                <Input onChange={(e) => setConditionTwoMax(e.currentTarget.value)}/>
              </Space>
            </Col>
            <Col span={6}>
            <Button type="primary" onClick={() => {
              console.log(conditionOne, conditionTwoMin, conditionTwoMax)
              axios({
                method: 'get',
                url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/getbyconditions',
                params: {
                  con1: JSON.stringify(conditionOne),
                  con4: `${conditionTwoMin || '*'}~${conditionTwoMax || '*'}`,
                  pagesize: 10,
                  pageindex: 1,
                }
              }).then(res=> {
                console.log('成功', res)
              }, e => {
                console.log('错误', e)
              });
            }}>
              检索
            </Button>
            </Col>
          </Row>
        </Header>
        <Content>
          <DataTable myData={myData} />
        </Content>
      </Layout>
      <GraphArea myData={myData} />
    </>
  );
};

export default hot(module)(PageContext);
