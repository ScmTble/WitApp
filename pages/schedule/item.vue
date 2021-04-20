<template>
	<view>
		<ul class="one">
			<li>课程名称：{{ one.courseName }}</li>
			<li>教室：{{ one.location }}</li>
			<li>时间：{{ one.startTime }} - {{ one.endTIme }}</li>
		</ul>
	</view>
</template>

<script>
	export default{
		props:{
			one:Object,
		}
	}
</script>

<style>
	.one{
		background-color: #282c35;
		margin: 20px;
		padding: 10px;
		border-radius: 10px;
		list-style-type: none;
	}
	li{
		color: #FFFFFF;
	}
</style>
