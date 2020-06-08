<template>
  <div class="content">
    <div class="content_title">
      <h2>闲租管理系统</h2>
      <el-dropdown style="float:right" @visible-change="dropChange" @command="logout"  trigger="click">
          <span class="el-dropdown-link"> 
            <span>林阿稳</span>
            <i :class="[ isdrop?'el-icon-arrow-up down':'el-icon-arrow-up up']"></i>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item >退出登录</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      <div class="adminAvatar"></div>
    </div>
    <el-container>
      <el-aside width="auto" >
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="isCollapse" :style="{ minHeight: asideHeight}">
          <router-link :to="item.path" v-for="(item,index) in navList" :key="index" @click.native="getHeight(item.index)">
            <el-menu-item :index="item.index">
              <i :class="item.class"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </router-link>

          <el-submenu :index="item.index" v-for="(item,index) in navChildList" :key="item.index">
            <template slot="title">
              <i :class="item.class"></i>
              <span slot="title">{{ item.title}}</span>
            </template>
            <el-menu-item-group>
              <router-link :to="childItem.path" v-for="(childItem,childIndex) in item.children" :key="childIndex" @click.native="getHeight(childItem.index)" >
                <el-menu-item :index="childItem.index">
                  <i :class="childItem.class"></i>
                  {{ childItem.title }}
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="line-height: 40px;" height="40px">
          <el-button
            @click="isCollapse = !isCollapse"
            icon="el-icon-s-fold"
            type="text"
            :class="[ isCollapse?'down':'up' ]"
          ></el-button>
        </el-header>
        <el-main >
          <div ref="main">
            <router-view ></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      isdrop: false,
      navList:[
        { title:'首页',path:'/home/index',index:'1',class:'el-icon-s-platform'},
        { title:'用户管理',path:'/home/user',index:'2',class:'el-icon-s-custom'},
      ],
      navChildList: [
        { title:'留言管理',index:'3',class:'el-icon-chat-line-round',children:[
          { title:'评论管理', path:'/home/messageManagement/comment',index:'3-1',class:'el-icon-edit'},
          { title:'回复管理', path:'/home/messageManagement/reply',index:'3-2',class:'el-icon-message'},
        ]},
        { title:'物品管理',index:'4',class:'el-icon-tickets',children:[
          { title:'上架物品',path:'/home/itemManagement/shelves',index:'4-1',class:'el-icon-top'},
          { title:'下架物品',path:'/home/itemManagement/soldOut',index:'4-2',class:'el-icon-bottom'},
          { title:'待审核物品',path:'/home/itemManagement/pending',index:'4-3',class:'el-icon-edit-outline'},
        ]},
      ],
      asideHeight: 0,
      activeIndex: "1"
    };
  },
  created() {
    if(sessionStorage.getItem("index")) this.activeIndex = sessionStorage.getItem("index")
  },
  mounted() {   
    // window.history.forward(-1)
    this.getHeight()
  },
  methods: {
    // toggleCollapse() {
    //   this.isCollapse = !this.isCollapse;
    // },
    // 点击菜单
    dropChange(val) {
      this.isdrop = val
    },
    // 获取内容区高度
    getHeight(index) {
      if(index) sessionStorage.setItem("index",index)
      this.asideHeight = this.$refs.main.scrollHeight+ 'px'

    },
    logout() {
      this.$confirm("是否退出当前用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
            duration: 1500
          });
          this.$router.push({ name: "login" });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>

.content {
}


.content .content_title {
  width: 100%;
  height: 60px;
  background: #253042;
  /* border-bottom: 2px solid rgb(203, 193, 214); */
  line-height: 60px;
  color: beige;
  padding: 0 40px;
  box-sizing: border-box;
}
.content .content_title h2 {
  display: inline-block;
  font-size: 18px;
  font-weight: normal;
}
.content .content_title .administrator {
  float: right;
}
.content .content_title .adminAvatar {
  float: right;
  width: 30px;
  height: 30px;
  border: 1px solid beige;
  margin: 14px;
  border-radius: 50%;
  background: url("../../assets/avatar.jpg");
  background-size: contain;
}
.content .content_title span{
  color: beige;
}
.content .content_title .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.content .content_title .el-dropdown-link span{
  margin-right:5px;
}
.content .content_title .el-dropdown-link  .down{
  transform: rotate(-180deg);
  transition: all .5s;
}
.content .content_title .el-dropdown-link  .up{
  transition: all .5s;
}
.content .el-aside{
  padding-top:38px;
}
.content .el-aside ul{
  /* min-height: 520px; */
}
.content .el-header {
  background: #f5f7f9;
  border-bottom: 2px solid rgb(203, 193, 214);
}
.content .el-header .down {
  transform: rotate(90deg);
  transition: all .5s
}
.content .el-header .up {
  transition: all .5s
}
.content .el-header .el-button {
  font-size: 16px;
}
.content .el-header .user {
  font-size: 13px;
  float: right;
  font-weight: 520;
}
.content .el-header .user a {
  cursor: pointer;
}
.content .el-main {
  border-left: 2px solid #e7e7e7;
  
}
.el-menu{
  border:none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* min-height: 400px; */
}
</style>