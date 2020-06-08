<template>
  <div>
    <el-row :gutter="40" >
      <el-col  :sm="6" :xs="12">
        <!-- <el-card class="box-card" shadow="hover">
          <div class="picture"></div>
          <div class="number" style="margin-top:3px">
            <strong>{{ systemCount.newUserCount }}</strong>
          </div>
          <div class="title" style="margin-top:5px;margin-bottom:0">
            <p style="font-size:13px;font-weight:550;color:#e6a33e" >当日新增用户</p>
          </div>
        </el-card> -->
        <el-card class="box-card" shadow="hover">
          <div class="title">
            <h2>当日新增用户</h2>
          </div>
          <div class="number">
            <h2 style="color:#e6a33e">{{ systemCount.newUserCount }}</h2>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="6" :sm="6" :xs="12">
        <el-card class="box-card" shadow="hover">
          <div class="title">
            <h2>用户总数</h2>
          </div>
          <div class="number">
            <h2 style="color:#67c23a">{{ systemCount.allUserCount }}</h2>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="6" :sm="6" :xs="12">
        <el-card class="box-card" shadow="hover">
          <div class="title">
            <h2>上架物品总数</h2>
          </div>
          <div class="number">
            <h2 style="color:#409eff">{{ systemCount.itemOnShelvesCount }}</h2>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="6" :sm="6" :xs="12">
        <el-card class="box-card" shadow="hover">
          <div class="title">
            <h2>待审核物品数</h2>
          </div>
          <div class="number">
            <h2 style="color:#f56c6c">{{ systemCount.itemReviewCount }}</h2>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="40" style="margin-top:40px">
      <el-col :lg="12" :md="24" >
        <div class="chart-wrapper">
            <line-chart v-if="show" :sendData="lineData"></line-chart>
        </div>
      </el-col>
      <el-col :lg="12" :md="24">
        <div class="chart-wrapper" style="padding-top:30px">
            <pie-chart v-if="show" :sendData="pieDate"></pie-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from "./components/lineChart";
import PieChart from "./components/pieChart";
export default {
  name: "index",
  components: {
    LineChart,
    PieChart
  },
  data() {
    return {
      show:false,
      systemCount:{},
      lineData: [],
      pieDate: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$http.getData().then( r =>{
        if(r.code === 10000) {
          this.systemCount = r.data
          this.lineData = this.systemCount.oneWeekNewList
          this.pieDate = this.systemCount.itemTypeList
          this.show = true
        }
      })
    }
  },
};
</script>

<style scoped>
.el-card__body .title {
  text-align: center;
  font-size: 10px;
  margin-bottom: 8px;
}
.el-card__body .number {
  text-align: center;
  font-size: 25px;
}
/* .el-card__body .picture {
  width:16%;
  height: 35px;
  margin: 0 auto;
  background: url("../../assets/addUser.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
} */
.chart-wrapper {
    padding-left:25px;
}

</style>