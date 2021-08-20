<template>
  <div class="w-full">
    <!-- title -->
    <div class="w-full py-4 px-0 box-border text-center sm:py-6 sm:px-16 sm:text-left">
      <div class="w-full mb-4 sm:mb-6 flex items-center justify-center sm:justify-between">
        <strong class="hidden sm:block relative text-lg sm:text-2xl">執行檢核作業 - {{listName}}</strong>
        <strong class="block sm:hidden relative text-lg sm:text-2xl">{{listName}}</strong>

        <div class="hidden sm:block flex items-center">
          <button class="w-16 h-8 bg-white rounded border border-gray-400 text-sm font-bold shadow mr-2" @click="goBack()">回列表</button>
          <button class="w-14 h-8 bg-primary text-white rounded text-sm font-bold shadow mr-2" @click="formBtn('save')">暫存</button>
          <button class="w-14 h-8 bg-primary text-white rounded text-sm font-bold shadow" @click="formBtn('send')">送出</button>
        </div>
      </div>

      <div class="w-full flex flex-col md:flex-row">
        <FormMenuList :menuList="list" :defaultMenu="defaultMenu" @changeMenu="changeMenu" />

        <div class="w-full flex flex-col pl-0 md:pl-4 box-border">
          <FormSteps :stepList="list[defaultMenu - 1].typeList" :defaultStep="defaultStep" v-if="list.length>0" />

          <!-- form -->
          <div class="w-full mt-4 shadow" v-if="list.length>0">
            <Form @openFormModal="openFormModal" :list="list[defaultMenu - 1].typeList[defaultStep - 1].detaiList" :defaultStep="defaultStep" :submitForm="submitForm" />
          </div>
          <FormFooter @formBtn="formBtn" :stepNextStatus="stepNextStatus" :stepPreStatus="stepPreStatus"/>
        </div>
      </div>
    </div>

    <Modal :submitForm="submitForm" :openModal="openModal" :headerText="modalList.headerText" :title="modalList.title" :contentType="modalList.contentType" :targetItem="modalList.targetItem" :introduceList="modalList.introduceList" @closeModal="closeModal" :currentSugNum="modalList.currentSugNum" />
    <Notice :openNotice="openNotice" :type="noticeInfo.type" :nexyOrPreType="nexyOrPreType" :message="noticeInfo.message" :introduce="noticeInfo.introduce" @closeNotice="closeNotice" />
  </div>
</template>

<script>
import FormMenuList from "../components/pages/FormMenuList.vue";
import FormSteps from "../components/pages/FormSteps.vue";
import Form from "../components/pages/Form.vue";
import FormFooter from "../components/pages/FormFooter.vue";
import Notice from "../components/Notice.vue";
import Modal from "../components/Modal.vue";
import css from "../assets/css/index.css";


export default {
  layout: "checkForm",
  components: {
    FormMenuList,
    FormSteps,
    Form,
    FormFooter,
    Notice,
    Modal,
  },
  asyncData({store}) {
    store.dispatch("handleLoading", true)
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 999,
      },

      defaultMenu: 1,
      defaultStep: 1,
      stepValidate: false,
      stepList: {},
      nexyOrPreType: '',
      list: [],
      listName: '',
      /* modal */
      openModal: false,
      modalList: {
        headerText: "",
        title: "",
        introduceList: '',
      },
      missionResultId: '',
      /* submitform */
      submitForm:[],
      /* notice */
      openNotice: false,
      noticeInfo: {
        type: "",
        message: "",
        introduce: "",
      },
    };
  },
  methods: {
    stepValidation() {
      let status
      const resultArray =  this.list[this.defaultMenu - 1].typeList[this.defaultStep - 1].detaiList.find(submitItemDetail=> submitItemDetail.submitItem.checkResult === '')
      console.log(resultArray);
      if (resultArray) {
        status = false
      } else {
        status = true
      }
      return status
    },
    changeMenu(id) {
      this.defaultMenu = id;
      this.defaultStep = 1
    },
    /* 取得模組、類型、名稱 */
    getModel() {
      return new Promise((resolve) => {
        this.$api.LoadCheckModel(this.listQuery);
        resolve();
      });
    },
    getModelItem() {
      return new Promise((resolve) => {
        this.$api.LoadCheckModelItem(this.listQuery);
        resolve();
      });
    },
    getModelItemDetail() {
      return new Promise((resolve) => {
        this.$api.LoadCheckModelItemDetail(this.listQuery);
        resolve();
      });
    },
    /* 取得檢核表 */

    getList() {
      return new Promise((resolve) => { 
        this.$api.GetMissionById({ id: this.$route.params.id }).then((res) => {
          const { result, code } = res.data
          if (code === 200) {
          // 先取出所有的問題
          let listResult = result['compQuests'][0]['compQuestDetails'];
          this.submitForm = [];
          listResult.forEach((item) => {
            let obj = {
              id: '',
              missionResultId: "",
              compQuestDetailId: item.id,
              checkResult: "",
              description: "",
              suggestion: "",
              pic1: "",
              pic2: "",
              pic3: "",
              remark: ""
            }
            this.submitForm.push(obj)
          })

          // 取出所有的模組
          // 模組、類型、題目
          // TODO: 這邊之後如果有空翻一下
          let list = []
          let modulesKeysArray = []
          let itemNameKeysList = []
          listResult.forEach((item) => {
            if (modulesKeysArray.indexOf(item.modelName) === -1) {
              modulesKeysArray = modulesKeysArray.concat(item.modelName);
            }
            if(itemNameKeysList.indexOf(item.itemName) === -1) {
              itemNameKeysList = itemNameKeysList.concat(item.itemName);
            }
          })

          let itemList = []
          itemNameKeysList.forEach( (itemDetail) => {
            let obj = {itemName:itemDetail,modelName: '',detaiList: []}
            listResult.forEach((item) => {
              if(item.itemName === obj.itemName) {
                this.submitForm.forEach(submitItem => {
                  if (submitItem.compQuestDetailId === item.id) {
                    item['submitItem'] = submitItem
                    item['missionResultId'] = this.missionResultId
                  }
                })
                obj.detaiList.push(item)
                obj.modelName = item.modelName
              }
            })
            itemList.push(obj)
          })

          modulesKeysArray.forEach((keyName,index)=>{
            let obj = {id:index + 1,modelName: keyName, typeList:[]}
            itemList.forEach(innerItem => {
              if(obj.modelName === innerItem.modelName){
                obj.typeList.push(innerItem)
              }
            })
            list.push(obj)
          })

          
          // 取出類別
            this.list = list;
            this.listName = result.name
          }
          resolve();
        });
      });
    },
    // 取得暫存檔案
    getTempList() {
    return new Promise((resolve, reject) => {
      this.$api.GetByMissionResultByMissionId({ id: this.$route.params.id }).then((res)=> {
        const {result, code} = res.data
        console.log(res);
        if(code === 200 && result) { // 如果有資料(result)代表是暫存，並把值帶回去submitForm
          this.missionResultId = result.id
          let missionResult = result.missionQuest
          missionResult.forEach((item) => {
            this.submitForm.forEach((submitItem)=> {
              if(item.compQuestDetailId === submitItem.compQuestDetailId) {
                let submitItemKeysArray = Object.keys(submitItem)
                submitItemKeysArray.forEach((keys) => {
                  submitItem[keys] = item[keys]
                })
              }
            })
          })
        }
        resolve()
      })
    })
    },

    // 暫存創建實體
    async addMissionResult() {
      if(this.missionResultId !== ''){
        await this.AddOrUpdateDetail()
      } else {
        let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        let data = {
          userId: userInfo.id,
          checkMissionId: this.$route.params.id,
          status: true // 布林值 true 代表可以修改 false 代表不能修改
        }
        const {result, code} = (await this.$api.AddMissionResult(data)).data
        if(code === 200) {
          this.missionResultId = result
          await this.AddOrUpdateDetail()
        }
      }
    },
    // 送出填寫任務
    async UpdateMissionResult() {
      await this.addMissionResult()
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      let data = {
        id: this.missionResultId,
        userId: userInfo.id,
        checkMissionId: this.$route.params.id,
        status: false
      }
      this.$api.UpdateMissionResult(data).then((res)=> {
        console.log(res)
      })
      
    },
    // 填寫內容
    AddOrUpdateDetail() {
      return new Promise((resolve,reject)=> {   
        this.submitForm.forEach((submitItem)=> {
          // 填寫表單內容的id送到submitform裡面
          submitItem.missionResultId = this.missionResultId
        })

        this.$api.AddOrUpdateDetail(this.submitForm).then((res) => {
          console.log(res)
          resolve()
        })
      })
    },

    goBack() {
      this.$router.push("/checkOperation");
      // this.noticeInfo = {
      //   type: "warning",
      //   message: "尚有送出資料",
      //   introduce: "您尚未送出資料，系統將不會保存變更，\n確定離開當前頁面？",
      // };
      // this.openNotice = true;
    },

    /* component */
    openFormModal(value) {
      /**
       * params: type,content, title
       * 
      */
     let val = JSON.parse(JSON.stringify(value))
     console.log(val);
      switch (val.type) {
        case "help":
          this.modalList = {
            headerText: "說明",
            title: val.title,
            introduceList: val.content,
            contentType:val.type
          };
          this.openModal = true;
          break;
        case "regulation":
          this.modalList = {
            headerText: "法規",
            title: val.title,
            introduceList: val.content,
            contentType:val.type
          };
          this.openModal = true;
          break;
        case "accident":
          this.modalList = {
            headerText: "事故要因範例",
            title: val.title,
            introduceList: val.content,
            contentType:val.type
          };
          this.openModal = true;
          break;
        case "suggest":
          this.modalList = {
            headerText: "改善建議",
            title: val.title,
            introduceList: val.content,
            contentType:val.type,
            targetItem: val.targetItem,
            currentSugNum: val.currentSugNum
          };
          this.openModal = true;
          break;
      }
    },
    async formBtn(str) {
      this.nexyOrPreType = str
      switch (str) {
        case "prev":
          if (this.stepPreStatus && !this.stepValidation()) {
            this.noticeInfo = {
              type: "warning",
              message: "尚有題目未答",
              introduce: "此頁尚有題目未填答，確定前往上一頁？",
            };
            this.openNotice = true;
          } else {
            this.closeNotice('prev');
          }
          break;
        case "next":
          if (this.stepNextStatus && !this.stepValidation()) {
            // if(){}
            this.noticeInfo = {
              type: "warning",
              message: "尚有題目未答",
              introduce: "此頁尚有題目未填答，確定前往下一頁？",
            };
            this.openNotice = true;
          } else {
            this.closeNotice('next');
          }
          break;
        case "save":
          console.log(this.submitForm)
          await this.addMissionResult()
          this.noticeInfo = {
            type: "success",
            message: "暫存成功",
          };
          this.openNotice = true;
          break;
        case "send":
          let status = this.submitForm.find((submitItem)=> submitItem.checkResult === '')
          if(!!status) {
            this.nexyOrPreType = ''
            this.noticeInfo = {
                type: "warning",
                message: "尚有題目未答",
            };
            this.openNotice = true;
            return
          } else {
            await this.UpdateMissionResult()
            this.nexyOrPreType = 'send'
            this.noticeInfo = {
              type: "success",
              message: "保存成功",
            };
            this.openNotice = true;
          }
          break;
      }
    },
    closeModal() {
      this.openModal = false;
    },
    closeNotice(value) {
      if (value) this.nexyOrPreType = value
      switch (this.nexyOrPreType) {
        case 'next':
          window.scrollTo(0, 0);
          if(this.defaultStep < this.list[this.defaultMenu - 1].typeList.length) {
            this.defaultStep++
          } else {
            if(this.defaultMenu < this.list.length){
              this.defaultMenu++
              this.defaultStep = 1
            }
          }
          break;
        case 'prev':
          if(this.defaultStep > 1) {
            window.scrollTo(0, 0);
            this.defaultStep--
          } else {
            if(this.defaultMenu > 1){
              this.defaultMenu --
              this.defaultStep = this.list[this.defaultMenu - 1].typeList.length
            }
          }
          break;
        case 'send':
          this.goBack();
          break;
        default:
          break;
      }
      this.openNotice = false;
    },
  },
  computed: {
    stepNextStatus(){
      let status = true
      if ((this.defaultStep == this.list[this.defaultMenu - 1]?.typeList.length) && (this.defaultMenu == this.list.length)) {
        status = false
      }
      return status
    },
    stepPreStatus(){
      let status = true
      if (this.defaultMenu == 1 && this.defaultStep == 1) {
        status = false
      }
      return status
    }
  },
  mounted() {
    window.onbeforeunload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    Promise.all([
      this.getModel(),
      this.getModelItem(),
      this.getModelItemDetail(),
      this.getList()
    ]).then(()=>{
      return this.getTempList()
    }).then(()=> {
      setTimeout(() => {
        this.$store.dispatch("handleLoading", false);
      }, 500);
    });
  },
};
</script>