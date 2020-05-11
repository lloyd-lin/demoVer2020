/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
// App.js
import React, { useState, useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import { debounce } from 'lodash-es';
import classnames from 'classnames';
import { Layout, Row, Col, Select, Input, Space, Button, Modal, message, Tooltip  } from "antd";
import { SearchOutlined } from '@ant-design/icons';
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

const defaultKeyEvent = () => {
  if (event.keyCode==13) {
    return;
  }
}

const PageContext = () => {
  const [conditionOne, setConditionOne] = useState('');
  const [conditionTwoMin, setConditionTwoMin] = useState('');
  const [conditionTwoMax, setConditionTwoMax] = useState('');
  const [tableData, setTableData] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPropose, setShowPropose] = useState(false);
  const [propose, setPropose] = useState('');
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: false,
    showQuickJumper: true,
    showTotal: total => `总条目 ${total} 条`
  });

  const conditionOneRef = useRef('');
  const conditionTwoMinRef = useRef('');
  const conditionTwoMaxRef = useRef('');
  useEffect(() => {
    document.onkeydown = keyevent;
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
      setColumnData(data.column);
      setPagination({
        ...pagination,
        total: data.total_count
      })
    }, e => {   
      setLoading(false)
      console.log('错误', e)
    });

    return () => {
      setTableData([])
      setColumnData([]);
      document.onkeydown = defaultKeyEvent;
    }
  }, [])

  useEffect(() => {
    conditionOneRef.current = conditionOne;
  }, [conditionOne]);
  useEffect(() => {
    conditionTwoMinRef.current = conditionTwoMin;
  }, [conditionTwoMin]);
  useEffect(() => {
    conditionTwoMaxRef.current = conditionTwoMax;
  }, [conditionTwoMax]);

  const keyevent = () => {
    if(event.keyCode==13) {
      searchAll();
    }
  }

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

  const handleOk = () => {
    setLoading(true)
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8888/DBManagementSystemWcf/export/savebyconditions',
      data: {
        con1: conditionOne,
        con4: `${conditionTwoMin || '*'}~${conditionTwoMax || '*'}`,
        proposeName: propose,
        userNo: localStorage.getItem('UserNo')
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      setLoading(false)
      message.info(res.data.Message);
      setShowPropose(false);
    }, e => {
      setLoading(false)
      message.info('保存方案失败');
    });
  }
  const handleCancel = () => {
    setShowPropose(false);
    setPropose('')
  }

  const searchAll = () => {
    setLoading(true);
    axios({
      method: "get",
      url:
        "http://127.0.0.1:8888/DBManagementSystemWcf/export/getbyconditions",
      params: {
        con1: conditionOneRef.current,
        con4: `${conditionTwoMinRef.current || "*"}~${
          conditionTwoMaxRef.current || "*"
        }`,
        pagesize: 10,
        pageindex: 1,
      },
    }).then(
      (res) => {
        const { data } = res;
        setLoading(false);
        setTableData(data.data);
        setColumnData(data.column);
        setPagination({
          ...pagination,
          pageSize: 10,
          current: 1,
          total: data.total_count,
        });
      },
      (e) => {
        setLoading(false);
        console.log("错误", e);
      }
    );
  }

  return (
    <>
      <Layout>
        <Header className="static-inner-header">
          <Row>
            <Col xs={24} sm={24} md={24} lg={14} xl={12}>
              <Space style={{ width: "100%" }}>
                {"筛选条件一"}
                <Select
                  mode="multiple"
                  style={{ minWidth: "30rem" }}
                  placeholder="选择筛选条件"
                  defaultValue={[]}
                  onChange={handleChange}
                  optionLabelProp="label"
                >
                  <Option value="前15" label="befor15">
                    <div className="demo-option-label-item">前15</div>
                  </Option>
                  <Option value="16至30" label="15to30">
                    <div className="demo-option-label-item">16至30</div>
                  </Option>
                  <Option value="31至60" label="31to60">
                    <div className="demo-option-label-item">31至60</div>
                  </Option>
                  <Option value="60后" label="after60">
                    <div className="demo-option-label-item">60后</div>
                  </Option>
                </Select>
              </Space>
            </Col>
            <Col xs={20} sm={20} md={20} lg={8} xl={8}>
              <Space>
                {"筛选条件四"}
                <Input
                  style={{ width: '80px' }}
                  placeholder={"最小值"}
                  onChange={(e) => setConditionTwoMin(e.currentTarget.value)}
                />
                {"~"}
                <Input
                  style={{ width: '80px' }}
                  placeholder={"最大值"}
                  onChange={(e) => setConditionTwoMax(e.currentTarget.value)}
                />
              </Space>
            </Col>
            <Col xs={4} sm={4} md={4} lg={1} xl={4}>
              <Tooltip title="检索">
              <Button
                shape="circle" 
                icon={<SearchOutlined />} 
                onClick={searchAll}
              />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ 'textAlign': 'center' }}>
              <Button
                type="primary"
                onClick={() => {
                  setShowPropose(true)
                }}
              >
                保存当前方案
              </Button>
            </Col>
          </Row>
        </Header>
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
        <Modal
          title="保存方案"
          visible={showPropose}
          onOk={handleOk}
          onCancel={handleCancel}
        >
           <Input
              value={propose}
              placeholder={"方案名"}
              onChange={(e) => setPropose(e.currentTarget.value)}
            />
        </Modal>
      </Layout>
    </>
  );
};

export default hot(module)(PageContext);
