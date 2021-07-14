<template>
  <transition name="closeAlert">
    <div class="w-full h-screen fixed inset-0 z-50 alertFixed" v-if="openAlert">
      <div class="alert">
        <div class="top"></div>
        <div class="body">
          <div class="py-1">
            <div>
              <svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p class="font-bold">完成</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    openAlert: {
      type: Boolean,
      required: true,
    },
    alertType: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeAlert() {
      this.$emit("closeAlert");
    },
  },
};
</script>

<style scoped>
.alert {
  width: 25%;
  background-color: rgb(230, 255, 250);
  position: fixed;
  top: 0;
  z-index: 99;
  opacity: 1;
  margin: auto;
  right: 50%;
}
.alert .body {
  padding: 2%;
}
.alert .footer {
  display: flex;
  justify-content: flex-end;
}
.alert .py-1 {
  display: flex;
  align-items: center;
}

.top {
  background-color: rgb(56, 178, 172);
  height: 4px;
}

.alertFixed {
  background-color: rgb(75, 85, 95, 0.8);
}
</style>