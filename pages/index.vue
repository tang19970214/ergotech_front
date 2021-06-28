<template>
  <div class="flex items-center justify-center flex-col">
    <div class="btnList w-80 sm:w-96 h-20 md:h-40 bg-white flex items-center justify-between" v-for="item in btnList" :key="item.id">
      <div class="px-4 md:px-12 flex items-center justify-center">
        <img class="w-8 md:w-20" :src="item.icon" :alt="item.text">
        <strong class="text-2xl md:text-4xl ml-2 md:ml-5">{{item.text}}</strong>
      </div>
      <div class="w-20 md:w-40 h-full flex items-center justify-center bg-primary duration-300 cursor-pointer" @click="goPage(item.pathName)">
        <font-awesome-icon class="text-white text-3xl" :icon="['fas', 'chevron-right']" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnList: [
        {
          id: 1,
          icon: require("@/assets/images/icon/user.png"),
          text: "使用者帳號維護",
          pathName: "index",
        },
        {
          id: 2,
          icon: require("@/assets/images/icon/work.png"),
          text: "檢核作業",
          pathName: "checkOperation",
        },
      ],
    };
  },
  methods: {
    goPage(pathName) {
      this.$router.push({ name: pathName });
    },
  },
};
</script>

<style>
@media (min-width: 768px) {
  .btnList {
    width: 640px;
  }
}

.btnList:first-child {
  margin-bottom: 40px;
}
</style>