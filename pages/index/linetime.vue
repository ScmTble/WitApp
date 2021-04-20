<template>
	<!-- <view id="main">
		<u-line-progress active-color="#2979ff" height="40" :percent="per" :striped="true" :striped-active="true"></u-line-progress>
	</view> -->
	<view>
		<u-row id="main">
			<u-col span="8">
				<u-line-progress active-color="#2979ff" height="90" :percent="per" :striped="true" :striped-active="true">
					<slot></slot>
				</u-line-progress>
			</u-col>
			<u-col span="4">
				<u-circle-progress type="primary" :percent="per">
						<view class="u-progress-content">
							<text class='u-progress-info'>人生圈{{per}}%</text>
						</view>
					</u-circle-progress>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default{
		props:{
			per:Number
		}
	}
</script>

<style>
	#main{
		padding-top: 20px;
		padding-left: 20px;
		padding-right: 20px;
	}
</style>
