import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
	UserInfo:{},
	Token:"",
	classList:[],
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
		state.classList = res.data.data[0].item;
	},
	// 更新周
	upateCurrentWeek(state,week){
		state.currentWeek = week;
	}
  }
})