<template>
  <div id="echarts_line" style="width: 100%;height:400px;"></div>
</template>

<script>
import echarts from "echarts";
import "echarts/theme/macarons.js";
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
      // 指定图表的配置项和数据
      option: {
        // 标题
        title: {
          text: "一周新增数",
          textStyle:{ color: '#67c23a'}
        },
        // 提示框
        tooltip: {
          trigger: "axis"
        },
        // 说明
        legend: {
          data: ["新增用户数量","新增上架数量"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        // x坐标
        xAxis: {         
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "新增用户数量",
            type: "line",
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "新增上架数量",
            type: "line",
            data: [0, 0, 0, 0, 0, 0, 0]
          },
        ]
      }
    };
  },
  props:["sendData"],
  mounted() {
    this.initChart();
    this.getChart();
  },
  methods: {
    initChart() {
      for (var i = 0; i < 7; i++) {
        let weeks = [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ]; //星期映射数组
        let nowDay = new Date(); // 获取当天日期
        let lastDate = nowDay.getTime() - 1000 * 60 * 60 * 24 * i; //当i为0代表当前日期
        let lastDay = new Date(lastDate).getDay(); // 获取过去星期
        this.option.xAxis.data.unshift(weeks[lastDay]);
      }
      if(this.sendData.length != 0) {
        this.option.series[0].data = this.sendData[0].data.reverse()
        this.option.series[1].data = this.sendData[1].data.reverse()
      }
    },
    getChart() {
      var myChart = echarts.init(
        document.getElementById("echarts_line"),
        "macarons"
      );
      myChart.setOption(this.option);
    }
  }
};
</script>

<style>
</style>