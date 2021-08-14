<template>
  <div class="w-full min-h-screen flex items-center justify-center">
    <div class="flex items-center justify-center flex-col">
      <div class="font-bold text-white text-5xl mb-16">Login</div>
      <div class="relative p-12 box-border bg-white rounded shadow-md">
        <div class="absolute -top-11 left-0 w-full sign flex items-center justify-center">
          <img src="@/assets/images/loginTitle.svg" alt="人因工程檢核表">
          <div class="absolute top-6 left-0 w-full text-center z-10">
            <strong class="loginTitle text-2xl">人因工程檢核表</strong>
          </div>
        </div>

        <div class="w-full text-center font-bold text-lg text-primary font-mono">企業名稱</div>

        <form id="form" novalidate>
          <label class="text-sm font-bold">帳號</label>
          <div class="w-full mt-2 mb-6">
            <input v-model="temp.account" class="w-64 md:w-80 p-1 border" type="text">
          </div>

          <label class="text-sm font-bold">密碼</label>
          <div class="w-full mt-2">
            <input v-model="temp.password" class="w-64 md:w-80 p-1 border" type="text">
          </div>
        </form>

        <button class="w-full h-8 mt-12 rounded text-white bg-primary font-bold duration-300" @click="login()">登入</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      temp: {
        account: "System",
        password: "123456",
      },
    };
  },
  methods: {
    login() {
      if (this.temp.account == "" || this.temp.password == "") {
        this.$swal.fire({
          icon: "error",
          title: "請確實填寫帳號或密碼!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const vm = this;
        vm.$store.dispatch("handleLoading", true);
        vm.$store
          .dispatch("Login", {
            username: vm.temp.account,
            password: vm.temp.password,
          })
          .then(() => {
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "登入成功",
              showConfirmButton: false,
              timer: 1500,
            });
            vm.$store.dispatch("handleLoading", false);
            vm.$router.push("/checkOperation");
          });
      }
    },
  },
};
</script>

<style>
.loginTitle {
  background: linear-gradient(270deg, #178d7b 0%, #1e86ba 99.8%);
  background-clip: text;
  color: transparent;
}
</style>