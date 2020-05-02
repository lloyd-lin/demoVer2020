import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import classnames from 'classnames';
import './styles/base.scss';
import './styles/demo.scss';

import menuConfig from '../config/menu';
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

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      Our React Router 4 App
    </header>
    <main>
      <Route path="/" exact component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </main>
  </div>
)

const HomePage =() =>  <div className="pages">
<div className="header">
  <div className="logo">
    <div className="logo-wrap">
      <img alt="logo" />
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
const UsersPage = () => <div>Users Page</div>

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('app'))