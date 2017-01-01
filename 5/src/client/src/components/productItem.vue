<template>
    <div class="productWrapper" ref="productItem">
        <img class="left" src="../assets/csapp.jpg" height="220" width="200" alt="深入理解计算机系统">
        <div class="info">
            <ul>
                <li>商品名称：{{ product.productName }}</li>
                <li>价格(元)：{{ product.productPrice }}</li>
                <li>库存(件)：{{ product.productInventory }}</li>
                <li>详细描述：{{ product.productDetails }}</li>
                <li class="bottom-right">
                    <span class="buy-number">购买数量：{{ buyNum }}</span>
                    <el-button type="primary" icon="plus" @click="plus"></el-button>
                    <el-button type="primary" icon="minus" @click="minus"></el-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import store from '../store.js'

    export default {
        name: "productItem",
        props: {
            product: Object
            // product:{
            //     _id : 1,
            //     productName: '深入理解计算机系统第二版',
            //     productPrice: 233,  
            //     productInventory: 10, 
            //     productDetails: '绝世好书2333333'  
            // }
        },
        data: () => ({
            buyNum: 0
        }),
        computed: {
            // clear: store.getters.clear
            clear: function () {
                return store.getters.clear;
            }
        },
        watch: {
            clear: function () {
                this.buyNum = 0;
            }
            // 也可以不要计算属性，直接监听state的
            // 'store.clear': function (argument) {
            //     this.buyNum = 0;
            // }
        },
        methods: {
            plus: function () {
                if (this.buyNum < this.product.productInventory) {
                    this.buyNum++;
                    this.$emit('buy',{
                        product: this.product,
                        isBuy: true
                    })
                }
            },
            minus: function () {
                if (this.buyNum > 0) {
                    this.buyNum--;
                    this.$emit('buy',{
                        product: this.product,
                        isBuy: false
                    })
                }
            },
            reset: function (argument) {
                this.buyNum = 0;
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/styles/definition.less';

    .productWrapper {
        padding: 10px;
        border-bottom: 1px @md-blue-grey-300 solid;
        overflow: hidden;
        position: relative;

        li {
            font-size: 16px;
            margin-top: 5px;
            margin-bottom: 12px;
            color: @md-grey-700;
        }

        .buy-number {
            margin-right: 10px;
        }
    }

    .max-width {
        width: 100%;
    }

    .toMid {
        width: 75%;
        margin: 10px auto;
    }

    .bottom-right {
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .left {
        float: left;
    }
</style>
