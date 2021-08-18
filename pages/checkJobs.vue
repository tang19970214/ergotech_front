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
          <FormSteps :stepList="list[defaultMenu - 1].typeList" :defaultStep="defaultStep" v-if="list.length>0"/>

          <!-- form -->
          <div class="w-full mt-4 shadow" v-if="list.length>0">
            <Form @openFormModal="openFormModal" :list="list[defaultMenu - 1].typeList[defaultStep - 1].detaiList" :defaultStep="defaultStep" />
          </div>
          <FormFooter @formBtn="formBtn" :stepNextStatus="stepNextStatus" :stepPreStatus="stepPreStatus" />
        </div>
      </div>
    </div>

    <Modal :openModal="openModal" :headerText="modalList.headerText" :title="modalList.title" :introduceList="modalList.introduceList" @closeModal="closeModal" />
    <Notice :openNotice="openNotice" :type="noticeInfo.type" :message="noticeInfo.message" :introduce="noticeInfo.introduce" @closeNotice="closeNotice" />
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
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 999,
      },

      defaultMenu: 1,
      menuList: [
        {
          id: 1,
          icon: require("../assets/images/formMenu/icon1.png"),
          icon_active: require("../assets/images/formMenu/icon1_active.png"),
          title: "人",
          introduce: "（避免人為錯誤）",
          qusNum: 8,
          stepList: [
            { id: 1, text: "安全的設計與設備", qusNum: 5 },
            { id: 2, text: "安全的運轉", qusNum: 3 },
          ],
        },
        {
          id: 2,
          icon: require("../assets/images/formMenu/icon2.png"),
          icon_active: require("../assets/images/formMenu/icon2_active.png"),
          title: "機",
          introduce: "（安全機械）",
          qusNum: 11,
          stepList: [
            { id: 1, text: "安全的設計與設備", qusNum: 7 },
            { id: 2, text: "安全的運轉", qusNum: 3 },
            { id: 3, text: "落實保養維護", qusNum: 1 },
          ],
        },
        {
          id: 3,
          icon: require("../assets/images/formMenu/icon3.png"),
          icon_active: require("../assets/images/formMenu/icon3_active.png"),
          title: "料",
          introduce: "（有害物及化學品）",
          qusNum: 9,
          stepList: [
            { id: 1, text: "安全的設計與設備", qusNum: 7 },
            { id: 2, text: "安全的運轉", qusNum: 2 },
          ],
        },
        {
          id: 4,
          icon: require("../assets/images/formMenu/icon4.png"),
          icon_active: require("../assets/images/formMenu/icon4_active.png"),
          title: "法",
          introduce: "（安全作業方法）",
          qusNum: 12,
          stepList: [
            { id: 1, text: "安全的設計與設備", qusNum: 6 },
            { id: 2, text: "安全的運轉", qusNum: 3 },
            { id: 3, text: "落實保養維護", qusNum: 3 },
          ],
        },
        {
          id: 5,
          icon: require("../assets/images/formMenu/icon5.png"),
          icon_active: require("../assets/images/formMenu/icon5_active.png"),
          title: "環",
          introduce: "（安全環境）",
          qusNum: 9,
          stepList: [
            { id: 1, text: "安全的設計與設備", qusNum: 7 },
            { id: 2, text: "安全的運轉", qusNum: 1 },
            { id: 3, text: "落實保養維護", qusNum: 1 },
          ],
        },
        {
          id: 6,
          icon: require("../assets/images/formMenu/icon6.png"),
          icon_active: require("../assets/images/formMenu/icon6_active.png"),
          title: "重複性傷害作業",
          introduce: "",
          qusNum: 4,
          stepList: [
            { id: 1, text: "安全的運轉", qusNum: 3 },
            { id: 2, text: "落實保養維護", qusNum: 1 },
          ],
        },
        {
          id: 7,
          icon: require("../assets/images/formMenu/icon7.png"),
          icon_active: require("../assets/images/formMenu/icon7_active.png"),
          title: "管理",
          introduce: "（充分的督導與支持）",
          qusNum: 8,
          stepList: [
            { id: 1, text: "安全的設計與設備", qusNum: 4 },
            { id: 2, text: "安全的運轉", qusNum: 3 },
            { id: 3, text: "落實保養維護", qusNum: 1 },
          ],
        },
        {
          id: 8,
          icon: require("../assets/images/formMenu/icon8.png"),
          icon_active: require("../assets/images/formMenu/icon8_active.png"),
          title: "組織",
          introduce: "（遵守法規）",
          qusNum: 7,
          stepList: [
            { id: 1, text: "安全的設計與設備", qusNum: 6 },
            { id: 2, text: "落實保養維護", qusNum: 1 },
          ],
        },
      ],
      defaultStep: 1,
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
        console.log(res);
        resolve()
      })
    })
    },

    // 暫存創建實體
    addMissionResult() {
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      let data = {
        userId: userInfo.id,
        checkMissionId: this.$route.params.id,
        status: true
      }
      this.$api.AddMissionResult(data).then(res => {
        const {result, code} = res.data
        if(code === 200) {
          this.missionResultId = result
          this.AddOrUpdateDetail()
        }
      })
    },
    
    // 填寫內容
    AddOrUpdateDetail() {
      this.submitForm.forEach((submitItem)=> {
        submitItem.missionResultId = this.missionResultId
      })
      this.$api.AddOrUpdateDetail(this.submitForm).then((res) => {
        console.log(res)
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
    openFormModal(val) {
      /**
       * params: type,content, title
       * 
      */
      switch (val.type) {
        case "help":
          this.modalList = {
            headerText: "說明",
            title: val.title,
            introduceList: val.content
          };
          this.openModal = true;
          break;
        case "regulation":
          this.modalList = {
            headerText: "法規",
            title: val.title,
            introduceList: val.content
          };
          this.openModal = true;
          break;
        case "accident":
          this.modalList = {
            headerText: "事故要因範例",
            title: val.title,
            introduceList: val.content
          };
          this.openModal = true;
          break;
        case "suggest":
          this.modalList = {
            headerText: "改善建議",
            title: val.title,
            introduceList: val.content
          };
          this.openModal = true;
          break;
      }
    },
    formBtn(str) {
      console.log(str);
      this.nexyOrPreType = str
      switch (str) {
        case "prev":
          if (this.stepPreStatus) {
            this.noticeInfo = {
              type: "warning",
              message: "尚有題目未答",
              introduce: "此頁尚有題目未填答，確定前往上一頁？",
            };
            this.openNotice = true;
          }
          break;
        case "next":
          if (this.stepNextStatus) {
            this.noticeInfo = {
              type: "warning",
              message: "尚有題目未答",
              introduce: "此頁尚有題目未填答，確定前往下一頁？",
            };
            this.openNotice = true;
          }
          break;
        case "save":
          this.addMissionResult()
          // this.noticeInfo = {
          //   type: "success",
          //   message: "暫存成功",
          // };
          // this.openNotice = true;
          break;
        case "send":
          this.noticeInfo = {
            type: "success",
            message: "保存成功",
          };
          this.openNotice = true;
          break;
      }
    },
    closeModal() {
      this.openModal = false;
    },
    closeNotice() {
      switch (this.nexyOrPreType) {
        case 'next':
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
          console.log(this.defaultStep);
          if(this.defaultStep > 1) {
            this.defaultStep--
          } else {
            if(this.defaultMenu > 1){
              this.defaultMenu --
              this.defaultStep = this.list[this.defaultMenu - 1].typeList.length
            }
          }
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
    this.$store.dispatch("handleLoading", true);
    Promise.all([
      this.getModel(),
      this.getModelItem(),
      this.getModelItemDetail(),
      this.getList(),
      this.getTempList()
    ]).then(() => {
      setTimeout(() => {
        this.$store.dispatch("handleLoading", false);
      }, 500);
    });
  },
};
</script>