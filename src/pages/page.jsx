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

const response = {
  "current_page": 1,
  "data": [{
    "CompanyName": "公司21",
    "Condition1": "16至30",
    "Condition2": "辛",
    "Condition3": "亥",
    "Condition4": "23",
    "EmployeeID": "GT00055",
    "Function": "交易",
    "ID": 3512,
    "Index1": 1430972,
    "Index2": 1441961,
    "Index3": 1455611,
    "Index4": 1451362,
    "Index5": 9592,
    "Index6": 21578718,
    "Index7": 23032403,
    "Index8": 23031287,
    "Index9": 0,
    "Level": "中级",
    "PositionLevel": "固收交易：中级专业员工",
    "SubFunction": "固收交易"
  }, {
    "CompanyName": "公司21",
    "Condition1": "16至30",
    "Condition2": "辛",
    "Condition3": "亥",
    "Condition4": "23",
    "EmployeeID": "GT00097",
    "Function": "交易",
    "ID": 3513,
    "Index1": 897575,
    "Index2": 908235,
    "Index3": 907793,
    "Index4": 906913,
    "Index5": 15382,
    "Index6": 1930161,
    "Index7": 2845286,
    "Index8": 2837059,
    "Index9": 0,
    "Level": "初级",
    "PositionLevel": "固收交易：初级专业员工",
    "SubFunction": "固收交易"
  }, {
    "CompanyName": "公司21",
    "Condition1": "16至30",
    "Condition2": "辛",
    "Condition3": "亥",
    "Condition4": "23",
    "EmployeeID": "GT00321",
    "Function": "交易",
    "ID": 3514,
    "Index1": 1196969,
    "Index2": 1196759,
    "Index3": 1223768,
    "Index4": 1223418,
    "Index5": 14939,
    "Index6": 9692520,
    "Index7": 10916369,
    "Index8": 10919527,
    "Index9": 0,
    "Level": "中级",
    "PositionLevel": "固收交易：中级专业员工",
    "SubFunction": "固收交易"
  }, {
    "CompanyName": "公司21",
    "Condition1": "16至30",
    "Condition2": "辛",
    "Condition3": "亥",
    "Condition4": "23",
    "EmployeeID": "GT00425",
    "Function": "交易",
    "ID": 3515,
    "Index1": 1083369,
    "Index2": 1082563,
    "Index3": 1102651,
    "Index4": 1095010,
    "Index5": 22151,
    "Index6": 1998817,
    "Index7": 3104186,
    "Index8": 3094671,
    "Index9": 0,
    "Level": "助理",
    "PositionLevel": "股票交易：助理专业员工",
    "SubFunction": "股票交易"
  }, {
    "CompanyName": "公司21",
    "Condition1": "16至30",
    "Condition2": "辛",
    "Condition3": "亥",
    "Condition4": "23",
    "EmployeeID": "GT00457",
    "Function": "交易",
    "ID": 3516,
    "Index1": 712990,
    "Index2": 863108,
    "Index3": 730734,
    "Index4": 882685,
    "Index5": 21251,
    "Index6": 1635214,
    "Index7": 2369736,
    "Index8": 2509780,
    "Index9": 0,
    "Level": "助理",
    "PositionLevel": "股票交易：助理专业员工",
    "SubFunction": "股票交易"
  }, {
    "CompanyName": "公司21",
    "Condition1": "16至30",
    "Condition2": "辛",
    "Condition3": "亥",
    "Condition4": "23",
    "EmployeeID": "GT00021",
    "Function": "交易",
    "ID": 3517,
    "Index1": 1006777,
    "Index2": 1007184,
    "Index3": 1020844,
    "Index4": 1015456,
    "Index5": 18093,
    "Index6": 3665068,
    "Index7": 4694535,
    "Index8": 4694360,
    "Index9": 0,
    "Level": "高级",
    "PositionLevel": "固收交易：高级专业员工",
    "SubFunction": "固收交易"
  }, {
    "CompanyName": "公司21",
    "Condition1": "16至30",
    "Condition2": "辛",
    "Condition3": "亥",
    "Condition4": "23",
    "EmployeeID": "GT00092",
    "Function": "交易",
    "ID": 3518,
    "Index1": 1078723,
    "Index2": 1084964,
    "Index3": 1095338,
    "Index4": 1099306,
    "Index5": 16303,
    "Index6": 0,
    "Index7": 0,
    "Index8": 0,
    "Index9": 0,
    "Level": "助理",
    "PositionLevel": "固收交易：助理专业员工",
    "SubFunction": "固收交易"
  }, {
    "CompanyName": "公司21",
    "Condition1": "16至30",
    "Condition2": "辛",
    "Condition3": "亥",
    "Condition4": "23",
    "EmployeeID": "GT00194",
    "Function": "交易",
    "ID": 3519,
    "Index1": 268449,
    "Index2": 307689,
    "Index3": 279541,
    "Index4": 319365,
    "Index5": 11899,
    "Index6": 419806,
    "Index7": 696792,
    "Index8": 725217,
    "Index9": 0,
    "Level": "助理",
    "PositionLevel": "固收交易：助理专业员工",
    "SubFunction": "固收交易"
  }, {
    "CompanyName": "公司21",
    "Condition1": "16至30",
    "Condition2": "辛",
    "Condition3": "亥",
    "Condition4": "23",
    "EmployeeID": "GT00388",
    "Function": "基金运营",
    "ID": 3520,
    "Index1": 592712,
    "Index2": 728682,
    "Index3": 621683,
    "Index4": 736211,
    "Index5": 21369,
    "Index6": 2402658,
    "Index7": 3019714,
    "Index8": 3129219,
    "Index9": 0,
    "Level": "部门正职",
    "PositionLevel": "基金运营综合：部门正职",
    "SubFunction": "基金运营综合"
  }, {
    "CompanyName": "公司21",
    "Condition1": "16至30",
    "Condition2": "辛",
    "Condition3": "亥",
    "Condition4": "23",
    "EmployeeID": "GT00084",
    "Function": "基金运营",
    "ID": 3521,
    "Index1": 704480,
    "Index2": 711566,
    "Index3": 706185,
    "Index4": 742323,
    "Index5": 24693,
    "Index6": 697743,
    "Index7": 1406871,
    "Index8": 1433603,
    "Index9": 0,
    "Level": "高级",
    "PositionLevel": "注册登记：高级专业员工",
    "SubFunction": "注册登记"
  }],
  "res_code": "00",
  "res_msg": "",
  "total_page": 183
};

const PageContext = () => {
  const [conditionOne, setConditionOne] = useState('');
  const [conditionTwoMin, setConditionTwoMin] = useState('');
  const [conditionTwoMax, setConditionTwoMax] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: false,
    showQuickJumper: true,
    showTotal: total => `总条目 ${total} 条`
  });

  useEffect(() => {
    setLoading(true)
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/getbyconditions',
      params: {
        pagesize: pagination.pageSize,
        pageindex: pagination.current,
      }
    }).then(res => {
      const {
        data
      } = res;
      setLoading(false)
      setTableData(data.data);
      setPagination({
        ...pagination,
        total: data.total_count
      })
    }, e => {
      const {
        data
      } = response;
      setLoading(false)
      setTableData(data);
      setPagination({
        ...pagination,
        total: response.total_page
      })
      
      setLoading(false)
      console.log('错误', e)
    });
  }, [])
  const handleChange = (value) => {
    setConditionOne(value.length > 0 ? JSON.stringify(value) : '');
  }
  const handleTableChange = (pagination) => {
    setLoading(true)
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/getbyconditions',
      params: {
        con1: conditionOne,
        con4: `${conditionTwoMin || '*'}~${conditionTwoMax || '*'}`,
        pagesize: pagination.pageSize,
        pageindex: pagination.current,
      }
    }).then(res => {
      const {
        data
      } = res;
      setLoading(false)
      setTableData(data.data);
      setPagination({
        ...pagination,
        total: data.total_count
      })
    }, e => {
      const {
        data
      } = response;
      setLoading(false)
      setTableData(data);
      setPagination({
        ...pagination,
        total: response.total_page
      })

      setLoading(false)
      console.log('错误', e)
    });
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
              setLoading(true)
              axios({
                method: 'get',
                url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/getbyconditions',
                params: {
                  con1: conditionOne,
                  con4: `${conditionTwoMin || '*'}~${conditionTwoMax || '*'}`,
                  pagesize: 10,
                  pageindex: 1,
                }
              }).then(res=> {
                const { data } = res;                
                setLoading(false)
                setTableData(data.data);
                setPagination({
                  pageSize: 10,
                  current: 1,
                  total: data.total_count
                })          
              }, e => {
                setLoading(false)
                console.log('错误', e)
              });
            }}>
              检索
            </Button>
            </Col>
          </Row>
        </Header>
        <Content>
          <DataTable 
            tableData={tableData}
            loading={loading}
            rowKey={record => record['ID']}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Content>
      </Layout>
      {/* <GraphArea myData={myData} /> */}
    </>
  );
};

export default hot(module)(PageContext);
