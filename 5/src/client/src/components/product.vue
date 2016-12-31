<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>产品列表</span>
                <el-button class="order-btn" type="primary"  @click="showOrder = true">
                    购物车￥ {{ wholePrice }}
                </el-button>
            </div>
            <product-item v-for="product in products" :product="product" @buy="handleBuy(arguments)"></product-item>
        </el-card>

        <el-dialog title="当前订单信息" v-model="showOrder" size="tiny">
            <order-item :order="order" :isHistory="false" @submitOrder="handleSubmitOrder"></order-item>
        </el-dialog>
    </div>
</template>

<script>
    import productItem from './productItem.vue'
    import orderItem from './orderItem.vue'

    export default {
        data: () => ({
            showOrder: false,
            wholePrice: 0,
            products:[{
                _id : 1,
                productName: '深入理解计算机系统第1版',
                productPrice: 233,  
                productInventory: 10, 
                productDetails: '绝世好书2333333'  
            },{
                _id : 2,
                productName: '深入理解计算机系统第2版',
                productPrice: 233,  
                productInventory: 10, 
                productDetails: '绝世好书2333333'  
            },{
                _id : 3,
                productName: '深入理解计算机系统第3版',
                productPrice: 233,  
                productInventory: 10, 
                productDetails: '绝世好书2333333'  
            }],
            order: {
                orderDetails: [{
                    number: 0,
                    product: {
                        _id : 1,
                        productName: '深入理解计算机系统第1版',
                        productPrice: 233,  
                        productInventory: 10, 
                        productDetails: '绝世好书2333333'  
                    }
                },{
                    number: 0,
                    product: {
                        _id : 2,
                        productName: '深入理解计算机系统第2版',
                        productPrice: 233,  
                        productInventory: 10, 
                        productDetails: '绝世好书2333333'  
                    }
                },{
                    number: 0,
                    product: {
                        _id : 3,
                        productName: '深入理解计算机系统第3版',
                        productPrice: 233,  
                        productInventory: 10, 
                        productDetails: '绝世好书2333333'  
                    }
                }],
                orderPrice: 0,
                orderTime: new Date()
            }
        }),
        components: {
            productItem,
            orderItem
        },
        methods: {
            handleBuy:function (argument) {
                // console.log(argument[0])
                let product = argument[0].product;
                let isBuy = argument[0].isBuy;
                this.order.orderDetails.map((item, index) => {
                    if(item.product._id == product._id) {
                        if (isBuy) {
                            item.number++;
                        } else {
                            item.number--;
                        }
                    }
                });
            },
            handleSubmitOrder: function (argument) {
                this.showOrder = false;
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/styles/definition.less';

    .order-btn {
        float: right;
        margin-top: -10px;
    }
</style>
