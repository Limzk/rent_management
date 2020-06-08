<template>
  <div>
    <div class="search">
        <el-button  size="" @click="advancedSearch" type="text" :icon="showAdvancedSearch?'el-icon-arrow-up':'el-icon-arrow-down'">
            {{showAdvancedSearch?"隐藏":"显示"}}高级查询 &nbsp; &nbsp;
        </el-button>
        <el-input placeholder="请输入要查找的用户名或id" v-model="queryList.keyword" clearable size="medium" @keyup.enter.native="search"></el-input>
        <el-button size="medium" type="primary" @click="search">搜索 </el-button>
    </div>
    <!-- <transition> -->
    <div class="advanced_search" >
        <el-row :gutter="40">
            <el-col :span="6">
                <el-input placeholder="请输入要查找的用户名或id" v-model="queryList.keyword" clearable ></el-input>
            </el-col>
            <el-col :span="6">
                <el-select v-model="queryList.state" placeholder="请选择状态" clearable style="width:100%">
                    <el-option
                    v-for="item in state_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="12" >
                <el-date-picker
                  style="width:100%"
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="search"   
                ></el-date-picker>
            </el-col>
        </el-row>
        <div class="search_btn">
            <el-button size="medium" @click="reset">重置</el-button>
            <el-button size="medium" type="primary" @click="search">搜索</el-button>
        </div>
        
    </div>
    <!-- </transition> -->
    <el-table :data="list" border style="width: 100%" height="410" v-loading="loading" element-loading-text="拼命加载中"  :header-cell-style="headClass" size="mini" >
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="avatar" label="用户头像" align="center">
        <template slot-scope="scope">
          <img  class="user_avatar" :src="'http://47.107.235.13:80'+scope.row.avatar"/>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
            <el-tag :type="scope.row.state | toType">{{ scope.row.state | toState }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="bannedCount" label="已禁用次数" align="center"></el-table-column>
      <el-table-column prop="createTime" label="注册时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" align="center" width="">
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand" >
                <el-button type="primary"  size="mini" plain>
                  禁用<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item :command="beforeHandleCommand(scope.row,'20')" >20秒</el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(scope.row,'86400')">一天</el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(scope.row,'604800')">一星期</el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(scope.row,'2592000')">一个月</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>   
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 15, 20, 30]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import { parseTime } from "../../utils/parseTime";
export default {
  data() {
    return {
      list: [],
      showAdvancedSearch: false,
      loading: false,
      queryList:{
          page: 1,
          rows: 10,
      },
      state_options:[
        { label:"禁用",value: 0},
        { label:"正常",value: 1},
      ],
      date: [],
      list: [{state:1,id:1,username:"lwm"},{state:0,id:0,username:"aa"}],
      total: 0,
      currentPage: 1,
      pageSize:10,
      
    };
  },
  filters:{
    timeFilter(val){
      if(val) return parseTime(val)
    },
    toState(val) {
      switch (val) {
        case 0:
          return '禁用'
          break;
        case 1:
          return '正常'
          break;
      }
    },
    toType(val) {
      switch (val) {
        case 0:
          return 'danger'
          break;
      
        case 1:
          return 'success'
          break;
      }
    }
  },
  created() {
      this.fetchData()
  },
  methods: {
    headClass() {
      return "background:#f8f8f8;";
    },
    fetchData() {
      this.loading = true
      this.$http.userList(this.queryList).then( r =>{
        if( r.code === 10000) {
          this.loading = false
          this.total = r.data.totalCount
          this.list = r.data.data
        }
      }).catch( e => this.loading = false)
    },
    search() {
      if(this.date  && this.date.length !== 0) {
        this.queryList.startTime = new Date(this.date[0]).getTime()
        this.queryList.endTime = new Date(this.date[1]).getTime()
      }
      else{
        this.queryList.startTime = null
        this.queryList.endTime = null
      }
      // this.pageSize = 10
      this.queryList.page = 1
      this.currentPage = 1
      this.fetchData()
    },
    // 展开高级查询
    advancedSearch() {
      this.showAdvancedSearch = !this.showAdvancedSearch
      $('.advanced_search').stop().slideToggle(500)
    },
    // 重置
    reset() {
        this.date = []
        this.queryList = {
            page: 1,
            rows: 10,
        }
        this.currentPage = 1
        this.fetchData()
    },
    // 封装菜单项
    beforeHandleCommand(row,command) {
      return {
        'row':row,
        'command':command
      }
    },
    // 点击菜单项
    handleCommand(command) {
      let parse = parseInt(command.command)
      let time = this.timeTurn(parse)
      this.$confirm(`是否禁用用户${command.row.username}？时长为${time}${time===20?'秒':'天'}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.disable({
            id: command.row.id,
            time: parse,
            state: 0,
          }).then( r => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.fetchData()
          })
        }).catch(() => {

        });
    },
    // 时间换算
    timeTurn(val) {
      return val === 20?20:val/60/60/24
      //  return val/60/60/24
    },
    handleSizeChange(rows){
      this.queryList.rows = rows
      this.fetchData()
    },
    handleCurrentChange(page) {
      this.queryList.page = page
      this.fetchData()
    }
  }
};
</script>

<style scoped>
.v-enter-active .v-leave-active {
  transition: all 1s
}
.v-enter,
.v-leave-to{
  height: 0;
}
.search {
  margin-bottom: 15px;
  text-align: right;
}

.search .el-input{
  width: 230px;
  margin-left: 20px;
}
.advanced_search{
    display: none;
    background: #fcfcfc;
    margin: 10px 0;
    padding: 10px;
    padding-bottom: 10px;
    border: 1px solid #d8dce5;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.advanced_search .search_btn{
    text-align: right;
    margin-top:20px;
}
.el-pagination{
  float:right;
  margin-top: 10px;
}
/* .picture {
    width: 50px;
    height: 50px;
    border: 1px solid black;
} */
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>