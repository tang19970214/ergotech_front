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
          <span v-if="contentType==='help' || contentType==='accident'" v-html="introduceList"></span>
          <span v-else-if="contentType === 'regulation'" v-html="regulationArr(introduceList)"></span>
          <ul v-else-if="contentType === 'suggest'">
            <li class="flex text-sm font-semibold py-1" v-for="(t, idx) in introduceArr(introduceList)" :key="idx" >
              <span v-if="headerText == '改善建議'">
                <input  type="checkBox" class="h-5 mr-1 ml-1">
              </span>
              <p class="ml-1">{{t.title}}</p>
            </li>
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
      type: [Array, String],
      required: true,
    },
    contentType: {
      type: String,
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
  computed: {
    introduceArr () {
     return (item) => {
       let introduceArr = JSON.parse(item)
       return introduceArr
     }
    },
    regulationArr() {
      return (item) => {
        console.log(item)
        let StringTemplate = ''
        item.forEach(element => {
          if(element.title !=='') {
            StringTemplate = `${StringTemplate}<p>${element.title}<a href="${element.links}" target="blank"> <i class="iconfont icon-link-url"> </i></a></p>`
          }
        });
        if (StringTemplate === '') StringTemplate = '<p>無</p>'
        return StringTemplate
      }
    }
  }
};
</script>