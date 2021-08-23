<template>
  <div
    class="
      fixed
      bottom-0
      w-full
      px-4
      sm:px-16
      box-border
      h-12
      sm:h-14
      bg-footer
      flex
      items-center
      justify-around
      sm:justify-end
      border-t border-gray-300
    "
  >
    <div class="flex flex-col sm:flex-row">
      <div class="flex items-center mr-0 sm:mr-6">
        <strong>總筆數：</strong>
        <p class="text-primary">{{ listsize }}</p>
      </div>
      <div class="flex items-center mr-0 sm:mr-6">
        <strong>總頁數：</strong>
        <p class="text-primary">{{ allPages }}</p>
      </div>
    </div>

    <div class="flex items-center mr-3 sm:mr-6">
      <!-- 上一頁 -->
      <button
        class="w-8 h-8 flex items-center justify-center border rounded mr-1"
        @click="minusPage"
        :disabled="minActive"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <!-- 頁碼 -->
      <button
        class="w-8 h-8 flex items-center justify-center border rounded mr-1"
      >
        <strong class="text-sm">{{ componentpage }}</strong>
      </button>
      <!-- 下一頁 -->
      <button
        class="w-8 h-8 flex items-center justify-center border rounded"
        @click="plusPage"
        :disabled="plusActive"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>

    <div class="flex items-center">
      <strong class="text-sm">前往</strong>
      <select
        class="w-16 h-8 border rounded mx-1 text-center"
        style="text-align-last: center"
        @change="onChange"
      >
        <option
          v-for="(page, index) in allPages"
          :key="index"
        >
          {{ page }}
        </option>
      </select>
      <strong class="text-sm">頁</strong>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    page: {
      type: Number,
    },
    limit: {
      type: Number,
    },
    total: {
      type: Number,
    },
    listsize: {
      type: Number,
    },
  },
  data() {
    return {
      optionPage:null,
      minActive: false,
      plusActive: false,
      componentpage:null,
    };
  },
  mounted() {
   this.componentpage = this.page
  //  console.log(this.page);
  },
  watch:{
    componentpage(val){
      console.log(val);
      this.optionPage = val
    }
  },
  computed: {
    allPages() {
      return Math.ceil(this.total / this.limit);
    },
  },
  methods: {
    // controlDisable(){

    // }
    plusPage() {
      
      if (this.componentpage === this.allPages) {
        this.plusActive = true;
      } else {
        this.componentpage += 1;
        this.$emit("plusPage", this.componentpage);
        this.minActive = false;
       
      }
      // console.log("minActive", this.minActive);
      // console.log("plusActive",this.plusActive);
    },
    minusPage() {
      if (this.componentpage >= 2) {
        this.plusActive = false;
        this.componentpage -= 1;
        this.$emit("minusPage", this.componentpage);
      } else {
        this.minActive = true;
      }
      // console.log("minActive", this.minActive);
      // console.log("plusActive",this.plusActive);
    },
    onChange(event) {
      
      this.componentpage = event.target.value * 1;
      this.$emit("onChange", this.componentpage);
    },
  },
};
</script>