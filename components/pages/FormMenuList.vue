<template>
  <div>
    <div class="block sm:hidden px-4">
      <div class="relative w-full h-12 flex items-center">
        <div class="w-full box-border px-4 py-3 flex items-center justify-between bg-white rounded-l" @click="openMenu = !openMenu">
          <div class="flex items-center">
            <img class="mr-1" :src="menuList[defaultMenu - 1].icon" :alt="menuList[defaultMenu - 1].title">
            <strong class="text-lg">{{menuList[defaultMenu - 1].title}}</strong>
            <p class="text-sm">{{menuList[defaultMenu - 1].introduce}}</p>
          </div>

          <div>
            <strong class="text-sm text-warning">(0/{{menuList[defaultMenu - 1].qusNum}})</strong>
          </div>
        </div>

        <div class="w-12 h-12 flex items-center justify-center bg-primary rounded-r" @click="openMenu = !openMenu">
          <font-awesome-icon class="text-white text-xs" :icon="['fas', 'chevron-down']" />
        </div>

        <!-- select -->
        <transition name="showModal">
          <div class="absolute top-12 left-0 w-full z-20" v-if="openMenu">
            <div class="w-full h-12 px-4 box-border flex items-center bg-white shadow" :class="{'bg-menuActive text-white': item.id == defaultMenu}" v-for="item in menuList" :key="item.id" @click="changeMenu(item.id)">
              <div class="w-full flex items-center">
                <img class="mr-2" :src="item.icon_active" :alt="item.title" v-if="item.id == defaultMenu">
                <img class="mr-2" :src="item.icon" :alt="item.title" v-else>

                <strong class="text-lg">{{item.title}}</strong>
                <p class="text-sm">{{item.introduce}}</p>
              </div>

              <div class="w-11">
                <strong class="text-sm" :class="{'text-white': item.id == defaultMenu, 'text-warning': item.id !== defaultMenu}">(0/{{item.qusNum}})</strong>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="hidden sm:block w-72 shadow-md">
      <div class="relative w-full p-4 bg-white border-b box-border flex items-center justify-between cursor-pointer" :class="{'bg-menuActive text-white': item.id == defaultMenu, 'hover:bg-gray-100': item.id !== defaultMenu}" v-for="item in menuList" :key="item.id" @click="changeMenu(item.id)">
        <div class="w-full flex items-center">
          <img class="mr-2" :src="item.icon_active" :alt="item.title" v-if="item.id == defaultMenu">
          <img class="mr-2" :src="item.icon" :alt="item.title" v-else>

          <strong class="text-lg">{{item.title}}</strong>
          <p class="text-sm">{{item.introduce}}</p>
        </div>

        <div class="w-11">
          <strong class="text-sm" :class="{'text-white': item.id == defaultMenu, 'text-warning': item.id !== defaultMenu}">(0/{{item.qusNum}})</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      require: true,
    },
    defaultMenu: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      openMenu: false,
    };
  },
  methods: {
    changeMenu(id) {
      this.openMenu = false;
      this.$emit("changeMenu", id);
    },
  },
};
</script>