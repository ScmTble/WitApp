import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
	UserInfo:{},
	Token:"",
	classList:[[],[],[],[],[],[],[]],
	currentWeek:1,
  },
  mutations: {
	  // 登录
    login(state,user){

		uni.setStorage({
			key: 'UserInfo',
			data: user,
			success:()=>{
				state.isLogin = true;
				state.UserInfo = user;
				state.Token = user['token'];
			}
		})
	},
	// 注销
	loginout(state){
		state.isLogin = false;
		state.UserInfo = {};
		state.Token = '';
		uni.removeStorage({
			key: 'UerInfo'
		});
	},
	// 第二次进入
	SecondEnt(state,UserInfo){
		state.isLogin = true;
		state.UserInfo = UserInfo;
		state.Token = UserInfo['token'];
	},
	// 更新课表信息
	updateClass(state,res){
		try{
			let result = DealClassList(res.data.data[0].item);
			result.shift();
			state.classList = result;
			uni.setStorage({
				key:"classList",
				data:result,
			})
		}
		catch(e){
			state.classList = res;
		}
		
	},
	// 更新周
	upateCurrentWeek(state,res){
		try{
			let week = res.data.data[0].week;
			state.currentWeek = week;
			uni.setStorage({
				key:"currentweek",
				data:week,
			})
		}
		catch(e){
			state.currentWeek = res;
		}
		
	}
  }
})

function DealClassList(classList) {
	let result = [
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[]
	];
	for (let one of classList) {
		if (one.classTime[0] == 1) {
			result[1].push(one);
		} else if (one.classTime[0] == 2) {
			result[2].push(one);
		} else if (one.classTime[0] == 3) {
			result[3].push(one);
		} else if (one.classTime[0] == 4) {
			result[4].push(one);
		} else if (one.classTime[0] == 5) {
			result[5].push(one);
		} else if (one.classTime[0] == 6) {
			result[6].push(one);
		} else if (one.classTime[0] == 7) {
			result[7].push(one);
		}
	}
	return result;
}