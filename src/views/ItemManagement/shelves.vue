<template>
  <div>
    <div class="search">
      <el-button  size="" @click="advancedSearch" type="text" :icon="showAdvancedSearch?'el-icon-arrow-up':'el-icon-arrow-down'">
            {{showAdvancedSearch?"隐藏":"显示"}}高级查询 &nbsp; &nbsp;
        </el-button>
      <el-input placeholder="请输入查找的物品名称" v-model="queryList.itemName" clearable size="medium" @keyup.enter.native="search"></el-input>
      <el-button size="medium" type="primary" @click="search">搜索</el-button>
    </div>
    <div class="advanced_search" >
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input placeholder="请输入查找的物品名称" v-model="queryList.itemName" clearable ></el-input>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="请输入要查找的用户id" v-model="queryList.userId" clearable ></el-input>
            </el-col>
            <el-col :span="4">
                <el-select v-model="queryList.chargeType" placeholder="请选择收费类型" clearable>
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <el-date-picker
                    style="width:100%"
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </el-col>
        </el-row>
        <div class="search_btn">
            <el-button size="medium" @click="reset">重置</el-button>
            <el-button size="medium" type="primary" @click="search">搜索</el-button>
        </div>
        
    </div>
    <el-table :data="list" border style="width: 100%" height="410" v-loading="loading" element-loading-text="拼命加载中"  :header-cell-style="headClass" size="mini" >
      <el-table-column prop="id" label="物品id" align="center"></el-table-column>
      <el-table-column prop="itemPicture" label="物品图片" align="center" width="75">
          <template slot-scope="scope">
              <img  class="user_avatar" :src="'http://47.107.235.13:80'+scope.row.itemPicture"/>
        </template>
      </el-table-column>
      <el-table-column prop="itemName" label="物品名称" align="center" ></el-table-column>
      <el-table-column prop="userId" label="上传用户" align="center"></el-table-column>
      <el-table-column prop="chargeType" label="收费类型" align="center" width="95">
        <template slot-scope="scope">
          <el-tag type="success">{{ scope.row.chargeType | toType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="金额" align="center" width="50"></el-table-column>
      <el-table-column prop="deposit" label="押金" align="center" width="50"></el-table-column>
      <el-table-column prop="contactPerson" label="联系人" align="center" ></el-table-column>
      <el-table-column prop="contactPlace" label="联系地点" align="center" ></el-table-column>
      <el-table-column prop="contactWay" label="联系方式" align="center" ></el-table-column>
      <el-table-column prop="createTime" label="上传时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" align="center" width="60">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="下架" placement="bottom">
                <el-button circle type="danger" icon="el-icon-close" size="mini" @click="soldOut(scope.row.id,scope.row.itemName)"></el-button>
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
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { parseTime } from "../../utils/parseTime";
export default {
  name: "shelves",
  data() {
    return {
      list: [{id:0}],
      queryList:{
          page: 1,
          rows: 10,
          state:1,
      },
      options:[
          { label:"按时收费",value: 0},
          { label:"按天收费",value: 1},
      ],
      date:[],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      showAdvancedSearch: false,
      loading: false
    };
  },
  filters: {
    toType(val) {
      switch (val) {
        case 0:
          return "按时收费";
          break;
        case 1:
          return "按天收费"
          break;
      }
    },
    timeFilter(val) {
      if(val) return parseTime(val)
    }
  },
  created() {
      this.fetchData()
  },
  methods: {
    // 表头颜色
    headClass() {
      return "background:#f8f8f8;";
    },
    // 加载数据
    fetchData() {
        this.loading = true
        this.$http.itemList(this.queryList).then( r =>{
          if( r.code === 10000) {
            this.loading = false
            this.total = r.data.totalCount
            this.list = r.data.data
          }
        }).catch( err => this.loading = false)
    },
    // 查找
    search() {
        if(this.date && this.date.length !== 0) {
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
            state:1,
        }
        // this.pageSize = 10
        this.currentPage = 1
        this.fetchData()
    },
    // 上架操作
    soldOut(id,name) {
      this.$confirm(`是否将物品'${name}'下架？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.changeItemState({
            id: id,
            state: -2
          }).then( r => {
            this.$message({
              type: "success",
              message: "下架成功!",
              duration: 1500
            });
            this.fetchData()
          })
        })
        .catch(() => {});
    },
    // 页码改变
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
.search {
  margin-bottom: 15px;
  text-align: right;
}
.search span{
  font-size: 14px;
  cursor: pointer;
}
.search .el-input {
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
.el-pagination {
  float: right;
  margin-top: 10px;
}
.picture {
    width: 50px;
    height: 50px;
    border: 1px solid black;
}
</style>