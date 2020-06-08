<template>
  <div>
    <div class="search">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"    
          @change="search"
        ></el-date-picker>
        <el-input placeholder="请输入要查找的用户id" v-model="queryList.userId" clearable size="medium" @keyup.enter.native="search"></el-input>
        <el-button size="medium" type="primary" @click="search">搜索 </el-button>
    </div>
    <el-table :data="list" border style="width: 100%" height="410" v-loading="loading" element-loading-text="拼命加载中"  :header-cell-style="headClass" size="mini" >
       <el-table-column prop="id" label="用户id" align="center"></el-table-column>
        <el-table-column prop="avatar" label="用户头像" align="center" width="75">
          <template slot-scope="scope">
            <img  class="user_avatar" :src="'http://47.107.235.13:80'+scope.row.avatar"/>
          </template>
        </el-table-column>
      <el-table-column prop="fromName" label="用户名" align="center"></el-table-column>
      <el-table-column prop="toName" label="被评论用户名" align="center"></el-table-column>
      <el-table-column prop="itemName" label="物品名称" align="center"></el-table-column>
      <el-table-column prop="content" label="评论内容" align="center"></el-table-column>
      <el-table-column prop="thumbsUp" label="点赞数" align="center" width="60"></el-table-column>
      <el-table-column prop="createTime" label="评论时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" align="center" width="80">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                <el-button circle type="danger" icon="el-icon-delete" size="mini" @click="deleteReply(scope.row.id)"></el-button>
            </el-tooltip>
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
    name:"reply",
    data() {
        return {
            list: [{}],
            loading: false,
            queryList:{
                page: 1,
                rows: 10,
            },
            date:[],
            total: 0,
            currentPage: 1,
            pageSize:10,
        };
  },
  filters:{
    timeFilter(val) {
      if(val) return parseTime(val)
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
        this.$http.replyList(this.queryList).then( r =>{
          if( r.code === 10000) {
            this.loading = false
            this.total = r.data.totalCount
            this.list = r.data.data
          }
        }).catch( err => this.loading = false)
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
        this.queryList.page = 1
        // this.pageSize = 10
        this.currentPage = 1
        this.fetchData()
    },
    handleSizeChange(rows){
      this.queryList.rows = rows
      this.fetchData()
    },
    handleCurrentChange(page) {
      this.queryList.page = page
      this.fetchData()
    },
    deleteReply(id) {
      let ids = []
      ids.push(id)
      this.$http.deleteReply({
        ids: ids
      }).then( r => this.fetchData())
    }
  }
};
</script>

<style scoped>
.search {
  margin-bottom: 15px;
  text-align: right;
}
.search .el-date-editor{
  height: 35px;
  padding: 0 10px;
}
.search .el-input{
  width: 230px;
  margin-left: 20px;
}
.el-pagination{
  float:right;
  margin-top: 10px;
}
</style>