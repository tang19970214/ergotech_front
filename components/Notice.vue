<template>
  <transition name="showModal">
    <div class="w-full h-screen fixed left-0 top-0 flex items-center justify-center inset-0 z-50" v-if="openNotice">
      <div class="absolute bg-gray-800 opacity-80 inset-0 z-0"></div>
      <div class="w-80 sm:w-96 relative mx-auto my-auto shadow-lg rounded bg-white ">
        <!-- header -->
        <div class="bg-modalHeader w-full h-12 rounded-t flex items-center justify-between"></div>
        <!--content-->
        <!--body-->
        <div class="w-full pt-9 px-6 pb-4 box-border flex flex-col items-center justify-center">
          <font-awesome-icon class="text-7xl mb-2" :class="setColor(type)" :icon="['fas', setIcon(type)]" />
          <strong class="text-3xl mb-1" :class="setColor(type)">{{message}}</strong>
          <strong class="text-lg text-center">{{introduce}}</strong>
          <p class="text-sm w-full text-left text-red-500" v-for="(item,index) in notValidText" :key="index">{{item}}</p>
        </div>
        <!--footer-->
        <div class="w-full p-3 space-x-4 flex items-center">
          <button class="w-full bg-white p-1 box-border text-sm font-medium border rounded-sm" @click="closeNotice('stay')" v-if="type !== 'success'">
            留在此頁
          </button>
          <button class="w-full bg-primary p-1 box-border text-sm font-medium text-white rounded-sm" @click="closeNotice()" v-if="type !== 'success'">確定</button>

          <button class="w-full bg-primary p-1 box-border text-sm font-medium text-white rounded-sm" @click="closeNotice(nexyOrPreType)" v-if="type == 'success'">確定</button>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  props: {
    openNotice: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    introduce: {
      type: String,
    },
    notValidText: {
      type: [Array]
    },
    nexyOrPreType: {
      type: String
    }
  },
  computed: {
    setColor() {
      return (type) => {
        return "text-" + type;
      };
    },
    setIcon() {
      return (type) => {
        switch (type) {
          case "success":
            return "check-circle";
          case "warning":
            return "exclamation-circle";
          case "danger":
            return "times-circle";
          case "secondary":
            return "info-circle";
        }
      };
    },
  },
  methods: {
    closeNotice(value) {
      this.$emit("closeNotice", value);
    },
  },
};
</script>