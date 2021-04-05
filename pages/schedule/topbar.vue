<template>
	<view>
		<u-notice-bar mode="horizontal" :list="barList ? barList : list" type="error"></u-notice-bar>
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
</style>
