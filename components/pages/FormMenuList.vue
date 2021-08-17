<template>
  <div v-if="menuList.length>0">
    <div class="block md:hidden">
      <div class="relative w-full h-12 px-4 border-box flex items-center mb-4 md:mb-0">
        <div class="w-full h-full box-border px-4 py-3 flex items-center justify-between bg-white rounded-l" @click="openMenu = !openMenu">
          <div class="flex items-center">
            <!-- <img class="mr-1" :src="menuList[defaultMenu - 1].icon" :alt="menuList[defaultMenu - 1].modelName"> -->
            <strong class="text">{{menuList[defaultMenu - 1].modelName}}</strong>
            <!-- <p class="text-sm">{{menuList[defaultMenu - 1].introduce}}</p> -->
          </div>

          <div>
            <strong class="text-sm text-warning">(0/{{caculateTotalDetailNumber(menuList[defaultMenu - 1])}})</strong>
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

                <strong class="text-lg">{{item.modelName}}</strong>
                <!-- <p class="text-sm">{{item.introduce}}</p> -->
              </div>

              <div class="w-11">
                <strong class="text-sm" :class="{'text-white': item.id == defaultMenu, 'text-warning': item.id !== defaultMenu}">(0/{{caculateTotalDetailNumber(item)}})</strong>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="hidden md:block w-72 shadow-md">
      <div class="relative w-full p-4 bg-white border-b box-border flex items-center justify-between cursor-pointer" :class="{'bg-menuActive text-white': item.id == defaultMenu, 'hover:bg-gray-100': item.id !== defaultMenu}" v-for="item in menuList" :key="item.id" @click="changeMenu(item.id)">
        <div class="w-full flex items-center">
          <img class="mr-2" :src="item.icon_active" :alt="item.title" v-if="item.id == defaultMenu">
          <img class="mr-2" :src="item.icon" :alt="item.title" v-else>

          <strong class="text">{{item.modelName}}</strong>
          <!-- <p class="text-sm">{{item.introduce}}</p> -->
        </div>

        <div class="w-11">
          <strong class="text-sm" :class="{'text-white': item.id == defaultMenu, 'text-warning': item.id !== defaultMenu}">(0/{{caculateTotalDetailNumber(item)}})</strong>
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
      required: true,
    },
    defaultMenu: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      openMenu: false,
    };
  },
  computed: {
    caculateTotalDetailNumber(){
      return (item) => {
        let total = 0
        item.typeList.forEach( item => {
          total += item.detaiList.length
        });
        return total
      }
    }
  },
  methods: {
    changeMenu(id) {
      this.openMenu = false;
      this.$emit("changeMenu", id);
    },
  },
};
</script>