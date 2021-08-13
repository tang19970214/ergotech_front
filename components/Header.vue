<template>
  <div>
    <div class="fixed top-0 w-full z-30">
      <div class="headerBG bg-primary w-full h-14 sm:h-16 flex items-center justify-center">
        <nuxt-link to="/checkOperation">
          <img class="w-36 sm:w-60 h-10 sm:h-16 ml-2 sm:ml-0" src="@/assets/images/Logo.png" alt="人因工程檢核表">
        </nuxt-link>

        <div class="w-full h-full px-6 box-border flex items-center justify-end sm:justify-between">
          <div class="hidden sm:block flex items-center">
            <label class="text-white text-sm">公司名 首頁</label>
          </div>

          <!-- 下拉 -->
          <div class="relative" @mouseenter="openSelect = true" @mouseleave="openSelect = false">
            <div class="py-2 flex items-center">
              <!-- <label class="text-white text-sm tracking-wider">HI! {{userInfo.name}}</label> -->
              <label class="text-white text-sm tracking-wider">HI! 王小明</label>
              <font-awesome-icon class="text-white ml-1 text-xs" :icon="['fas', 'chevron-down']" />
            </div>

            <div class="absolute right-0 bg-white rounded-sm shadow-lg whitespace-nowrap" v-if="openSelect">
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
                <strong class="text-sm">{{userInfo.account}}</strong>
              </div>
              <!-- <div class="w-full flex items-center mb-4">
                <label class="formLabel text-sm">密碼</label>
                <input type="text" class="w-full border rounded-sm text-sm px-2 py-1" placeholder="abcde123456">
              </div> -->
              <div class="w-full flex items-center mb-4">
                <label class="formLabel text-sm">部門</label>
                <strong class="text-sm">生產部門</strong>
              </div>
              <div class="w-full flex items-center mb-4">
                <label class="formLabel text-sm">姓名</label>
                <strong class="text-sm">{{userInfo.name}}</strong>
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
</template>

<script>
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
      openModal: false,
    };
  },
  methods: {
    onBtnClick(id) {
      switch (id) {
        case 1:
          this.openModal = true;
          break;
        case 2:
          this.$router.push({ name: "checkOperation" });
          break;
        case 3:
          this.$swal
            .fire({
              title: "確定要登出嗎?",
              text: "",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "確定",
              cancelButtonText: "取消",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.$store.dispatch("LogOut").then(() => {
                  this.$swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "登出成功",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  this.$router.push({ name: "login" });
                });
              }
            });
          break;
      }
    },
    getProfileList() {
      this.$api.getUserProfile().then((res) => {
        this.userInfo = res.data.result;
        window.localStorage.setItem(
          "userInfo",
          JSON.stringify(res.data.result)
        );
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