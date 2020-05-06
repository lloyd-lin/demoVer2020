import React, { useState, useEffect } from "react";
import classNames from "classnames";
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

const GraphArea = (props) => {
  const [showGraph, setShowGraph] = useState(true);

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const data = props.myData;

    const filterData = data.reduce((current, nextPersion) => {
      const key = nextPersion.address;
      const currentAgeArr = current[key] && current[key].ageArr;
      if (currentAgeArr) {
        currentAgeArr.push(nextPersion.age)
        current[key].avg = currentAgeArr.reduce((all, next) => all + next, 0) / currentAgeArr.length;
        return current;
      } else {
        return Object.assign({}, current, {
          [key]: {
            ageArr: [nextPersion.age],
            avg: nextPersion.age,
          }
        })
      }
    }, {})

    console.log('after filter:', filterData)
    const myChart = echarts.init(document.getElementById("graphArea"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "各街区年龄平均值",
      },
      tooltip: {},
      xAxis: {
        data: Object.keys(filterData),
      },
      yAxis: {},
      series: [
        {
          name: "年龄",
          type: "bar",
          data: Object.keys(filterData).map((blockName) => {
            return  filterData[blockName].avg
          }),
          barWidth: 40,
        },
      ],
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
