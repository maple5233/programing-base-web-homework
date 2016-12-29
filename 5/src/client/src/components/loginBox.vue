<template>
	<div>
		<el-form :model="userForm" :rules="rules" ref="userForm">
			<el-card class="box-card" id="content">
				<el-tabs :active-name="activeName">
					<el-tab-pane label="登录" name="login">
						<el-row type="flex">
							<el-col :span="24" justify="center">
								<el-form-item label="" prop="userName">
									<el-input placeholder="请输入用户名" v-model="userForm.userName"></el-input>
								</el-form-item>
								<el-form-item label="" prop="userPass">
									<el-input placeholder="请输入密码" type="password" v-model="userForm.userPass"></el-input>
								</el-form-item>
								<el-button type="primary" @click="login()">登 录</el-button>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="注册" name="register">
						<el-row type="flex">
							<el-col :span="24" justify="center">
								<el-form-item label="" prop="registerName">
									<el-input placeholder="请输入用户名" v-model="userForm.registerName"></el-input>
								</el-form-item>
								<el-form-item label="" prop="registerPass">
									<el-input placeholder="请输入密码" type="password" v-model="userForm.registerPass"></el-input>
								</el-form-item>
								<el-form-item label="" prop="repeatRegisterPass">
									<el-input placeholder="再输入密码" type="password" v-model="userForm.repeatRegisterPass"></el-input>
								</el-form-item>
								<el-button type="primary" @click="register()">注 册</el-button>
							</el-col>
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</el-card>
		</el-form>
	</div>
</template>

<script>
	import sha1 from 'sha1'

	export default {
		data() {
			return {
				title: 'login',
				activeName: 'login',
				userForm: {
					userName: '',
					userPass: '',
					registerName: '',
					registerPass: '',
					repeatRegisterPass: ''
				},
				rules: {
					userName: [{
						required: true,
						message: '不能留空',
						trigger: 'blur'
					}],
					userPass: [{
						required: true,
						message: '不能留空',
						trigger: 'blur'
					}],
					registerName: [{
						required: true,
						message: '不能留空',
						trigger: 'blur'
					}],
					registerPass: [{
						required: true,
						message: '不能留空',
						trigger: 'blur'
					}, {
						min: 4,
						max: 16,
						message: '长度在 4 到 16 个字符',
						trigger: 'blur'
					}],
					repeatRegisterPass: [{
						required: true,
						message: '不能留空',
						trigger: 'blur'
					}, {
						min: 4,
						max: 16,
						message: '长度在 4 到 16 个字符',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			iNotify(title, content) {
				this.$notify({
					title: title,
					message: content
				});
			},
			register() {
				this.userForm.userName = 'null';
				this.userForm.userPass = 'null';
				this.$refs.userForm.validate((valid) => {
					if (valid) {
						if (this.userForm.registerPass != this.userForm.repeatRegisterPass) {
							this.iNotify('错误', '两次密码输入的不一样！请重新输入！');
							this.userForm.registerPass = '';
							this.userForm.repeatRegisterPass = '';
							return;
						}
					} else {
						this.$message.error('您的输入有误');
						this.$refs.userForm.resetFields();
					}
				})
			},
			login() {
				let _userName = this.userForm.userName;
				let _userPass = this.userForm.userPass;
				let infoIsOk = (_userName.length > 0) && (_userPass.length > 0);
				if (infoIsOk) {
					let auth = {
						userName: _userName,
						userPass: sha1(_userPass),
					};
					console.dir(auth);
				} else {
					this.$message.error('您的输入有误');
					this.$refs.userForm.resetFields();
				}
			}
		}
	}
</script>

<style lang="less" scoped>

	@center-margin: 0 auto;

	#content {
		max-width: 450px;
		margin: 1rem auto;
		padding-bottom: 3.5rem;
		padding-top: 2rem;

		.el-tabs {
			width: 80%;
			margin: @center-margin;
			display: block;
		} 
		.el-input {
			margin: @center-margin;
		}
		.el-button {
			width: 100%;
			height: 38px;
		}
	}

</style>
