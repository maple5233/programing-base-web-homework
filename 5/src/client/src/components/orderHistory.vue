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
                    product: {
                        _id : 1,
                        productName: '深入理解计算机系统第1版',
                        productPrice: 111,  
                        productInventory: 10, 
                        productDetails: '绝世好书2333333'  
                    }
                },{
                    number: 3,
                    product: {
                        _id : 2,
                        productName: '深入理解计算机系统第2版',
                        productPrice: 222,  
                        productInventory: 10, 
                        productDetails: '绝世好书2333333'  
                    }
                },{
                    number: 2,
                    product: {
                        _id : 3,
                        productName: '深入理解计算机系统第3版',
                        productPrice: 333,  
                        productInventory: 10, 
                        productDetails: '绝世好书2333333'  
                    }
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
