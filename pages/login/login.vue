<template>
	<view class="wrap">
		<u-row gutter="16">
			<u-col span="12" text-align="center">
				<u-avatar src="https://scmtble.xyz/assets/img/favicon.jpg" mode="circle"></u-avatar>
			</u-col>
			<u-col span="12">
				<view>
				<u-input v-model="uid" type="text" :border="true" id="uid" placeholder="请输入学号"/>
				</view>
			</u-col>
			<u-col span="12">
				<view>
					<u-input v-model="pwd" type="password" :border="true" id="pwd" placeholder="请输入密码"/>
				</view>
			</u-col>
			<u-col span="12">
				<view>
					<u-button type="primary" id="btn-login" @click="bindLogin(uid,pwd)">登录</u-button>
					<u-button id="btn-login" @click="turnBack()">返回</u-button>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import mapMutations from 'vuex'
	export default{
		
		data(){
			return{
				uid:"",
				pwd:""
			}
		},
		methods:{
			// 登录获取token
			bindLogin(uid,pwd){

				uni.request({
					method:"POST",
					url:"http://jwapp.wit.edu.cn/whgcdxhd/login",
					header:{
						'content-type':"application/x-www-form-urlencoded",
					},
					data:{
						userNo:uid,
						pwd:pwd
					},
					success: (res) => {
						// this.msg = res["data"];
						// 1表明登录成功
						if(res.data.code==1){
							// 将token存入并将缓存中的状态改为
							this.$store.commit('login',res['data']['data']);

							this.showToast(res['data']['Msg'],"success");
							// 登录成功返回主页
							uni.navigateBack();
						}
						else{
							this.showToast(res['data']['Msg'],"none")
						}
					},
					fail:()=> {
						this.showToast("登录失败！","none")
					}
				})
			},
			
			// 登陆后的提示
			showToast(title,icon) {
				uni.showToast({
					title: title,
					icon:icon
				});
			},
			// 跳转回去
			turnBack(){
				uni.navigateBack();
			}
		},
		
	}
</script>

<style>
	#uid{
		margin-top: 40px;
		margin-left: 30px;
		margin-right: 30px;
	}
	#pwd{
		margin-top: 40px;
		margin-left: 30px;
		margin-right: 30px;
	}
	#btn-login{
		margin-top: 40px;
		margin-left: 70px;
		margin-right: 70px;
	}
	.wrap {
			padding: 24rpx;
	}

	.u-row {
		margin: 40rpx 0;
	}
</style>
