import React, { useState, useEffect }from 'react';
import { Table } from 'antd';

const DataTable = (props) => {
  const [columns, setColumns] = useState([]);
  const [scrollX, setScrollX] = useState(800);
  useEffect(() => {
    if (props.tableData.length ===0) {
      return;
    }
    let columnData = props.tableData && props.tableData[0] && Object.keys(props.tableData[0]).map((key, index) => {
      return {
        title: key,
        width: (Math.floor(key.length / 5) || 1) * 100,
        dataIndex: key,
        key,
        fixed: index === 0 ? 'left' : false,
      }
    })
    const tableData = props.tableData.map((item, index) => {
      item.key = index;
      return item;
    })
    setScrollX(columnData.reduce((current, next) => {
      return current + next.width + 5;
    }, 0))
    setColumns(columnData);
  }, [props.tableData])

  return (
    <div>
      <div style={{ marginBottom: 16 }}></div>
      <Table
        columns={columns}
        dataSource={props.tableData}
        scroll={{ x: scrollX, y: 800 }}
        {...props}
      />
    </div>
  );
}

export default DataTable;