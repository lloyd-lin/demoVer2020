/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
// App.js
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import { debounce } from 'lodash-es';
import classnames from 'classnames';
import menuConfig from '../config/menu';
// eslint-disable-next-line import/no-named-as-default
import pages from '../docs';

let frameLoad = false;
let editorCode = '';
const typeOf = obj => Object.prototype.toString.call(obj).slice(8, -1);
const getMenu = menu => Object.keys(menu).map((key, index) => {
  const menuObj = menu[key];
  if (typeOf(menuObj) === 'Object') {
    return (
      <div className="nav-level" key={`${key}.${index}`}>
        <span className="nav-name">{key}</span>
        {getMenu(menuObj)}
      </div>
    );
  }
  return (
    <a key={`${key}.${index}`} className={classnames('nav-item')} href={`#/docs/${key}`}>
      {menu[key]}
    </a>
  );
});

const App = () => {
  return (
    <div className="pages">
      <div className="header">
        <div className="logo">
          <div className="logo-wrap">
            <img src={headerLogo} alt="logo" />
          </div>
        </div>
        <div className="menu-wrap">
          <ul className="menu">
            <li className="menu-item">组件</li>
            <li className="menu-item">首页</li>
          </ul>
        </div>
      </div>
      <div className="main">
        <div className="nav">{getMenu(menuConfig)}</div>
      </div>
    </div>
  );
};

export default hot(module)(App);
