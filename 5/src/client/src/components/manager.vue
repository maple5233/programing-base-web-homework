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
                <el-table-column label="操作" width="120" inline-template :context="_self" fixed="right">
                    <span>
                        <el-button type="primary" icon="edit" size="small" @click="editProducts(row)"></el-button>
                        <el-button type="danger" icon="delete" size="small" @click="deleteProducts(row)"></el-button>
                    </span>
                </el-table-column>
            </el-table>
            <!-- 编辑框 -->
            <el-dialog title="产品信息编辑" v-model="editing">
                <el-form :model="product" ref="product" :rules="rules">
                    <el-form-item label="商品名称" prop="productName" :label-width="formLabelWidth">
                        <el-input v-model="product.productName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="价格(元)" :label-width="formLabelWidth">
                        <el-input-number v-model="product.productPrice" auto-complete="off"></el-input-number>
                    </el-form-item>
                    <el-form-item label="库存(件)" :label-width="formLabelWidth">
                        <el-input-number v-model="product.productInventory" auto-complete="off"></el-input-number>
                    </el-form-item>
                    <el-form-item label="详情" prop="productDetails" :label-width="formLabelWidth">
                        <el-input v-model="product.productDetails" auto-complete="off" type="textarea" :autosize="textareaSize"></el-input>
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
    import handleProduct from '../store/handleProduct'
    import store from '../store'

    export default {
        data: () => ({
            formLabelWidth:'120px',
            textareaSize: { minRows: 2, maxRows: 4},
            editing: false,
            adding: false,
            product: {
                _id : -1,
                productName: '',
                productPrice: null,  
                productInventory: null, 
                productDetails: '' 
            },
            rules: {
                productName: [{
                    required: true,
                    message: '不能留空',
                    trigger: 'blur'
                }],
                productDetails: [{
                    required: true,
                    message: '不能留空',
                    trigger: 'blur'
                }]
            },
            editingIndex : -1,
            products:[{
                _id : -1,
                productName: '我就是个占位的',
                productPrice: 0,  
                productInventory: 0, 
                productDetails: '我就是个占位的'  
            }]
        }),
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
                    if (code === 0) {
                        this.products = result.data
                    } else {
                        this.iNotify('失败',result.msg || '未知错误');
                    }
                });
            },
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
                            // ajax delete
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
                this.$refs.product.validate((valid) => {
                    if (!valid) {
                        this.$message.error('您的输入有误');
                        this.$refs.product.resetFields();
                        return;
                    }
                    if (this.adding) {
                        // ajax post
                        this.products.push(this.product);
                        this.resetProduct();
                        this.adding = false;
                    } else {
                        // ajax put
                    }
                    this.editing = false;
                });
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
