module.exports = function () {
  return {
    presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
    plugins: [
      [
        'import',
        {
          libraryName: 'lodash-es',
          libraryDirectory: '',
          camel2DashComponentName: false,
        },
        'ldsh'
      ],
      ["import", {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css" // `style: true` 会加载 less 文件
      }, 'antd'],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
    ],
  };
};
