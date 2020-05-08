
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { debounce } from 'lodash-es';
import classnames from 'classnames';
import { Menu, Switch } from 'antd';
import { InsertRowLeftOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const Sider = (props) => {
  const [current, setCurrent] = useState('1')

  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key)
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
        defaultOpenKeys={['search']}
        selectedKeys={['origin-search']}
        mode="inline"
      >
        {props.sideMenu.map((item) => {
          return <SubMenu key={item.key} icon={iconFactory(item.icon)} title={item.value}>
            {
              item.children.map(secItem => {
                return <Menu.Item key={secItem.key}>{secItem.value}</Menu.Item>
              })
            }
          </SubMenu>
        })}
      </Menu>
    </>
  );
};

export default hot(module)(Sider);
