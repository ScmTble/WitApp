<template>
	<view>
		<u-notice-bar mode="horizontal" :list="msgList"></u-notice-bar>
		<view class="wrap">
				<u-swiper :list="img_list" :height="450"></u-swiper>
		</view>
		
		<u-cell-group>
			<u-cell-item icon="setting-fill" :title="isLogin ? '宁已经登录':'宁当前未登录！'" @click="zhuxiao()" value="注销" id="msg"></u-cell-item>
		</u-cell-group>
		
		
		<view id="userinfo">
			<u-icon id="icon" name="account" color="#2979ff" size="30"></u-icon> 
			  姓名 : {{ UserInfo.name }}<br>
			<u-icon id="icon" name="coupon" color="#2979ff" size="30"></u-icon>
			  班级 : {{ UserInfo.clsName }}<br>
			<u-icon id="icon" name="grid" color="#2979ff" size="30"></u-icon>
			  学院 : {{ UserInfo.academyName }}<br>
		</view>
		
		<u-row>
			<u-col span="6">
			<u-button @click="turnurl()" type="primary" id="btn" :disabled="isLogin">登录页</u-button>
			</u-col>
			<u-col span="6">
			<u-button type="success" @click="leftviewshow = true" id="btn">Top</u-button>
			</u-col>
		</u-row>
		<!-- // 头部弹出框 -->
		<u-popup v-model="leftviewshow" mode="top" border-radius="40" height="300">
			<topview :week="currentWeek"></topview>
		</u-popup>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import topview from './topview.vue'
	export default {
		data() {
			return {
				// 轮播图列表
				img_list: [{
						image: '../../static/1.jpeg',
					},
					{
						image: '../../static/2.jpeg',
					},
					{
						image: '../../static/3.jpeg',
					}
				],
				leftviewshow:false,
				msgList:[
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				]
			}
		},
		computed:{
			// 返回store内的信息
			...mapState(['isLogin','Token','UserInfo','currentWeek'])
		},
		methods:{
			// 跳转到登录页面
			turnurl(){
				uni.navigateTo({
				    url: '/pages/login/index'
				});
			},
			// 注销
			zhuxiao(){
				this.$store.commit("loginout");
				if(this.isLogin)
				{
					uni.showToast({
					title:"注销成功",
					icon:"icon"
					});
				}
				else{
					uni.showToast({
					title:"还没登录呢！",
					icon:"none"
					});
				}
			}
		},
		components:{
			topview
		}
	}
</script>


<style scoped lang="scss">
	#userinfo{
		padding-left: 80px;
		padding-top: 10px;
	}
	#icon{
		padding-top: 20px;
	}
	
	#btn{
		margin-top: 30px;
		margin-left: 30px;
		margin-right: 30px;
	}
	.wrap{
		padding: 40rpx;
	}
	#msg{
		margin-top: 15px;
		padding: 10px;
	}
</style>
