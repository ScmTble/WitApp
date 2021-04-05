<template>
	<!-- 人生进度条 -->
	<linetime :per="new Date().getFullYear() - 2000">第{{ week }}周</linetime>
</template>

<script>
	import linetime from "../schedule/linetime.vue"
	export default{
		components:{
			linetime
		},
		props:{
			week:Number
		}
	}
</script>