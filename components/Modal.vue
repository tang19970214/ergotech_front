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
          <span class="max-h-full" v-if="contentType==='help' || contentType==='accident'" v-html="introduceList"></span>
          <span class="max-h-full" v-else-if="contentType === 'regulation'" v-html="regulationArr(introduceList)"></span>
          <ul v-else-if="contentType === 'suggest'" class="modal-mh-50">
            <li class="flex text-sm font-semibold py-1" v-for="(t, idx) in introduceArr(introduceList)" :key="idx" >
              <span v-if="headerText == '改善建議'">
                <input  type="checkbox" class="h-5 mr-1 ml-1" :value="t.id" v-if="!readable" v-model="suggestCheckList">
              </span>
              <p class="ml-1">{{t.title}}</p>
            </li>
            <p v-if="!introduceArr(introduceList)">無</p>
          </ul>
          <span v-if="!introduceList && (contentType==='help' || contentType==='accident')">無</span>
        </div>
        <!--footer-->
        <div class="w-full py-2 px-4 text-right">
          <button class="bg-primary py-1 px-3 text-sm font-medium text-white rounded-sm" @click="closeModal()" v-if="contentType === 'suggest'">確定</button>
          <button class="bg-primary py-1 px-3 text-sm font-medium text-white rounded-sm" @click="closeModal()" v-else>確定</button>
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
    },
    targetItem: {
      type: Object
    },
    submitForm: {
      type: [Object, Array],
      required: true
    },
    currentSugNum:{
      type: [String, Number]
    },
    readable: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      suggestCheckList: [],
      PROCESSENVIMGSRC: process.env.VUE_APP_BASE_IMG_URL
    }
  },
  methods: {
    closeModal() {
      if (this.contentType === 'suggest' && this.suggestCheckList.length > 0 && this.introduceArr(this.introduceList).length > 0) {
        this.submitForm.forEach( submitItem => {
          if(submitItem.compQuestDetailId === this.targetItem.compQuestDetailId) {
            let suggestionJsonStri = this.introduceArr(this.introduceList).filter(filteredItem=>{
              return this.suggestCheckList.indexOf(filteredItem.id) !== -1
            })
            submitItem['suggestion'] = JSON.stringify(suggestionJsonStri)
          }
        })
      }
      this.$emit("closeModal");
    },
  },
  computed: {
    introduceArr () {
     return (item) => {
       let introduceArr = item ? JSON.parse(item): ''
       return introduceArr
     }
    },
    regulationArr() {
      return (item) => {
        let StringTemplate = ''
        item.forEach(element => {
          if(element.title !=='') {
            let filesArr = JSON.parse(element.files);
            console.log(filesArr);
            let fileToStringTag = ''
            filesArr.forEach((filesItem) => {
              if(!!filesItem.file && !!filesItem.fileName) {
                fileToStringTag = `${fileToStringTag}<a href="${this.PROCESSENVIMGSRC + filesItem.file}" download="${filesItem.fileName}" target="_blank">${filesItem.fileName} <i class="iconfont icon-a-bx_bxs-download1"> </i></a>`
              }
            })
            console.log(element)
            StringTemplate = `${StringTemplate}<div><a href="${element.links}" target="_blank"><span>${element.title}  <i class="iconfont icon-link-url"> </span></i></a>${fileToStringTag}</div>`
          }
        });
        if (StringTemplate === '') StringTemplate = '<p>無</p>'
        return StringTemplate
      }
    }
  },
  watch:{
    openModal() {
      if (this.contentType === 'suggest' && this.introduceArr(this.introduceList).length > 0 && this.targetItem.suggestion !=='') {
        this.submitForm.forEach(submitItem => {
          if(submitItem.compQuestDetailId === this.targetItem.compQuestDetailId){
            if(this.currentSugNum == this.targetItem.checkResult) {
              let checkedList = JSON.parse(this.targetItem.suggestion);
              let setSuggestCheckListTemp = []
              checkedList.forEach(item=> {
                setSuggestCheckListTemp = setSuggestCheckListTemp.concat(item.id)
              })
              this.suggestCheckList = setSuggestCheckListTemp
            }
          }
        })
      }
      if(!this.openModal) {
        this.suggestCheckList = []
      }
    }
  },
};
</script>