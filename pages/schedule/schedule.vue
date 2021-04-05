<template>
  <view>
    <!-- 滚动条 -->
    <topbar :barList="barList"></topbar>
    <!-- 人生进度条 -->
    <!-- <linetime :per="new Date().getFullYear() - 2000">第{{ currentWeek }}周</linetime> -->

    <schitem :list="todayClassList"></schitem>

    <u-row>
      <u-col span="4">
        <u-button id="btn" type="success" @click="updateClassroomList()"
          >更新</u-button
        >
      </u-col>
      <u-col span="4">
        <u-button id="btn" type="success" @click="turnurl()">本周</u-button>
      </u-col>
      <u-col span="4">
        <u-button id="btn" type="success" @click="turnnext()">下周</u-button>
      </u-col>
    </u-row>

    <u-select v-model="show" :list="weekList" @confirm="sendRequest"></u-select>
  </view>
</template>

<script>
import schitem from "./schitem.vue";
import linetime from "./linetime.vue";
import topbar from "./topbar.vue";
import { mapState } from "vuex";
export default {
  components: {
    schitem,
    // 需要传入一个Array类型的props

    linetime,
    // 需要传入per

    topbar,
    // 传入一个Array来滚动显示
  },
  computed: {
    ...mapState(["isLogin", "Token", "UserInfo", "classList", "currentWeek"]),

    currentWeekClassList() {
      let result = DealClassList(this.classList);
      return result;
    },
    // 获取今天的课程
    todayClassList() {
      let today = new Date().getDay();
      return this.currentWeekClassList[today];
    },
  },
  data() {
    return {
      barList: ["如果课程不对请及时更新当前周", "ScmTble"],
      weekList: [
        { value: 1, label: "第一周" },
        { value: 2, label: "第二周" },
        { value: 3, label: "第三周" },
        { value: 4, label: "第四周" },
        { value: 5, label: "第五周" },
        { value: 6, label: "第六周" },
        { value: 7, label: "第七周" },
        { value: 8, label: "第八周" },
        { value: 9, label: "第九周" },
        { value: 10, label: "第十周" },
        { value: 11, label: "第十一周" },
        { value: 12, label: "第十二周" },
        { value: 13, label: "第十三周" },
        { value: 14, label: "第十四周" },
        { value: 15, label: "第十五周" },
        { value: 16, label: "第十六周" },
        { value: 17, label: "第十七周" },
        { value: 18, label: "第十八周" },
        { value: 19, label: "第十九周" },
        { value: 20, label: "第二十周" },
      ],
      show: false,
    };
  },
  methods: {
    // 更新课表或首次获取课表
    updateClassroomList() {
      if (this.isLogin) {
        this.show = true;
      } else {
        uni.navigateTo({
          url: "/pages/login/index",
        });
      }
    },
    sendRequest(e) {
      this.$store.commit("upateCurrentWeek", e[0].value);
      uni.request({
        method: "POST",
        url: "http://jwapp.wit.edu.cn/whgcdxhd/student/curriculum",
        header: {
          "content-type": "application/x-www-form-urlencoded",
          token: this.Token,
        },
        data: {
          week: this.currentWeek,
        },
        success: (res) => {
          if (res.statusCode == 200) {
            this.$store.commit("updateClass", res);
            this.saveClassAndWeek(res, this.currentWeek);
            uni.showToast({
              title: "更新成功！",
              icon: "success",
            });
          } else {
            uni.showToast({
              title: "服务错误！",
              icon: "none",
            });
          }
        },
      });
    },
    // 将课表存入缓存
    saveClassAndWeek(res, week) {
      uni.setStorage({
        key: "classInfo",
        data: res,
      }),
        uni.setStorage({
          key: "weekInfo",
          data: week,
        });
    },
    turnurl() {
      uni.navigateTo({
        url: "/pages/schedule/currentweek",
      });
    },
    turnnext() {
      if (this.isLogin) {
        uni.navigateTo({
          url: "/pages/schedule/nextweek",
        });
      } else {
        uni.navigateTo({
          url: "/pages/login/index",
        });
      }
    },
  },
};
// 对课程数组进行处理
function DealClassList(classList) {
  let result = [[], [], [], [], [], [], [], []];
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
</script>

<style>
#btn {
  margin: 20px;
}
</style>
