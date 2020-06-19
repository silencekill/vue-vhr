<template>
    <div>
        <!--rules:添加定义校验规则-->
        <!--loginForm:默认值-->
        <!--ref 类似于id 通过此属性获取元素-->
        <el-form :rules="rules" :model="loginForm" ref="loginForm" class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <!--prop：使用校验的时候需要添加prop属性-->
            <!--auto-complete 需不需要自动补全-->
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="输入用户名"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="输入密码"/>
            </el-form-item>

            <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>

            <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                // checkbox默认值
                checked:true,
                // username password的默认值
                loginForm:{
                  username:"admin",
                  password:"123",
                },
                // 验证规则
                rules:{
                    username:[{required:true,message:"请输入用户名",trigger:"blur"}],
                    password:[{required:true,message:"请输入密码",trigger:"blur"}],
                }
            }
        },
        methods:{
            // 登录点击事件
            submitLogin(){
                // 通过this.$refs获取此页面所有的ref属性的元素
                // .loginForm获取ref=loginForm的元素
                // .validate 验证数据
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        alert('submit!');

                    } else {
                        //提示错误信息
                        this.$message.error('请输入完整字段');
                        return false;
                    }
                })
            }
        }

    }
</script>

<style>
    .loginContainer{
        border: 1px solid #eaeaea;
        border-radius: 15px;
        background-clip: padding-box;
        margin: 220px auto;
        width: 300px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        box-shadow: 0 0 25px #c6c6c6;
    }
    .loginTitle{
        margin: 0 auto 15px auto;
        text-align: center;
        color: #505458;
    }
    .loginRemember{
        margin-bottom: 15px;
    }
</style>