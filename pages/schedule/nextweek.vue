<template>
	<view>
		<view>
			<u-tabs font-size="40" bg-color="#ffaaff" :list="list" :current="current"></u-tabs>
		</view>
		<swiper @change="changeCurrent">
			<swiper-item v-for="(dayList,index) in classList" :key="index">
				<swiperitem :list="dayList"></swiperitem>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import swiperitem from "./swiperitem.vue"
	export default{
		components:{
			swiperitem
		},
		data(){
			return{
				list:[
					{name:"周一"},
					{name:"周二"},
					{name:"周三"},
					{name:"周四"},
					{name:"周五"},
					{name:"周六"},
					{name:"周日"},
				],
				current:0,
				classList:[[],[],[],[],[],[],[]]
			}
		},
		computed:{
			...mapState(['Token','currentWeek'])
		},
		methods: {
			changeCurrent(e) {
				let current = e.detail.current
				this.current = current;
			}
		},
		
		mounted:function() {
			uni.request({
				method:"POST",
				url:"http://jwapp.wit.edu.cn/whgcdxhd/student/curriculum",
				header:{
					'content-type':"application/x-www-form-urlencoded",
					token:this.Token
				},
				data:{
					week:this.currentWeek+1
				},
				success: (res) => {
					if(res.statusCode==200){
						uni.showToast({
							title:"更新成功！",
							icon:"success"
						})
						let result = DealClassList(res.data.data[0].item)
						result.shift()
						this.classList = result
					}
					else{
						uni.showToast({
							title:"服务错误！",
							icon:"none"
						})
					}
				}
			})
		}
	}
// 对课程数组进行处理
	function DealClassList(classList){
		let result = [[],[],[],[],[],[],[],[]]
		for(let one of classList){
			if(one.classTime[0]==1){
				result[1].push(one)
			}
			else if(one.classTime[0]==2){
				result[2].push(one)
			}
			else if(one.classTime[0]==3){
				result[3].push(one)
			}
			else if(one.classTime[0]==4){
				result[4].push(one)
			}
			else if(one.classTime[0]==5){
				result[5].push(one)
			}
			else if(one.classTime[0]==6){
				result[6].push(one)
			}
			else if(one.classTime[0]==7){
				result[7].push(one)
			}
		}
		return result
	}	
</script>

<style>
	swiper{
		height: 700px;
	}
	.u-tabs{
		text-align: center;
		border-radius: 30px;
		padding-top: 10px;
		margin: 10px;
	}
</style>
