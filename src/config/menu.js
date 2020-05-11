export default [
  {
    key: 'user',
    value: '用户管理',
    icon: 'SettingOutlined',
    children: [
      {
        key: 'user-auth',
        value: '用户授权',
        icon: '',
      },
      {
        key: 'user-manager-pwd',
        value: '密码管理',
        icon: '',
      },
      {
        key: 'user-log',
        value: '日志查看',
        icon: '',
      },
    ]
  },
  {
    key: 'data',
    value: '数据检索',
    icon: 'InsertRowLeftOutlined',
    children: [
      {
        key: 'data-origin',
        value: '原始数据检索查询',
        icon: '',
      },
      {
        key: 'data-history',
        value: '历史方案查询',
        icon: '',
      },
      {
        key: 'data-upload',
        value: '原始数据上传',
        icon: '',
      },
    ]
  }
];
