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
    import store from '../store'
    import handleProduct from '../store/handleProduct'
    import handleOrder from '../store/handleOrder'

    export default {
        data: () => ({
            showOrder: false,
            wholePrice: 0,
            money: store.getters.money,
            products:[],
            order: {
                orderDetails: [],
                orderPrice: 0,
                orderTime: new Date()
            }
        }),
        components: {
            productItem,
            orderItem
        },
        beforeMount() {
            this.getProducts();
        },
        methods: {
            iNotify(title, content) {
                this.$notify({
                    title: title,
                    message: content
                });
            },
            getProducts: function (argument) {
                // ajax get
                handleProduct.getProduct().then(res => {
                    let result  = res.data;
                    let code = result.code;
                    let products = result.data
                    if (code === 0) {
                        this.products = products;
                        this.order.orderDetails = [];
                        products.forEach((element, index) => {
                            let orderDetailsItem = {
                                number: 0,
                                product : element
                            };
                            this.order.orderDetails.push(orderDetailsItem);
                        });
                    } else {
                        this.iNotify('失败',result.msg || '未知错误');
                    }
                });
            },
            handleBuy:function (argument) {
                // console.log(argument[0])
                let product = argument[0].product;
                let isBuy = argument[0].isBuy;
                this.order.orderDetails.map((item, index) => {
                    if(item.product._id == product._id) {
                        if (isBuy) {
                            item.number++;
                            this.wholePrice += item.product.productPrice;
                        } else {
                            item.number--;
                            this.wholePrice -= item.product.productPrice;
                        }
                        this.order.orderPrice = this.wholePrice;
                    }
                });
            },
            handleSubmitOrder: function (argument) {
                if (this.money < this.wholePrice) {
                    this.iNotify('尴尬','钱不够啊');
                    return
                }
                // 组装数据
                let orderDetails = [];
                this.order.orderDetails.forEach((element, index) => {
                    orderDetails.push({
                        number: element.number,
                        product: element.product
                    })
                });
                let orderPrice = this.order.orderPrice;
                // ajax
                handleOrder.addOrder(orderDetails, orderPrice).then(res => {
                    let result  = res.data;
                    let code = result.code;
                    let products = result.data;
                    if (code === 0) {
                        store.dispatch('buy', orderPrice);
                        this.iNotify('买买买', '下单成功');
                        this.money -= orderPrice;
                    } else {
                        this.iNotify('失败', result.msg || '未知错误');
                    }
                });
                this.showOrder = false;
                this.resetAll();
            },
            resetAll: function () {
                this.getProducts();
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
