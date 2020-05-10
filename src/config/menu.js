export default [
  {
    key: 'user',
    value: '用户管理',
    icon: 'SettingOutlined',
    children: [
      {
        key: 'auth',
        value: '用户授权',
        icon: '',
      },
      {
        key: 'manager-pwd',
        value: '密码管理',
        icon: '',
      },
      {
        key: 'log',
        value: '日志查看',
        icon: '',
      },
    ]
  },
  {
    key: 'search',
    value: '数据检索',
    icon: 'InsertRowLeftOutlined',
    children: [
      {
        key: 'origin-search',
        value: '原始数据检索查询',
        icon: '',
      },
      {
        key: 'history-search',
        value: '历史方案查询',
        icon: '',
      },
      {
        key: 'file-upload',
        value: '原始数据上传',
        icon: '',
      },
    ]
  }
];
