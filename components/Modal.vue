<template>
  <transition name="alert">
    <div class="w-full h-screen fixed left-0 top-0 flex items-center justify-center inset-0 z-50" v-if="openModal">
      <div class="absolute bg-gray-800 opacity-80 inset-0 z-0"></div>
      <div class="w-80 sm:w-2/5 relative mx-auto my-auto shadow-lg rounded bg-white ">
        <!-- header -->
        <div class="bg-modalHeader w-full h-12 px-6 rounded-t flex items-center">
          <strong class="text-white text-lg">{{headerText}}</strong>
        </div>
        <!--content-->
        <!--body-->
        <div class="w-full p-6 box-border flex flex-col justify-center">
          <strong class="text-primary mb-1">{{title}}</strong>
          <ul>
            <li class="text-sm font-semibold py-1" v-for="(t, idx) in introduceList" :key="idx">{{t.text}}</li>
          </ul>
        </div>
        <!--footer-->
        <div class="w-full py-2 px-4 text-right">
          <button class="bg-primary py-1 px-3 text-sm font-medium text-white rounded-sm" @click="closeModal()">確定</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    openModal: {
      type: Boolean,
      required: true,
    },
    headerText: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    introduceList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>