<script>
	export default {
		onLaunch: function() {
			uni.getStorage({
				key:"UserInfo",
				success: (data) => {
					let UserInfo = data['data']
					uni.request({
					method:"POST",
					url:"http://jwapp.wit.edu.cn/whgcdxhd/Get_sjkbms",
					header:{
						token:UserInfo['token']
					},
					success:(res)=>{
						if(res.statusCode==200&&res['data']['code']==1)
						{
							// 用户第二次进入执行SecondEnt函数(UserInfo)
							// this.$store.commit('SecondEnt',UserInfo);
							uni.request({
								method: "POST",
								url: "http://jwapp.wit.edu.cn/whgcdxhd/student/curriculum",
								header: {
									"content-type": "application/x-www-form-urlencoded",
									token: UserInfo['token'],
								},
								data: {
									week: 1
								},
								success: (resp) => {
									if (res.statusCode == 200) {						
										this.$store.commit("upateCurrentWeek",resp);
										// 用户第二次进入执行SecondEnt函数(UserInfo)
										this.$store.commit('SecondEnt',UserInfo);
									}
								}
							});
						}
					}
				})
				}
			})
			uni.getStorage({
				key:'classList',
				success: (data) => {
					this.$store.commit('updateClass',data.data);
				},
				fail: () => {
					uni.showToast({
						title:"请更新课表",
						icon:"none"
					})
				}
			})
			uni.getStorage({
				key:'currentWeek',
				success: (data) => {
					this.$store.commit('upateCurrentWeek',data.data);
				}
			})
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
