<template>
    <div class="orderHistoryWrapper">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>历史订单</span>
            </div>
            <order-item v-for="order in orders" :order="order" :isHistory="true"></order-item>
        </el-card>
    </div>
</template>

<script>
    import orderItem from './orderItem.vue'
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
            orderItem
        }
    }
</script>
