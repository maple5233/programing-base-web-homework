<template>
    <div>
        <el-menu theme="dark" default-active="1" mode="horizontal" class="menu">
            <div id="logo"><span><i class="el-icon-star-on"></i>图书商城</span></div>
            <div class="sel-menu">
                <router-link to="/product">
                    <el-menu-item index="1" class="product">产品列表</el-menu-item>
                </router-link>
                <el-submenu index="2">
                    <router-link to="/history">
                        <el-menu-item index="2-1">我的订单</el-menu-item>
                    </router-link>
                    <router-link to="/login">
                        <el-menu-item index="2-2">退出系统</el-menu-item>
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
            token : ''
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
