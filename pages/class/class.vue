<template>
	<view class="wrap">
		<u-row>
			<u-col span="2">
				<u-icon name="clock" color="#2979ff" size="50"></u-icon>
			</u-col>
			<u-col span="9">
				<u-calendar v-model="Date_show" @change="date_cb" mode="date" :min-date="getNowFormatDate" :max-date="getNextDate"></u-calendar>
				<u-input :border="true" v-model="show_date" @click="Date_show = true" :disabled="true" placeholder="选择使用日期"/>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="2">
				<u-icon name="list" color="#2979ff" size="50"></u-icon>
			</u-col>
			<u-col span="9">
					<u-select v-model="session_show" :list="session_list" mode="mutil-column" @confirm="session_cb"></u-select>
					<u-input :border="true" v-model="show_session" @click="session_show = true" :disabled="true" placeholder="选择使用节次"/>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="2">
				<u-icon name="list" color="#2979ff" size="50"></u-icon>
			</u-col>
			<u-col span="9">
					<u-select v-model="bd_show" mode="single-column" :list="bd_list" @confirm="bd_cb"></u-select>
					<u-input :border="true" v-model="show_bd" @click="bd_show=true" :disabled="true" placeholder="选择教学楼"/>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<u-button type="primary" id="btn" @click="getClassromm()" :disabled="!isLogin">查询</u-button>
			</u-col>
			<u-col span="6">
				<u-button type="primary" id="btn" @click="calearAll()">清除</u-button>
			</u-col>
		</u-row>
		<view id="result">
			<u-cell-item v-for="room in roomList" icon="calendar" :key="room.classroomname" :title="room.classroomname" :value="'人数:'+room.seatnumber" :arrow="false"></u-cell-item>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				Date_show: false, // 控制是否显示Date
				session_show:false, // 控制是否显示节次
				bd_show:false,// 控制是否显示教学楼
				show_date:"", // 用户选择的date
				show_session_start:"",// 用户选择的节次开始时间
				show_session_end:"",// 用户选择的节次结束时间
				show_bd:"",// 选择的教学楼（展示）
				bd_id:"",// 教学楼id请求数据用
				result:"",// 请求结果
				
				// 教学楼列表
				bd_list:[
					{
						value: 'A6FB263556894586878DB4F6567ED594',
						label: '流芳校区一教'
					},
					{
						value: '345A8AB06E1F4ABC9673864EB5615DDE',
						label: '流芳校区二教'
					},
					{
						value: 'DAFA2623B82A42A7B2ED1E979822D0E1',
						label: '流芳校区三教'
					},
					{
						value: '4512871F1E064E17956F2326AE4F3CD3',
						label: '流芳校区四教'
					}
				],
				
				// 节次列表
				session_list:[
					[
						{
							value: '01',
							label: '01'
						},
						{
							value: '02',
							label: '02'
						},
						{
							value: '03',
							label: '03'
						},
						{
							value: '04',
							label: '04'
						},
						{
							value: '05',
							label: '05'
						},
						{
							value: '06',
							label: '06'
						},
						{
							value: '07',
							label: '07'
						},
						{
							value: '08',
							label: '08'
						},
						{
							value: '09',
							label: '09'
						},
						{
							value: '10',
							label: '10'
						},
						{
							value: '11',
							label: '11'
						},
						{
							value: '12',
							label: '12'
						}
					],
					[
						{
							value: '01',
							label: '01'
						},
						{
							value: '02',
							label: '02'
						},
						{
							value: '03',
							label: '03'
						},
						{
							value: '04',
							label: '04'
						},
						{
							value: '05',
							label: '05'
						},
						{
							value: '06',
							label: '06'
						},
						{
							value: '07',
							label: '07'
						},
						{
							value: '08',
							label: '08'
						},
						{
							value: '09',
							label: '09'
						},
						{
							value: '10',
							label: '10'
						},
						{
							value: '11',
							label: '11'
						},
						{
							value: '12',
							label: '12'
						}
					],
					
				],
			}
		},
		methods:{
			date_cb(data){
				// this.show_date = data['result']
				let date = data['result']
				let strArray = date.split("-");
				strArray[1]=strArray[1].replace('0','');
				this.show_date = strArray.join('-');
			},
			session_cb(data){
				this.show_session_start = data[0]['value'];
				this.show_session_end = data[1]['value'];
			},
			bd_cb(data){
				this.show_bd = data[0]['label'];
				this.bd_id = data[0]['value'];
			},
			getClassromm(){
				if(this.show_date==''||this.show_bd==''||this.show_session==''){
					uni.showToast({
						title:"请选择完整！",
						icon:"none"
					})
				}
				else
				{
					uni.request({
						method:"POST",
						url:"http://jwapp.wit.edu.cn/whgcdxhd/student/getIdleClassroom",
						header:{
							'content-type':"application/x-www-form-urlencoded",
							token:this.Token
						},
						data:{
							date:this.show_date,
							buildingId:this.bd_id,
							nodeId:this.show_session_start+this.show_session_end,
							campusId:2
						},
						success: (res) => {
							this.result = res['data'];
							uni.showToast({
								title:this.result.Msg,
								icon:"success"
							})
						}
					})
				}
			},
			calearAll(){
				this.show_date=""; // 用户选择的date
				this.show_session_start="";// 用户选择的节次开始时间
				this.show_session_end="";// 用户选择的节次结束时间
				this.show_bd="";// 选择的教学楼（展示）
				this.bd_id="";// 教学楼id请求数据用
				this.result="";// 请求结果
				uni.showToast({
					title:"清除完成",
					icon:"success"
				})
			}
		},
		computed:{
			show_session(){
				if(this.show_session_start==''&&this.show_session_end==''){
					return "";
				}
				else{
					return (this.show_session_start + '-' +this.show_session_end)
				}
			},
			getNowFormatDate() {
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				// if (month >= 1 && month <= 9) {
				// 	month = "0" + month;
				// }
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				return currentdate;
			},
			getNextDate(){
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear()+1;
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				// if (month >= 1 && month <= 9) {
				// 	month = "0" + month;
				// }
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				return currentdate;
			},
			roomList(){
				try
				{
					return this.result.data[0].classroomList;
				}
				catch(err)
				{
				    return [{classroomname:"ScmTble",seatnumber:"5201314"}];
				}
			},
			...mapState(['isLogin','UserInfo','Token'])
		}
	}
</script>

<style>
#btn{
	margin-left: 20px;
	margin-right: 20px;
}

#sl{
	padding-top: 20rpx;
}
#result{
	padding-top: 10px;
}

.u-row{
	padding-top: 40px;
	padding-left: 10px;
	padding-right: 10px;
}

.wrap {
		padding: 24rpx;
		text-align: center;
	}
</style>
