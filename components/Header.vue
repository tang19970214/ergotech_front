<template>
  <div>
    <div class="fixed top-0 w-full z-30">
      <div class="headerBG bg-primary w-full h-14 sm:h-16 flex items-center justify-center">
        <nuxt-link to="/index">
          <img class="w-36 sm:w-60 h-10 sm:h-16 ml-2 sm:ml-0" src="@/assets/images/Logo.png" alt="人因工程檢核表">
        </nuxt-link>

        <div class="w-full h-full px-6 box-border flex items-center justify-end sm:justify-between">
          <div class="hidden sm:block flex items-center">
            <label class="text-white text-sm">公司名 首頁</label>
          </div>

          <!-- 下拉 -->
          <div class="relative" @mouseenter="openSelect = true" @mouseleave="openSelect = false">
            <div class="py-2 flex items-center">
              <label class="text-white text-sm tracking-wider">HI! {{userInfo.name}}</label>
              <font-awesome-icon class="text-white ml-1 text-xs" :icon="['fas', 'chevron-down']" />
            </div>

            <div class="absolute t-3 bg-white rounded-sm shadow-lg whitespace-nowrap" v-if="openSelect">
              <ul>
                <li class="py-2 px-4 text-sm hover:bg-gray-200 duration-300 cursor-pointer" v-for="item in optionList" :key="item.id" @click="onBtnClick(item.id)">{{item.text}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="block sm:hidden w-full h-8 bg-white flex items-center justify-center">
        <strong class="text-primary text-sm">公司名</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserProfile } from "../api/api.js";

export default {
  data() {
    return {
      userInfo: {},

      openSelect: false,
      optionList: [
        { id: 1, text: "使用者帳號維護" },
        { id: 2, text: "檢核作業" },
        { id: 3, text: "登出" },
      ],
      // modal
      // openModal: false,
    };
  },
  methods: {
    onBtnClick(id) {
      switch (id) {
        case 1:
          this.$emit("openUserModal");
          break;
        case 2:
          break;
        case 3:
          this.$router.push({ name: "login" });
          break;
      }
    },
    getProfileList() {
      getUserProfile().then((res) => {
        this.userInfo = res.data.result;
        window.localStorage.setItem("userInfo", res.data.result);
      });
    },
  },
  mounted() {
    this.getProfileList();
  },
};
</script>

<style>
@media (min-width: 640px) {
  .headerBG {
    background: linear-gradient(270deg, #178d7b 0%, #1e86ba 99.8%);
  }
}
</style>