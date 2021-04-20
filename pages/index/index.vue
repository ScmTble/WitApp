<template>
	<view>
		<view>
			<u-notice-bar bg-color="#161616" mode="horizontal" :list="msgList"></u-notice-bar>
			<view class="wrap">
					<u-swiper :list="img_list" :height="450"></u-swiper>
			</view>
		</view>
		<view id="info">
			<view class="item">
				<u-tag text="姓名" mode="dark" shape="circleLeft"/>
				<u-tag :text="UserInfo.name" type="success" />
			</view>
			<view class="item">
				<u-tag text="班级" mode="dark" shape="circleLeft"/>
				<u-tag :text="UserInfo.clsName" type="success" />
			</view>
			<view class="item">
				<u-tag text="学院" mode="dark" shape="circleLeft"/>
				<u-tag :text="UserInfo.academyName" type="success" />
			</view>
		</view>
		<view>
			<u-row>
				<u-col span="6">
				<u-button @click="turnurl()" type="primary" id="btn" :disabled="isLogin">登录页</u-button>
				</u-col>
				<u-col span="6">
				<u-button type="success" @click="leftviewshow = true" id="btn">Tips</u-button>
				</u-col>
			</u-row>
		</view>
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


<style>
	#info{
		background-color: #161616;
	}

	#btn{
		margin: 10px;
	}
	.wrap{
		padding: 40rpx;
		background-color: #161616;
	}
	.item{
		margin: 30px;
	}
	.u-tag{
		margin-right: 10px;
	}
	page{
		background-color: #161616;	
	}
</style>
