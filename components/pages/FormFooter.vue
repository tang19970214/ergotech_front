<template>
  <div>
    <div class="block sm:hidden">
      <div class="w-full px-3 py-4 box-border fixed bottom-0 left-0 bg-white z-20">
        <div class="w-full flex items-center justify-around">
          <!-- 上一個類型 -->
          <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center" @click="formBtn('prev')"  :class="{'status__disable': !stepPreStatus}">
            <font-awesome-icon class="text-white text-xs mr-1" :icon="['fas', 'chevron-left']" />
            <strong class="text-sm text-white">上一頁</strong>
          </button>

          <!-- 下一個類型 -->
          <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center" @click="formBtn('next')"  :class="{'status__disable': !stepNextStatus}">
            <strong class="text-sm text-white">下一頁</strong>
            <font-awesome-icon class="text-white text-xs ml-1" :icon="['fas', 'chevron-right']" />
          </button>

          <!-- 暫存 -->
          <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center" v-if="!readable" @click="formBtn('save')">
            <strong class="text-sm text-white">暫存</strong>
          </button>

          <!-- 送出 -->
          <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center" :class="{'status__disable': sendStatus}" v-if="!readable" @click="formBtn('sendConfirm')">
            <strong class="text-sm text-white">送出</strong>
          </button>
        </div>
      </div>
    </div>

    <div class="hidden sm:block">
      <div class="w-full p-6 flex items-center justify-center">
        <!-- 上一個類型 -->
        <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center mx-1" @click="formBtn('prev')" :class="{'status__disable': !stepPreStatus}">
          <font-awesome-icon class="text-white text-xs mr-1" :icon="['fas', 'chevron-left']" />
          <strong class="text-sm text-white">上一頁</strong>
        </button>

        <!-- 下一個類型 -->
        <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center mx-1" @click="formBtn('next')"  :class="{'status__disable': !stepNextStatus}">
          <strong class="text-sm text-white">下一頁</strong>
          <font-awesome-icon class="text-white text-xs ml-1" :icon="['fas', 'chevron-right']" />
        </button>

        <!-- 暫存 -->
        <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center mx-1" v-if="!readable" @click="formBtn('save')">
          <strong class="text-sm text-white">暫存</strong>
        </button>

        <!-- 送出 -->
        <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center mx-1" :class="{'status__disable': sendStatus}" v-if="!readable" @click="formBtn('sendConfirm')">
          <strong class="text-sm text-white">送出</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stepNextStatus:{
      type: Boolean,
      require: true
    },
    stepPreStatus: {
      type: Boolean,
      require: true
    },
    readable: {
      type: Boolean,
      require: true
    },
    sendStatus: {
      type: Boolean,
      require: true,
    }
  },
  methods: {
    formBtn(str) {
      this.$emit("formBtn", str);
    },
  },
};
</script>

<style lang="scss" scoped>
.status{
  &__disable{
    cursor:not-allowed;
    opacity: 0.5;
  }
}
</style>