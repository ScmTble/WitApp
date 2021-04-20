<template>
	<view>
		<schitem :list="list"></schitem>
	</view>
</template>

<script>
	import schitem from "./schitem.vue"
	export default{
		components:{
			schitem
		},
		props:{
			list:Array,
		}
	}
</script>
