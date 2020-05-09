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
  "column": [{
    "Display": "方案名称",
    "Name": "ProposeName",
    "Width": 4
  }, {
    "Display": "筛选条件1",
    "Name": "Condition1",
    "Width": 7
  }, {
    "Display": "筛选条件2",
    "Name": "Condition2",
    "Width": 5
  }, {
    "Display": "筛选条件3",
    "Name": "Condition3",
    "Width": 5
  }, {
    "Display": "筛选条件4",
    "Name": "Condition4",
    "Width": 5
  }, {
    "Display": "提交时间",
    "Name": "CreateTime",
    "Width": 16
  }],
  "current_page": 1,
  "data": [{
    "Condition1": "[\"前15\"]",
    "Condition2": null,
    "Condition3": null,
    "Condition4": "12~60",
    "CreateTime": "2020\/5\/9 8:39:51",
    "ID": 1,
    "ProposeName": "方案1"
  }],
  "res_code": "00",
  "res_msg": "",
  "total_count": 1,
  "total_page": 1
}

const response2 = {
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

const graph1 = {
  "AvgValue": {
    "Index1": 200609.47,
    "Index2": 224124.23,
    "Index3": 204702.80,
    "Index4": 230743.72,
    "Index5": 4517.49,
    "Index6": 194910.03,
    "Index7": 396512.16,
    "Index8": 406403.07,
    "Index9": 8704.25
  },
  "Message": "统计方案平均值完成",
  "ProposeName": "方案1"
}

const graph2 = {
  "AvgValue": {
    "Index1": 305723.26,
    "Index2": 326539.13,
    "Index3": 338491.94,
    "Index4": 350407.49,
    "Index5": 32936.275,
    "Index6": 403612.38,
    "Index7": 715284.48,
    "Index8": 713130.08,
    "Index9": 9347.38,
  },
  "Message": "统计方案平均值完成",
  "ProposeName": null
}

const myData = {
  proposeName: graph1.ProposeName,
  dataColumn: Object.keys(graph1['AvgValue']),
  axis: {
    min: 0,
    max: 750000,
    interval: 50000,
  },
  "方案1": Object.keys(graph1['AvgValue']).reduce((current, next) => {
    current.push(graph1['AvgValue'][next])
    return current;
  }, []),
  "all": Object.keys(graph2['AvgValue']).reduce((current, next) => {
    current.push(graph2['AvgValue'][next])
    return current;
  }, []),
  "percentage": Object.keys(graph2['AvgValue']).reduce((current, next) => {
    current.push(graph1['AvgValue'][next] / graph2['AvgValue'][next])
    return current;
  }, [])
}
const PageContext = () => {
  const [tableData, setTableData] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState('propose');
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
      const newColumn = Array.from(data.column)
      newColumn.push({
        "Display": "操作",
        "Name": "Action",
        "Width": 10,
        "Action": (text, record) => (
          <Space size="middle">
            <a onClick={browseHistory.bind(null, record.ProposeName)}>查看历史数据</a>
          </Space>
        ),
      })
      setLoading(false)
      setTableData(data.data);
      setColumnData(newColumn);
      setPagination({
        ...pagination,
        total: data.total_count
      })
    }, e => {
      // const { column, data } = response;
      // setLoading(false)
      // const newColumn = Array.from(column)
      // newColumn.push({
      //   "Display": "操作",
      //   "Name": "Action",
      //   "Width": 10,
      //   "Action": (text, record) => (
      //     <Space size="middle">
      //       <a onClick={browseHistory.bind(null, record.ProposeName)}>查看历史数据</a>
      //     </Space>
      //   ),
      // })
      // setTableData(data);
      // setColumnData(newColumn);
      // setPagination({
      //   ...pagination,
      //   total: response.total_page
      // })
      
      // setLoading(false)
      console.log('错误', e)
    });
    return () => {
      setColumnData([]);
      setTableData([]);
    }
  }, [])

  const resetPaganation = () => {
    setPagination({
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
      showQuickJumper: true,
      showTotal: total => `总条目 ${total} 条`,
    })
  }

  const browseHistory = (name) => {
    setLoading(true)
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/getbyproposename',
      params: {
        proposename: name,
        pagesize: pagination.pageSize,
        pageindex: 1,
      }
    }).then(res => {
      setCurrentMode('history')
      resetPaganation();
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
      // setCurrentMode('history')
      // const { column, data } = response2;
      // setLoading(false)
      // setTableData(data);
      // setColumnData(column);
      // setPagination({
      //   current: 1,
      //   pageSize: 10,
      //   showSizeChanger: false,
      //   showQuickJumper: true,
      //   showTotal: total => `总条目 ${total} 条`,
      //   total: response2.total_page,
      // })
      
      setLoading(false)
      console.log('错误', e)
    })
  }

  const handleTableChange = (pagination) => {
    setLoading(true)
    const param = currentMode === 'propose' ? {
      method: 'get',
      url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/getproposebyuserno',
      params: {
        userNo: localStorage.getItem("UserNo"),
        pagesize: pagination.pageSize,
        pageindex: pagination.current,
      }
    } : {
      method: 'get',
      url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/getbyproposename',
      params: {
        pagesize: pagination.pageSize,
        pageindex: pagination.current,
      }
    }
    axios(param).then(res => {
      const {
        data
      } = res;
      setLoading(false)
      if (currentMode === 'propose') {
        const newColumn = Array.from(data.column)
        newColumn.push({
          "Display": "操作",
          "Name": "Action",
          "Width": 10,
          "Action": (text, record) => (
            <Space size="middle">
              <a onClick={browseHistory.bind(null, record.ProposeName)}>查看历史数据</a>
            </Space>
          ),
        })
      }
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

  const backToProposeList = () => {
    setLoading(true)
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/getbyproposename',
      params: {
        pagesize: pagination.pageSize,
        pageindex: 1,
      }
    }).then(res => {
      setCurrentMode('propose')
      const {
        data
      } = res;
      resetPaganation();
      const newColumn = Array.from(data.column)
      newColumn.push({
        "Display": "操作",
        "Name": "Action",
        "Width": 10,
        "Action": (text, record) => (
          <Space size="middle">
            <a onClick={browseHistory.bind(null, record.ProposeName)}>查看历史数据</a>
          </Space>
        ),
      })
      setLoading(false)
      setTableData(data.data);
      setColumnData(newColumn);
      setPagination({
        ...pagination,
        total: data.total_count
      })
    }, e => {
      // const { column, data } = response;
      // setLoading(false)
      // const newColumn = Array.from(column)
      // newColumn.push({
      //   "Display": "操作",
      //   "Name": "Action",
      //   "Width": 10,
      //   "Action": (text, record) => (
      //     <Space size="middle">
      //       <a onClick={browseHistory.bind(null, record.ProposeName)}>查看历史数据</a>
      //     </Space>
      //   ),
      // })
      // setTableData(data);
      // setColumnData(newColumn);
      // setPagination({
      //   current: 1,
      //   pageSize: 10,
      //   showSizeChanger: false,
      //   showQuickJumper: true,
      //   showTotal: total => `总条目 ${total} 条`,
      //   total: response2.total_page,
      // })
      
      // setLoading(false)
      console.log('错误', e)
    })
  }
  return (
    <>
      <Layout>
        {currentMode === 'history' && <Header className="static-inner-header">
          <Row>
            <Col span={4}>
            <Button type="primary" onClick={backToProposeList}>
              返回方案列表
            </Button>
            </Col>
            <Col span={4}>
            <Button type="primary" onClick={()=> {
            }}>
              生成统计
            </Button>
            </Col>
          </Row>
        </Header>}
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
      <GraphArea myData={myData}/>
    </>
  );
};

export default hot(module)(PageContext);
