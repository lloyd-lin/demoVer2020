import React, { useState, useEffect }from 'react';
import { Table } from 'antd';

const DataTable = (props) => {
  const [columns, setColumns] = useState([]);
  const [scrollX, setScrollX] = useState(800);
  useEffect(() => {
    let columnData = props.columnData && props.columnData.map((key, index) => {
      if (key.Action) {
        return {
          title: key.Display,
          width: key.Width * 20,
          dataIndex: key.Name,
          key: key.Name,
          fixed: 'right',
          render: key.Action,
        }
      } else {
        return {
          title: key.Display,
          width: key.Width * 20,
          dataIndex: key.Name,
          key: key.Name,
          fixed: index === 0 ? 'left' : false,
        }
      }
    })
    setScrollX(columnData.reduce((current, next) => {
      return current + next.width + 5;
    }, 0))
    setColumns(columnData);
  }, [props.columnData])

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