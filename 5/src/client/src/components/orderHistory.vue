<template>
    <div class="orderHistoryWrapper">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>历史订单</span>
            </div>
            <order v-for="order in orders" :order="order" :isHistory="true"></order>
        </el-card>
    </div>
</template>

<script>
    import order from './order.vue'
    export default {
        data: () => ({
            orders: [{
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
                orderPrice: 2333,
                orderTime: new Date()
            },{
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
                orderPrice: 2333,
                orderTime: new Date()
            }]
        }),
        computed: {
        },
        methods: {
        },
        components: {
            order
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
