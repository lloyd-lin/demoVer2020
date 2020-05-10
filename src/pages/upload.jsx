import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Input, Button, message, Upload, Row, Col, Space, Progress  } from 'antd';
import { UploadOutlined, CaretRightOutlined, DeleteOutlined } from '@ant-design/icons';
import { hot } from 'react-hot-loader';
import axios from 'axios';

import './styles/login.scss'

const { Header, Footer, Sider, Content } = Layout;
message.config({
  top: 400,
  duration: 2,
  maxCount: 1,
  rtl: true,
});



const UploadPage = (props) => {
    window.axios =axios;
    const [filePath, setFilePath] = useState('');
    const [importProgress, setImportProgress] = useState(0);
    const [importStatus, setImportStatus] = useState('未导入');
    let traceId = "";
    useEffect(() => {
    },[]) 

    const uploadAction = () => {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8888/DBManagementSystemWcf/upload/uploadexcel',
        data: {
          userNo: localStorage.getItem('UserNo'),
          path: filePath,
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res=> {
        if (res.data.Success) {
          setImportStatus("开始导入")
          traceId = res.data.TraceID
          queryImportStatus();
        } else {
          setImportStatus("原始数据导入异常")
        }
      }, e => {
        setImportStatus('原始数据导入失败，请确认路径')
      });
    }
    
    const queryImportStatus = () => {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8888/DBManagementSystemWcf/upload/queryupdateprocess',
        params: {
          userNo: localStorage.getItem("UserNo"),
          traceId
        }
      }).then(res=> {
        const { Message, OpProcess: { CurrentCount, RecordCount} , Success } = res.data;
        if (Success) {
          // 退出轮训
          if (CurrentCount === RecordCount) {    
            setImportProgress(100)
            setImportStatus(Message)
          } else {
            setImportStatus(Message)
          }
        } else {
          setImportProgress((CurrentCount / RecordCount * 100).toFixed(0))
          setImportStatus(`${Message} ${CurrentCount}/${RecordCount}`)
          setTimeout(queryImportStatus, 300)
        }
      }, e => {
        
      });
    }

    const clearDatabase = () => {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8888/DBManagementSystemWcf/upload/clear',
      }).then(res => {
        if (res.data.Success) {
          message.info("原始数据清除完成")
        } else {
          message.info("原始数据清除失败")
        }
      }, e => {
        message.info("原始数据清除失败")
      })
    }
    return (
      <Layout className="upload-page">
        <Content>
          <Row>
            <Space>
              <Col span={12}>
              <Input
                placeholder={"文件路径"}
                onChange={(e) => setFilePath(e.currentTarget.value)}
                style={{ width: 500 }}
              />
              </Col>
              <Col span={4}>
                <Button onClick={uploadAction}>
                  <CaretRightOutlined /> 导入
                </Button>
              </Col>

              <Col span={4}>                
                <Button onClick={clearDatabase}>
                  <DeleteOutlined  /> 清除
                </Button>
              </Col>
            </Space>
          </Row>
          <Row>
            <Col span={8}>      
              <Progress percent={importProgress} />
            </Col>
          </Row>
          <Row>     
            <Col span={4}>      
              {importStatus}
            </Col>
          </Row>
        </Content>
      </Layout>
    );
}

export default hot(module)(withRouter(UploadPage));