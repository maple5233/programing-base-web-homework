<template>
    <div>
        <el-menu theme="dark" default-active="1" mode="horizontal" class="menu">
            <div id="logo"><span><i class="el-icon-star-on"></i>图书商城</span></div>
            <div class="sel-menu">
                <router-link to="/product">
                    <el-menu-item index="1" class="product">产品列表</el-menu-item>
                </router-link>
                <router-link to="/history">
                        <el-menu-item index="2">我的订单</el-menu-item>
                    </router-link>
                <el-submenu index="3">
                    <el-menu-item index="3-1">{{ userName }}</el-menu-item>
                    <el-menu-item index="3-2">我的余额:￥{{ userBalance }}</el-menu-item>
                    <router-link to="/login">
                        <el-menu-item index="3-3">退出系统</el-menu-item>
                    </router-link>
                </el-submenu>
            </div>
        </el-menu>
    </div>
</template>

<script>
    export default {
      data () {
        return {
            token : '',
            userName: 'hjy',
            userBalance: 23333,
            isManager: null
        }
    },

    methods: {
    }
}
</script>

<style lang="less">
    @import '../assets/styles/definition.less';

    .sel-menu {
        float: right;
        margin-right: 9%;
    }

    .product {
        &:hover {
            border-bottom: 5px solid #20a0ff;
        }
    }


    #logo {
        float: left;
        margin-left: 9%;
        height: 60px;

        span {
            text-align: center;
            line-height: 60px;
            font-size: 1.8rem;
            color: @md-light-blue-600;
            font-weight: 800;
        }
    }
</style>
