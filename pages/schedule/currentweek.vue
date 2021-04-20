<template>
	<view>
		<view>
			<u-tabs font-size="35" bg-color="#161616" bar-height="8" bar-width="50" active-color="#ffffff" :list="list" :current="current"></u-tabs>
		</view>
		<swiper :style="{height:height + 'px'}" @change="changeCurrent" :current="current">
			<swiper-item v-for="(dayList,index) in classList" :key="index">
				<swiperitem :list="dayList"></swiperitem>
			</swiper-item>
		
		</swiper>
	</view>
	
</template>



<script>
	import swiperitem from "./swiperitem.vue"
	import { mapState } from "vuex"
	export default {
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
				current:this.today,
				height:500,
			}
		},
		props:{
			classList:Array,
			today:Number
		},
		methods: {
			changeCurrent(e) {
				let c = e.detail.current
				this.current = c;
			},
		},
		components:{
			swiperitem
		}
	}
</script>

<style>
	swiper{
		background-color: #161616;
	}
	.u-tabs{
		text-align: center;
	}
	page{
		height: 100%;
		background-color: #161616;
	}
</style>