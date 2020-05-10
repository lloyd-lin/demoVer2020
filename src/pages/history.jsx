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
  const [proposename, setProposeName] = useState('');
  const [currentMode, setCurrentMode] = useState('propose');
  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setGraphData] = useState({});
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
      setLoading(false)
      console.log('错误', e)
    });
    return () => {
      setColumnData([]);
      setTableData([]);
    }
  }, [])

  const resetPaginationParam = () => {
    return {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
      showQuickJumper: true,
      showTotal: total => `总条目 ${total} 条`,
    }
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
      setProposeName(name);
      setCurrentMode('history')
      const {
        data
      } = res;
      setLoading(false)
      setTableData(data.data);
      setColumnData(data.column);
      setPagination({
        ...resetPaginationParam(),
        total: data.total_count
      })
    }, e => {
      
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
        proposename: proposename,
        pagesize: pagination.pageSize,
        pageindex: pagination.current,
      }
    }
    axios(param).then(res => {
      const {
        data
      } = res;
      setLoading(false)
      const newColumn = Array.from(data.column)
      if (currentMode === 'propose') {
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
      setColumnData(newColumn);
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
      url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/getproposebyuserno',
      params: {
        userNo: localStorage.getItem("UserNo"),
        pagesize: pagination.pageSize,
        pageindex: 1,
      }
    }).then(res => {
      setCurrentMode('propose')
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
        ...resetPaginationParam(),
        total: data.total_count
      })
    }, e => {
      
      setLoading(false)
      console.log('错误', e)
    })
  }

  const getGraph = () => {
    setLoading(true)
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/getstatisticsbyproposename',
      params: {
        proposeNameSet: JSON.stringify([proposename, ''])
      }
    }).then(res => {
      const { data: { AvgList: graphData , Axis} } = res;
      const interval = 50000
      setLoading(false)
      setGraphData({
        proposeName: graphData[0].ProposeName,
        dataColumn: Axis.AxisX,
        axisL: {
          min: Math.floor(Axis.MinValueY / interval) * interval,
          max: (Math.floor(Axis.MaxValueY / interval) + 1) * interval ,
          interval,
        },
        [graphData[0].ProposeName]: graphData[0].IndexSet,
        "all": graphData[1].IndexSet,
        "percentage": graphData[0].IndexSet.map((item, index) => {
          return ((item / graphData[1].IndexSet[index]) || 0).toFixed(2)
        }),
      })
      setShowGraph(true)
    }, e => {
      setLoading(false)
      console.log('错误', e)
    })
  }
  const closeGraph = () => {
    setShowGraph(false)
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
            <Button type="primary" onClick={getGraph}>
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
      <Modal
          title="统计结果"
          visible={showGraph}
          closable
          onCancel={closeGraph}
          footer={null}
          className="history-graph-modal"
          width={800}
        >
           <GraphArea myData={graphData}/>
        </Modal>
    </>
  );
};

export default hot(module)(PageContext);
