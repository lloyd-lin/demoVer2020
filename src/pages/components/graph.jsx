import React, { useState, useEffect } from "react";
import classNames from "classnames";
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/axisPointer");

const GraphArea = (props) => {
  const [showGraph, setShowGraph] = useState(true);

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const data = props.myData;
    const myChart = echarts.init(document.getElementById("graphArea"));
    // 绘制图表
    myChart.setOption({
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              crossStyle: {
                  color: '#999'
              }
          }
      },
      toolbox: {
          feature: {
              dataView: {show: true, readOnly: true},
              restore: {show: true},
              saveAsImage: {show: true}
          },
          top: -10,
      },
      legend: {
          data: [data.proposeName, '全体样本', '样本与全体比例关系']
      },
      xAxis: [
          {
              type: 'category',
              data: data.dataColumn,
              axisPointer: {
                  type: 'shadow'
              }
          }
      ],
      yAxis: [
        {
            type: 'value',
            name: '数值',
            min: data.axisL.min,
            max: data.axisL.max,
            interval: data.axisL.interval,
            axisLabel: {
              formatter: '{value}'
            }
        },
        {
          type: 'value',
          name: '比例关系',
          min: 0,
          max: 1.5,
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: '{value} %'
          }
        },
      ],
      series: [
          {
              name: data.proposeName,
              type: 'bar',
              data: data[data.proposeName]
          },
          {
              name: '全体样本',
              type: 'bar',
              data: data['all']
          },
          {
              name: '样本与全体比例',
              type: 'line',
              yAxisIndex: 1,
              data: data['percentage']
          }
      ]
    });
  });

  return (
    <div
      id="graphArea"
      className={classNames(showGraph ? "show" : "hide")}
    ></div>
  );
};

export default GraphArea;
