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
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
    ],
  };
};
