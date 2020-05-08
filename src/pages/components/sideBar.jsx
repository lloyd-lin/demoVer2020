
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { debounce } from 'lodash-es';
import classnames from 'classnames';
import { Menu, Switch } from 'antd';
import { InsertRowLeftOutlined, SettingOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

const { SubMenu } = Menu;
const Sider = (props) => {
  const [current, setCurrent] = useState(['origin-search','search'])

  const handleClick = e => {
    setCurrent(e.keyPath)
    props.handleSideBar(e.keyPath);
  };

  const iconFactory = (iconName) => {
    if (iconName === 'SettingOutlined') {
      return <SettingOutlined />;
    } else if (iconName ==='InsertRowLeftOutlined') {
      return <InsertRowLeftOutlined />
    }
    return null;
  }
  return (
    <>  
      <Menu
        theme={'dark'}
        onClick={handleClick}
        style={{ width: 200 }}
        defaultOpenKeys={[current[1]]}
        selectedKeys={[current[0]]}
        mode="inline"
      >
        {props.sideMenu.map((item) => {
          return <SubMenu key={item.key} icon={iconFactory(item.icon)} title={item.value}>
            {
              item.children.map(secItem => {
                return <Menu.Item key={secItem.key} onClick={() => {

                  props.history.push(`/${secItem.key}`);
                }}>{secItem.value}</Menu.Item>
              })
            }
          </SubMenu>
        })}
      </Menu>
    </>
  );
};

export default hot(module)(withRouter(Sider));
