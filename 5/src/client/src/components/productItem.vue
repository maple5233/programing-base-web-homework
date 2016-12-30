<template>
    <div class="productWrapper">
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
    export default {
        data: () => ({
            buyNum: 0,
            product:{
                _id : 1,
                productName: '深入理解计算机系统第二版',
                productPrice: 233,  
                productInventory: 10, 
                productDetails: '绝世好书2333333'  
            }
        }),
        methods: {
            plus: function () {
                if (this.buyNum < this.product.productInventory) {
                    this.buyNum++;
                }
            },
            minus: function () {
                if (this.buyNum > 0) {
                   this.buyNum--;
                }
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
