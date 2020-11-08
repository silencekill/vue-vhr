<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">我的管理系统</div>
                <div>
                    <el-dropdown @command="commandHandler">
                        <span class="el-dropdown-link">
                            {{user.name}}<i><img :src="user.userface"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="setting">设置</el-dropdown-item>
                            <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-opened>
                        <el-submenu :index="index+''" v-for="(item, index) in routes" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i :class="item.iconCls" style="margin-right: 5px;color: #c55eff"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item :index="child.path" v-for="(child,childIndex) in item.children" :key="childIndex">{{child.name}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!=='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path==='/home'">
                        系统首页
                    </div>
                    <!--添加第二个router-view 来展示跳转的页面-->
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                user:JSON.parse(window.sessionStorage.getItem("user")),
            }
        },

        computed:{
            routes(){
                let routes =  this.$store.state.routes;
                return routes;
            }
        },

        methods:{
            commandHandler(command){
                // 注销登录
                if(command==="logout"){
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 退出登录
                        this.getRequest("logout");
                        // 清除用户数据
                        window.sessionStorage.removeItem("user");
                        // 清空菜单数据
                        this.$store.commit('initRoutes',[]);
                        // 路径到登录页面
                        this.$router.replace("/")
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            //当在el-menu添加 router属性时就不需要menuClick方法,会自动获取menu的path进行跳转
            /*menuClick(index,indexPath){
                // index 是当前选择菜单的 index
                // indexPath 是有个数组, 0是父级的index,1是当前的index
                this.$router.push(indexPath[1]);
            }*/
        }
    }
</script>

<style>
    .homeWelcome{
        color: #c55eff;
        text-align: center;
        font-size: 30px;
        padding-top: 50px;
        font-family: 楷体;
    }
    .homeHeader .title{
        color: #fff;
        font-family: 楷体;
        font-size: 30px;
    }
    .homeHeader{
        background: blue;
        /*垂直居中*/
        align-items: center;
        display: flex;
        /*空白的地方在中间*/
        justify-content: space-between;
        padding: 0px 15px;

        box-sizing: border-box;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #fff;
    }

    .el-dropdown-link img{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-left: 8px;
    }
    .el-dropdown-link{
        display: flex;
        align-items: center;
    }

</style>