<template>
  <div class="w-full bg-ccc border-b-8 border-white flex items-center">
    <div class="relative w-32 sm:w-36 h-12 sm:h-14 flex items-center justify-center" :class="{'bg-white border-tab': item.id == defaultTab, 'bg-tab cursor-pointer hover:opacity-80': item.id !== defaultTab}" v-for="item in tabList" :key="item.id" @click="changeTab(item.id)">
      <strong class="block sm:hidden text-base">{{item.text_phone}}</strong>
      <strong class="hidden sm:block text-xl">{{item.text}}</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    defaultTab: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changeTab(id) {
      this.$emit("changeTab", id);
    },
  },
};
</script>

<style>
.border-tab::before {
  content: "";
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  border-top: 6px solid #168ec7;
}
</style>