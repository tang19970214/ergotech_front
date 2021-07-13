<template>
  <div class="fixed bottom-0 w-full px-4 sm:px-16 box-border h-12 sm:h-14 bg-footer flex items-center justify-around sm:justify-end border-t border-gray-300">
    <div class="flex flex-col sm:flex-row">
      <div class="flex items-center mr-0 sm:mr-6">
        <strong>總筆數：</strong>
        <p class="text-primary">200</p>
      </div>
      <div class="flex items-center mr-0 sm:mr-6">
        <strong>總頁數：</strong>
        <p class="text-primary">10</p>
      </div>
    </div>

    <div class="flex items-center mr-3 sm:mr-6">
      <!-- 上一頁 -->
      <button class="w-8 h-8 flex items-center justify-center border rounded mr-1" @click="minusPage" :disabled ="isBtnDisabled">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <!-- 頁碼 -->
      <button class="w-8 h-8 flex items-center justify-center border rounded mr-1">
        <strong class="text-sm">{{page}}</strong>
      </button>
      <!-- 下一頁 -->
      <button class="w-8 h-8 flex items-center justify-center border rounded" @click="plusPage">
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>

    <div class="flex items-center">
      <strong class="text-sm">前往</strong>
      <select class="w-16 h-8 border rounded mx-1 text-center" style="text-align-last: center">
        <option value="1">1</option>
      </select>
      <strong class="text-sm">頁</strong>
    </div>
  </div>
</template>



<script>
export default {
  // props:['page'],
  data(){
    return{
      page : 1,
      isBtnDisabled: false
    }
  },
  mounted(){
    if(this.page == 1){
      this.isBtnDisabled = true;
    }
  },
  methods:{
    plusPage:function(){
      
      this.page += 1;
      this.$emit("plusPage",this.page);
    },
    minusPage:function(){
      // if(this.page == 1){
      //   this.isBtnDisabled = true;
      // }else{
        // this.isBtnDisabled = false;
        if(this.page>=2){
          isBtnDisabled = false;
           this.page -= 1;
          this.$emit("minusPage",this.page);
        }
       
      // }
      
    }
  }
}
</script>