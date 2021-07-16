<template>
  <div v-if="show" class="w-full h-screen fixed left-0 top-0 flex items-center justify-center inset-0 z-40">
    <div class="absolute bg-gray-800 opacity-80 inset-0 z-0"></div>

    <div class="w-full h-full flex items-center justify-center">
      <div class="enlargContainer relative z-50">
        <img class="img" src="@/assets/images/enlargeImg.png" alt="">
        <img class="absolute top-0 -right-8 z-50 cursor-pointer" src="@/assets/images/colseBtn.png" width="28px" height="28px" @click="show = false">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  watch: {
    value: {
      handler(val) {
        const vm = this;

        vm.show = val;
      },
    },
    show(val) {
      const vm = this;

      vm.$emit("input", val);
    },
  },
};
</script>
<style>
.enlargContainer {
  width: 42%;
}
@media (max-width: 1024px) {
  .enlargContainer {
    width: 80%;
  }
  .enlargContainer .closeBtn {
    width: 8%;
  }
}
</style>