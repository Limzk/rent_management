<template>
  <div id="echarts_pie" style="width: 100%;height:400px;"></div>
</template>

<script>
import echarts from "echarts";
import "echarts/theme/macarons.js";
// 引入柱状图
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
      option: {
        title: {
            text: "上架物品分类",
            x:"center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["体育器材", "电子产品", "书籍", "生活用品", "其他"]
        },
        series: [
          {
            name: "上架物品分类",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 0, name: "体育器材" },
              { value: 0, name: "电子产品" },
              { value: 0, name: "书籍" },
              { value: 0, name: "生活用品" },
              { value: 0, name: "其他" }
            ]
          }
        ]
      }
    };
  },
  props:["sendData"],
  mounted() {
    this.initChart()
    this.getChart();
  },
  methods: {
    initChart() {
      this.option.series[0].data.map( item =>{
        this.sendData.find( _item =>{
          if( _item.itemTypeName === item.name ) {
            item.value = _item.itemTypeNameCount
          }
        })
      })
    },
    getChart() {
      var myChart = echarts.init(
        document.getElementById("echarts_pie"),
        "macarons"
      );
      myChart.setOption(this.option);
    }
  }
};
</script>

<style>
</style>