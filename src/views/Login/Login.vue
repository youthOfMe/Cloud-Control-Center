<template>
    <div class="login box">
        <img src="../../assets/login.jpg" alt="" />
        <div class="login">
            <div class="login-title">
                <p class="hi">Hello,肖学长!</p>
            </div>
            <div class="login_box">
                <div class="title">
                    <span>登录</span>
                </div>
                <div class="inp">
                    <el-form
                        ref="formRef"
                        :model="userForm"
                        status-icon
                        :rules="loginRules"
                        label-width="65px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="用户名" prop="username">
                            <el-input
                                v-model="userForm.username"
                                type="text"
                                @keyup.enter="this.$refs.password.focus()"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input
                                ref="password"
                                v-model="userForm.password"
                                type="password"
                                autocomplete="off"
                                @keyup.enter="login(formRef)"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button class="login_btn" @click="login(formRef)">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reqLogin } from '../../api/user/index.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'

// 提交登录信息
const userStore = useUserStore()
const userForm = ref({})
const router = useRouter()
const login = (formEl) => {
    if (!formEl) return
    formEl.validate(async (valid, obj) => {
        if (!valid) {
            // 报错
            let err = ''
            for (let key in obj) {
                err += obj[key][0].message + '  '
            }
            ElMessage({
                message: err,
                type: 'error',
            })
            return
        }
        const response = await reqLogin(userForm.value)
        if (response.code || !response)
            return ElMessage({
                message: response.message || '请求数据失败, 请联系管理员',
                type: 'error',
            })
        ElMessage({
            message: '认证成功, 欢迎你管理员',
            type: 'success',
        })
        // window.localStorage.setItem('token', response.access)
        userStore.setToken(response.access)
        router.push('/')
    })
}

// 定义校验规则
const formRef = ref()
const loginRules = {
    username: [
        {
            required: true,
            message: '用户名必须进行填写',
            trigger: 'blur',
        },
        {
            min: 3,
            max: 18,
            message: '用户名长度在3到18个字符',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '用户密码必须进行填写',
            trigger: 'blur',
        },
        {
            min: 4,
            max: 18,
            message: '密码长度在4到18个字符',
            trigger: 'blur',
        },
    ],
}
</script>

<style lang="less" scoped>
.login .hi {
    font-size: 20px;
    font-family: 'Times New Roman';
    font-style: italic;
}
.box {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
}

.box img {
    width: 100%;
    min-height: 100%;
}

.box .login {
    position: absolute;
    width: 500px;
    height: 400px;
    left: 0;
    margin: auto;
    right: 0;
    bottom: 0;
    top: -338px;
}

.login .login-title {
    width: 100%;
    text-align: center;
}

.login-title img {
    width: 190px;
    height: auto;
}

.login-title p {
    font-size: 18px;
    color: #fff;
    letter-spacing: 0.29px;
    padding-top: 10px;
    padding-bottom: 50px;
}

.login_box {
    width: 400px;
    height: auto;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    margin: 0 auto;
    padding-bottom: 40px;
}

.login_box .title {
    font-size: 20px;
    color: #9b9b9b;
    letter-spacing: 0.32px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-around;
    padding: 50px 60px 0 60px;
    margin-bottom: 20px;
    cursor: pointer;
}

.login_box .title span:nth-of-type(1) {
    color: #4a4a4a;
    border-bottom: 2px solid #396fcc;
}

.inp {
    width: 350px;
    margin: 0 auto;
}

.inp input {
    outline: 0;
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    text-indent: 20px;
    font-size: 14px;
    background: #fff !important;
}

.inp input.user {
    margin-bottom: 16px;
}

.inp .rember {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-top: 10px;
}

.inp .rember p:first-of-type {
    font-size: 12px;
    color: #4a4a4a;
    letter-spacing: 0.19px;
    margin-left: 22px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    /*position: relative;*/
}

.inp .rember p:nth-of-type(2) {
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: 0.19px;
    cursor: pointer;
}

.inp .rember input {
    outline: 0;
    width: 30px;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    text-indent: 20px;
    font-size: 14px;
    background: #fff !important;
}

.inp .rember p span {
    display: inline-block;
    font-size: 12px;
    width: 100px;
    /* position: absolute; */
    /* left: 20px; */
}

#geetest {
    margin-top: 20px;
}

.login_btn {
    width: 100%;
    height: 45px;
    background: #396fcc;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0.26px;
    margin-top: 1px;
}

.inp .go_login {
    text-align: center;
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: 0.26px;
    padding-top: 20px;
}

.inp .go_login span {
    color: #84cc39;
    cursor: pointer;
}
</style>
