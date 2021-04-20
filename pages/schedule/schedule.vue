<template>
	<view>
		<!-- 滚动条 -->
		<topbar :barList="barList"></topbar>
		<currentweek :classList="classList" :today="today"></currentweek>
	</view>

</template>

<script>
	import topbar from "./topbar.vue";
	import currentweek from "./currentweek.vue"
	import {
		mapState
	} from "vuex";
	export default {
		components: {
			topbar,
			currentweek
		},
		computed: {
			...mapState(["isLogin", "Token", "classList", "currentWeek"]),
			today(){
				var a = new Array(6, 0, 1, 2, 3, 4, 5);  
				var week = new Date().getDay();  
				return a[week]
			}
		},
		data() {
			return {
				barList: ["如果课程不对请及时下拉刷新", "ScmTble"],
				show: false,
			};
		},
		methods: {
			getCurrentClassList() {
				if(this.isLogin)
				{
					uni.request({
						method: "POST",
						url: "http://jwapp.wit.edu.cn/whgcdxhd/student/curriculum",
						header: {
							"content-type": "application/x-www-form-urlencoded",
							token: this.Token,
						},
						data: {
							week: this.currentWeek
						},
						timeout:2,
						success: (res) => {
							if (res.statusCode == 200) {
					
								uni.stopPullDownRefresh();							
								// 提交class更新并存储
								this.$store.commit("updateClass", res);
								uni.showToast({
									title: "更新成功！",
									icon: "success",
								});
							} else {
								uni.stopPullDownRefresh();
								uni.showToast({
									title: "服务错误！",
									icon: "none",
								});
							}
						},
						fail() {
							uni.stopPullDownRefresh();
							uni.showToast({
								title: "请求错误！",
								icon: "none",
							});
						}
					});
				}
				else
				{
					uni.stopPullDownRefresh();
					uni.showToast({
						title: "未登录！",
						icon: "none",
					});
				}
			},
		},
		onPullDownRefresh() {
			let token = this.Token;
			let week = this.currentWeek;
			if(this.isLogin)
			{
				uni.request({
					method: "POST",
					url: "http://jwapp.wit.edu.cn/whgcdxhd/student/curriculum",
					header: {
						"content-type": "application/x-www-form-urlencoded",
						token: token,
					},
					data: {
						week:week,
					},
					success: (res) => {
						if (res.statusCode == 200) {
				
							uni.stopPullDownRefresh();							
							// 提交class更新并存储
							this.$store.commit("updateClass", res);
							// this.$store.commit("upateCurrentWeek",res);
							uni.showToast({
								title: "更新成功！",
								icon: "success",
							});
						} else {
							uni.stopPullDownRefresh();
							uni.showToast({
								title: "服务错误！",
								icon: "none",
							});
						}
					},
					fail() {
						uni.stopPullDownRefresh();
						uni.showToast({
							title: "请求错误！",
							icon: "none",
						});
					}
				});
			}
			else
			{
				uni.stopPullDownRefresh();
				uni.showToast({
					title: "未登录！",
					icon: "none",
				});
			}
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 5000);
		}
	};
</script>

<style>
	#btn {
		margin: 20px;
	}
	page{
		background-color: #161616;
	}
</style>
