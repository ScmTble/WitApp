<template>
	<view>
		<view v-for="(item, index) in (list.length!=0 ?list:List)" :key="index">
			<item :one="item"></item>
		</view>
	</view>
</template>

<script>
	import item from "./item.vue"
	export default {
		components:{
			item
		},
		props:{
			list:Array
		},
		data() {
			return {
				List: [
					{
						courseName: '今天没有课，wuhu！'
					}
				],
			};
		}
	};
</script>
