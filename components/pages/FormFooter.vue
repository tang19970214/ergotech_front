<template>
  <div>
    <div class="block sm:hidden">
      <div class="w-full px-3 py-4 box-border fixed bottom-0 left-0 bg-white z-20">
        <div class="w-full flex items-center justify-around">
          <!-- 上一個類型 -->
          <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center">
            <font-awesome-icon class="text-white text-xs mr-1" :icon="['fas', 'chevron-left']" />
            <strong class="text-sm text-white">上一個類型</strong>
          </button>

          <!-- 下一個類型 -->
          <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center">
            <strong class="text-sm text-white">下一個類型</strong>
            <font-awesome-icon class="text-white text-xs ml-1" :icon="['fas', 'chevron-right']" />
          </button>

          <!-- 暫存 -->
          <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center">
            <strong class="text-sm text-white">暫存</strong>
          </button>

          <!-- 送出 -->
          <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center">
            <strong class="text-sm text-white">送出</strong>
          </button>
        </div>
      </div>
    </div>

    <div class="hidden sm:block">
      <div class="w-full p-6 flex items-center justify-center">
        <!-- 上一個類型 -->
        <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center mx-1" @click="formBtn('prev')">
          <font-awesome-icon class="text-white text-xs mr-1" :icon="['fas', 'chevron-left']" />
          <strong class="text-sm text-white">上一個類型</strong>
        </button>

        <!-- 下一個類型 -->
        <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center mx-1" @click="formBtn('next')">
          <strong class="text-sm text-white">下一個類型</strong>
          <font-awesome-icon class="text-white text-xs ml-1" :icon="['fas', 'chevron-right']" />
        </button>

        <!-- 暫存 -->
        <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center mx-1" @click="formBtn('save')">
          <strong class="text-sm text-white">暫存</strong>
        </button>

        <!-- 送出 -->
        <button class="bg-primary px-3 py-1 rounded-sm flex items-center justify-center mx-1" @click="formBtn('send')">
          <strong class="text-sm text-white">送出</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    formBtn(str) {
      this.$emit("formBtn", str);
    },
  },
};
</script>