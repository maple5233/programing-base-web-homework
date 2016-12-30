<template>
    <div>
        <el-card class="box-card toMid">
            <div slot="header" class="clearfix card-header">
                <span class="card-title">管理商品信息</span>
                <el-button type="primary" class="right" @click="addProduct">增加商品</el-button>
            </div>
            <el-table :data="products" stripe style="max-width">
                <el-table-column prop="productName" label="商品名称" width="100"></el-table-column>
                <el-table-column prop="productPrice" label="价格(元)"  width="100"></el-table-column>
                <el-table-column prop="productInventory" label="库存(件)" width="100"></el-table-column>
                <el-table-column prop="productDetails" label="描述"></el-table-column>
                <el-table-column inline-template :context="_self" fixed="right" label="操作" width="120">
                    <span>
                        <el-button type="primary" icon="edit" size="small" @click="editProducts(row)"></el-button>
                        <el-button type="danger" icon="delete" size="small" @click="deleteProducts(row)"></el-button>
                    </span>
                </el-table-column>
            </el-table>
            <!-- 编辑框 -->
            <el-dialog title="产品信息编辑" v-model="editing">
                <el-form :model="product" ref="product" :rules="rules">
                    <el-form-item label="商品名称" :label-width="formLabelWidth">
                        <el-input v-model="product.productName" prop="productName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="价格(元)" :label-width="formLabelWidth">
                        <el-input v-model="product.productPrice" prop="productPrice" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="库存(件)" :label-width="formLabelWidth">
                        <el-input v-model="product.productInventory" prop="productInventory" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="详情" :label-width="formLabelWidth">
                        <el-input v-model="product.productDetails" prop="productDetails" auto-complete="off" type="textarea" :autosize="textareaSize"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    export default {
        data: () => ({
            formLabelWidth:'120px',
            textareaSize: { minRows: 2, maxRows: 4},
            editing: false,
            adding: false,
            product: {
                _id : -1,
                productName: '',
                productPrice: 0,  
                productInventory: 0, 
                productDetails: '' 
            },
            editingIndex : -1,
            products:[{
                _id : 1,
                productName: 'abbbbb',
                productPrice: 0,  
                productInventory: 0, 
                productDetails: 'String'  
            },{
                _id : 3,
                productName: 'deeeee',
                productPrice: 1,  
                productInventory: 1, 
                productDetails: 'String'  
            },{
                _id : 5,
                productName: 'cdddc',
                productPrice: 3,  
                productInventory: 3, 
                productDetails: 'String'  
            },{
                _id : 7,
                productName: 'ssssss',
                productPrice: 2,  
                productInventory: 2, 
                productDetails: 'StringStringStringStringStringStringStringStringStringStringStringStringStringStringStringStringString'  
            }]
        }),

        methods: {
            editProducts: function (row) {
                this.product = row;
                this.editing = true;
            },
            addProduct: function (argument) {
                this.editing = true;
                this.adding = true;
            },
            deleteProducts: function (row) {
                this.products.map((item, index) => {
                    if(item._id == row._id) {
                        this.$confirm('此操作将永久删除商品'+ item.productName +', 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.products.splice(index, 1);
                            this.editingIndex = index;
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                        });
                    }
                }) 
            },
            submitForm: function (argument) {
                if (this.adding) {
                    this.products.push(this.product);
                    this.resetProduct();
                    this.adding = false;
                }
                this.editing = false;
            },
            resetProduct: function (argument) {
                this.product = {
                    _id : -1,
                    productName: '',
                    productPrice: 0,  
                    productInventory: 0, 
                    productDetails: '' 
                }
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/styles/definition.less';

    .max-width {
        width: 100%;
    }

    .card-header {
        height: 36px;
        .card-title {
            font-weight: bold;
            line-height: 36px;
        }
    }

    .toMid {
        width: 75%;
        margin: 10px auto;
    }

    .right {
        float: right;
    }

</style>
