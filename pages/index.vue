<template>
  <div class="relative w-full min-h-screen bg-gray-200">
    <Header @openUserModal="openUserModal" />

    <div class="defaultPage min-h-screen sm:pt-16 flex items-center justify-center flex-col">
      <div class="btnList w-80 sm:w-96 h-20 md:h-40 bg-white flex items-center justify-between" v-for="item in btnList" :key="item.id">
        <div class="px-4 md:px-12 flex items-center justify-center">
          <img class="w-8 md:w-20" :src="item.icon" :alt="item.text">
          <strong class="text-2xl md:text-4xl ml-2 md:ml-5">{{item.text}}</strong>
        </div>
        <div class="w-20 md:w-40 h-full flex items-center justify-center bg-primary duration-300 cursor-pointer" @click="btnFunc(item)">
          <font-awesome-icon class="text-white text-3xl" :icon="['fas', 'chevron-right']" />
        </div>
      </div>

      <!-- modal -->
      <transition name="showModal">
        <div class="w-full h-screen fixed left-0 top-0 flex items-center justify-center inset-0 z-50" v-if="openModal">
          <div class="absolute bg-gray-800 opacity-80 inset-0 z-0"></div>
          <div class="w-80 sm:w-96 relative mx-auto my-auto shadow-lg rounded-md bg-white ">
            <!-- header -->
            <div class="bg-modalHeader w-full py-3 px-4 rounded-t-md flex items-center justify-between">
              <strong class="text-white text-lg">使用者維護</strong>
              <span class="w-5 h-5 rounded-full bg-white border-2 border-black flex items-center justify-center cursor-pointer duration-300 hover:bg-gray-200" @click="openModal = false">
                <font-awesome-icon class="text-sm" :icon="['fas', 'times']" />
              </span>
            </div>
            <!--content-->
            <!--body-->
            <div class="w-full p-5 box-border flex items-center justify-center border-b">
              <form class="w-full">
                <div class="w-full flex items-center mb-4">
                  <label class="formLabel text-sm">帳號</label>
                  <strong class="text-sm">abcde123456</strong>
                </div>
                <div class="w-full flex items-center mb-4">
                  <label class="formLabel text-sm">密碼</label>
                  <input type="text" class="w-full border rounded-sm text-sm px-2 py-1" placeholder="abcde123456">
                </div>
                <div class="w-full flex items-center mb-4">
                  <label class="formLabel text-sm">部門</label>
                  <strong class="text-sm">生產部門</strong>
                </div>
                <div class="w-full flex items-center mb-4">
                  <label class="formLabel text-sm">姓名</label>
                  <strong class="text-sm">王小明</strong>
                </div>
                <div class="w-full flex items-center mb-4">
                  <label class="formLabel text-sm">手機號碼</label>
                  <input type="text" class="w-full border rounded-sm text-sm px-2 py-1" placeholder="0987654321">
                </div>
                <div class="w-full flex items-center mb-4">
                  <label class="formLabel text-sm">email</label>
                  <input type="text" class="w-full border rounded-sm text-sm px-2 py-1" placeholder="abcde123456@gmail.com">
                </div>
              </form>
            </div>
            <!--footer-->
            <div class="w-full p-3 flex items-center justify-end">
              <button class="py-2 px-5 bg-primary box-border text-sm font-medium text-white rounded-sm">確定</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  components: { Header },
  data() {
    return {
      openModal: false,
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
    btnFunc(item) {
      switch (item.id) {
        case 1:
          this.openUserModal();
          break;
        case 2:
          this.$router.push({ name: item.pathName });
          break;
      }
    },
    openUserModal() {
      this.openModal = true;
    },
  },
};
</script>

<style>
.defaultPage {
  margin: 0 auto;
}

@media (max-width: 639px) {
  .defaultPage {
    padding-top: 88px;
  }
}

@media (min-width: 768px) {
  .btnList {
    width: 640px;
  }
}

.btnList:first-child {
  margin-bottom: 40px;
}
</style>