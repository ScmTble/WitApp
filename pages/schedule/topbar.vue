<template>
	<view id="main">
		<u-notice-bar color="#ababab" bg-color="#161616" mode="horizontal" :list="barList ? barList : list" type="error"></u-notice-bar>
	</view>
</template>

<script>
	export default {
		props:{
			barList:Array
		},
		data() {
			return {
				list: [
					'人生进度条',
					'人生进度条',
					'人生进度条',
					'人生进度条'
				]
			}
		}
	}
</script>

<style>
	main{
		background-color: #222222;
	}
</style>
