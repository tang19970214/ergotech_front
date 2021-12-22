<template>
  <div>
    <div class="fixed top-0 w-full z-30">
      <div class="headerBG bg-primary w-full h-14 sm:h-16 flex items-center justify-center">
        <!-- hidden sm:block -->
        <nuxt-link to="/checkOperation"  class="hidden sm:flex min-w-max  items-center justify-center">
          <img class="w-36 sm:w-60 h-10 sm:h-16 ml-2 sm:ml-0" src="@/assets/images/Logo.png" alt="人因工程檢核表">
          <img class="w-18 h-10 sm:h-16" :src="this.company.item.iconName" v-if="this.company.item && this.company.item.iconName" alt="">
        </nuxt-link>

        <div class="hidden sm:block w-full">
          <div class="w-full h-full px-6 box-border flex items-center justify-end sm:justify-between">
            <div class="flex items-center">
              <label class="text-white text-sm">{{companyName}}</label>
            </div>

            <!-- 下拉 -->
            <div class="relative" @mouseenter="openSelect = true" @mouseleave="openSelect = false">
              <div class="py-2 flex items-center">
                <!-- <label class="text-white text-sm tracking-wider">HI! {{userInfo.name}}</label> -->
                <label class="text-white text-sm tracking-wider">HI! {{userInfo.name}}</label>
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

        <!-- block sm:hidden -->
        <div class="block sm:hidden">
          <strong class="text-white">執行檢核作業</strong>
          <div class="absolute top-4 left-5">
            <nuxt-link to="/checkOperation">
              <font-awesome-icon class="text-white text-lg" :icon="['fas', 'arrow-left']" />
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="block sm:hidden w-full h-8 bg-white flex items-center justify-center">
        <strong class="text-primary text-sm">{{companyName}}</strong>
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
                <input type="text" class="w-full border rounded-sm text-sm px-2 py-1" :value="userInfo.phone" placeholder="0987654321">
              </div>
              <div class="w-full flex items-center mb-4">
                <label class="formLabel text-sm">email</label>
                <input type="text" class="w-full border rounded-sm text-sm px-2 py-1" :value="userInfo.email" placeholder="abcde123456@gmail.com">
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
      company: {},

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
  computed: {
    companyName() {
      return this.company.item?.parentName
    },
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
          "userInfoClient",
          JSON.stringify(res.data.result)
        );
      });
    },
    getUserCompamy () {
      this.$api.getOrgsTree().then((res)=> {
        this.company = res.data.result[0]
      })
    },
  },
  mounted() {
    this.getProfileList();
    this.getUserCompamy();
  },
};
</script>

<style>
@media (min-width: 640px) {
  .headerBG {
    background: linear-gradient(270deg, #178d7b 0%, #1e86ba 99.8%);
  }
}

.formLabel {
  min-width: 64px;
  max-width: 64px;
}
</style>