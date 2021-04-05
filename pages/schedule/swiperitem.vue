<template>
		<schitem :list="list"></schitem>
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

<style>
</style>
