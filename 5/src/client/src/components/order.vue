<template>
    <div class="orderWrapper">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>购物车</span>
                <el-button style="float: right;" type="primary">确认下单</el-button>
            </div>
            <ul>
                <li class="text">订单总价格：{{ order.orderPrice }}</li>
                <li class="text">商品详情：</li>
                <li v-for="orderDetail in order.orderDetails" class="item">
                    {{ orderDetail.name }}共{{ orderDetail.number }}件
                </li>
            </ul>
        </el-card>
    </div>
</template>

<script>
    export default {
        data: () => ({
            order: {
                orderDetails: [{
                    number: 1,
                    name: '商品1'
                },{
                    number: 2,
                    name: '商品2'
                },{
                    number: 1,
                    name: '商品3'
                }],
                orderPrice: 2333
            }
        }),
        computed: {
        },
        methods: {
        }
    }
</script>

<style lang="less">
    @import '../assets/styles/definition.less';

    .text {
        font-size: 18px;
        padding: 5px 0;
    }

    .item {
        font-size: 15px;
        padding: 4px 0;
    }
</style>
