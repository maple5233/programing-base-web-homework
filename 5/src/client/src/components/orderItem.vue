<template>
    <div class="orderWrapper">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{title}}</span><span v-show="isHistory">{{ order.orderTime | datetime }}</span>
                <el-button class="order-btn" type="primary" v-show="!isHistory" @click="submitOrder" >确认下单</el-button>
            </div>
            <ul>
                <li class="text">订单总价格：{{ order.orderPrice }}</li>
                <li class="text">商品详情：</li>
                <li v-for="orderDetail in order.orderDetails" class="item" v-show="orderDetail.number > 0">
                    {{ orderDetail.product.productName }}(￥{{ orderDetail.product.productPrice }})共{{ orderDetail.number }}件
                </li>
            </ul>
        </el-card>
    </div>
</template>

<script>
    export default {
        props: {
            order: Object,
            // order: {
            //     orderDetails: [{
            //         number: 1,
            //         product: {
            //             _id : 1,
            //             productName: '深入理解计算机系统第1版',
            //             productPrice: 233,  
            //             productInventory: 10, 
            //             productDetails: '绝世好书2333333'  
            //         }
            //     }],
            //     orderPrice: 2333,
            //     orderTime: '2014-11-12'
            // }
            isHistory: Boolean
        },
        data: () => ({
        }),
        computed: {
            title() {
                if (this.isHistory) {
                    return '下单时间:   ' 
                } else {
                    return '购物车'
                }
            }
        },
        methods: {
            submitOrder: function (argument) {
                 this.$emit('submitOrder')
            }
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

    .order-btn {
        float: right;
        margin-top: -10px;
    }
</style>
