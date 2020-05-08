/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
// App.js
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { debounce } from 'lodash-es';
import classnames from 'classnames';
import { Layout, Row, Col, Select, Input, Space, Button, Modal, message  } from "antd";
const { Header, Content, Footer } = Layout;
const { Option } = Select;
import DataTable from './components/dataTable'
import GraphArea from './components/graph'
import axios from 'axios';

const response = {
  column: [
    { Display: "公司名", Name: "CompanyName", Width: 4 },
    { Display: "员工ID", Name: "EmployeeID", Width: 4 },
    { Display: "筛选条件1", Name: "Condition1", Width: 5 },
    { Display: "筛选条件2", Name: "Condition2", Width: 5 },
    { Display: "筛选条件3", Name: "Condition3", Width: 5 },
    { Display: "筛选条件4", Name: "Condition4", Width: 5 },
    { Display: "职能", Name: "Function", Width: 6 },
    { Display: "子职能", Name: "SubFunction", Width: 8 },
    { Display: "职位-层级", Name: "PositionLevel", Width: 13 },
    { Display: "层级", Name: "Level", Width: 4 },
    { Display: "指标1", Name: "Index1", Width: 6 },
    { Display: "指标2", Name: "Index2", Width: 6 },
    { Display: "指标3", Name: "Index3", Width: 6 },
    { Display: "指标4", Name: "Index4", Width: 6 },
    { Display: "指标5", Name: "Index5", Width: 5 },
    { Display: "指标6", Name: "Index6", Width: 7 },
    { Display: "指标7", Name: "Index7", Width: 7 },
    { Display: "指标8", Name: "Index8", Width: 7 },
    { Display: "指标9", Name: "Index9", Width: 5 },
  ],
  current_page: 1,
  data: [
    {
      CompanyName: "公司62",
      Condition1: "60后",
      Condition2: "甲",
      Condition3: "丑",
      Condition4: 50,
      EmployeeID: "6",
      Function: "基金运营",
      ID: 11755,
      Index1: 110982,
      Index2: 143615,
      Index3: 115591,
      Index4: 157097,
      Index5: 5853,
      Index6: 92403,
      Index7: 222517,
      Index8: 247785,
      Index9: 19453,
      Level: "助理",
      PositionLevel: "基金会计：助理专业员工",
      SubFunction: "基金会计",
    },
    {
      CompanyName: "公司62",
      Condition1: "60后",
      Condition2: "甲",
      Condition3: "丑",
      Condition4: 50,
      EmployeeID: "8",
      Function: "基金运营",
      ID: 11756,
      Index1: 308107,
      Index2: 301759,
      Index3: 309620,
      Index4: 304446,
      Index5: 5472,
      Index6: 143380,
      Index7: 455025,
      Index8: 463658,
      Index9: 1860,
      Level: "助理",
      PositionLevel: "基金会计：助理专业员工",
      SubFunction: "基金会计",
    },
    {
      CompanyName: "公司62",
      Condition1: "60后",
      Condition2: "甲",
      Condition3: "丑",
      Condition4: 50,
      EmployeeID: "9",
      Function: "基金运营",
      ID: 11757,
      Index1: 118784,
      Index2: 127585,
      Index3: 125152,
      Index4: 139696,
      Index5: 9071,
      Index6: 111735,
      Index7: 252597,
      Index8: 255336,
      Index9: 11418,
      Level: "助理",
      PositionLevel: "基金会计：助理专业员工",
      SubFunction: "基金会计",
    },
    {
      CompanyName: "公司62",
      Condition1: "60后",
      Condition2: "甲",
      Condition3: "丑",
      Condition4: 50,
      EmployeeID: "10",
      Function: "基金运营",
      ID: 11758,
      Index1: 291040,
      Index2: 361300,
      Index3: 299779,
      Index4: 371263,
      Index5: 14272,
      Index6: 1581380,
      Index7: 1887355,
      Index8: 1946895,
      Index9: 16648,
      Level: "助理",
      PositionLevel: "基金会计：助理专业员工",
      SubFunction: "基金会计",
    },
    {
      CompanyName: "公司62",
      Condition1: "60后",
      Condition2: "甲",
      Condition3: "丑",
      Condition4: 50,
      EmployeeID: "11",
      Function: "基金运营",
      ID: 11759,
      Index1: 477917,
      Index2: 487463,
      Index3: 476699,
      Index4: 493673,
      Index5: 194,
      Index6: 772904,
      Index7: 1265525,
      Index8: 1265388,
      Index9: 14228,
      Level: "助理",
      PositionLevel: "基金会计：助理专业员工",
      SubFunction: "基金会计",
    },
    {
      CompanyName: "公司62",
      Condition1: "60后",
      Condition2: "甲",
      Condition3: "丑",
      Condition4: 50,
      EmployeeID: "12",
      Function: "基金运营",
      ID: 11760,
      Index1: 243501,
      Index2: 243596,
      Index3: 240073,
      Index4: 247722,
      Index5: -1137,
      Index6: 2746,
      Index7: 240787,
      Index8: 248953,
      Index9: 4389,
      Level: "助理",
      PositionLevel: "基金会计：助理专业员工",
      SubFunction: "基金会计",
    },
    {
      CompanyName: "公司62",
      Condition1: "60后",
      Condition2: "甲",
      Condition3: "丑",
      Condition4: 50,
      EmployeeID: "13",
      Function: "基金运营",
      ID: 11761,
      Index1: 305353,
      Index2: 365743,
      Index3: 311346,
      Index4: 362286,
      Index5: 12961,
      Index6: 309263,
      Index7: 620028,
      Index8: 663992,
      Index9: 14334,
      Level: "初级",
      PositionLevel: "基金会计：初级专业员工",
      SubFunction: "基金会计",
    },
    {
      CompanyName: "公司62",
      Condition1: "60后",
      Condition2: "甲",
      Condition3: "丑",
      Condition4: 50,
      EmployeeID: "14",
      Function: "基金运营",
      ID: 11762,
      Index1: 831873,
      Index2: 838950,
      Index3: 851100,
      Index4: 844535,
      Index5: 4968,
      Index6: 437945,
      Index7: 1290931,
      Index8: 1297896,
      Index9: 14927,
      Level: "初级",
      PositionLevel: "基金会计：初级专业员工",
      SubFunction: "基金会计",
    },
    {
      CompanyName: "公司62",
      Condition1: "60后",
      Condition2: "甲",
      Condition3: "丑",
      Condition4: 50,
      EmployeeID: "15",
      Function: "基金运营",
      ID: 11763,
      Index1: 294884,
      Index2: 359503,
      Index3: 294584,
      Index4: 372122,
      Index5: -2126,
      Index6: 373207,
      Index7: 659794,
      Index8: 732187,
      Index9: 16146,
      Level: "初级",
      PositionLevel: "基金会计：初级专业员工",
      SubFunction: "基金会计",
    },
    {
      CompanyName: "公司62",
      Condition1: "60后",
      Condition2: "甲",
      Condition3: "丑",
      Condition4: 50,
      EmployeeID: "16",
      Function: "基金运营",
      ID: 11764,
      Index1: 488522,
      Index2: 595987,
      Index3: 490222,
      Index4: 618952,
      Index5: 15664,
      Index6: 229362,
      Index7: 719036,
      Index8: 839585,
      Index9: 11030,
      Level: "初级",
      PositionLevel: "基金会计：初级专业员工",
      SubFunction: "基金会计",
    },
  ],
  res_code: "00",
  res_msg: "",
  total_count: 131,
  total_page: 14,
};
message.config({
  top: 100,
  duration: 2,
  maxCount: 1,
  rtl: true,
});

const PageContext = () => {
  const [tableData, setTableData] = useState([]);
  const [columnData, setColumnData] = useState([]);
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
      url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/getproposebyuserno',
      params: {
        userNo: localStorage.getItem("UserNo"),
        pagesize: pagination.pageSize,
        pageindex: pagination.current,
      }
    }).then(res => {
      const {
        data
      } = res;
      setLoading(false)
      setTableData(data.data);
      setColumnData(data.column);
      setPagination({
        ...pagination,
        total: data.total_count
      })
    }, e => {
      // const {
      //   data,
      //   column
      // } = response;
      // setLoading(false)
      // setTableData(data);
      // setColumnData(column);
      // setPagination({
      //   ...pagination,
      //   total: response.total_page
      // })
      
      setLoading(false)
      console.log('错误', e)
    });
  }, [])

  const handleTableChange = (pagination) => {
    setLoading(true)
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/getproposebyuserno',
      params: {
        userNo: localStorage.getItem("UserNo"),
        pagesize: pagination.pageSize,
        pageindex: pagination.current,
      }
    }).then(res => {
      const {
        data
      } = res;
      setLoading(false)
      setTableData(data.data);
      setColumnData(data.column);
      setPagination({
        ...pagination,
        total: data.total_count
      })
    }, e => {
      setLoading(false)
      console.log('错误', e)
    });
  }

  
  return (
    <>
      <Layout>
        <Content>
          <DataTable
            tableData={tableData}
            columnData={columnData}
            loading={loading}
            rowKey={(record) => record["ID"]}
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
