<template>
  <div class="w-full">
    <!-- title -->
    <div class="w-full py-4 px-0 box-border text-center sm:py-6 sm:px-16 sm:text-left">
      <div class="w-full mb-4 sm:mb-6 flex items-center justify-center sm:justify-between">
        <strong class="hidden sm:block relative text-lg sm:text-2xl">執行檢核作業 - 工站名稱</strong>
        <strong class="block sm:hidden relative text-lg sm:text-2xl">工站名稱</strong>

        <div class="hidden sm:block flex items-center">
          <button class="w-16 h-8 bg-white rounded border border-gray-400 text-sm font-bold shadow mr-2" @click="goBack()">回列表</button>
          <button class="w-14 h-8 bg-primary text-white rounded text-sm font-bold shadow mr-2">暫存</button>
          <button class="w-14 h-8 bg-primary text-white rounded text-sm font-bold shadow">送出</button>
        </div>
      </div>

      <div class="w-full flex flex-col sm:flex-row">
        <FormMenuList :menuList="menuList" :defaultMenu="defaultMenu" @changeMenu="changeMenu" />

        <div class="w-full flex flex-col pl-0 sm:pl-4 box-border">
          <FormSteps :stepList="stepList" :defaultStep="defaultStep" :menuId="defaultMenu" />

          <!-- form -->
          <div class="w-full mt-4 shadow">
            <Form />
          </div>
          <FormFooter @formBtn="formBtn" />
        </div>
      </div>
    </div>

    <Notice :openNotice="openNotice" :type="noticeInfo.type" :message="noticeInfo.message" :introduce="noticeInfo.introduce" @closeNotice="closeNotice" />

  </div>
</template>

<script>
import FormMenuList from "../components/pages/FormMenuList.vue";
import FormSteps from "../components/pages/FormSteps.vue";
import Form from "../components/pages/Form.vue";
import FormFooter from "../components/pages/FormFooter.vue";
import Notice from "../components/Notice.vue";

export default {
  layout: "checkForm",
  components: { FormMenuList, FormSteps, Form, FormFooter, Notice },
  data() {
    return {
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
    },
    getList() {
      const keys = [];
      const obj = {};
      this.menuList.forEach((item) => {
        if (!keys.includes(item.id)) {
          keys.push(item.id);
          obj[item.id] = item.stepList;
        } else {
          obj[item.id].push(item.stepList);
        }
      });
      this.stepList = obj;
      console.log(this.stepList);
    },
    goBack() {
      this.noticeInfo = {
        type: "warning",
        message: "尚有送出資料",
        introduce: "您尚未送出資料，系統將不會保存變更，\n確定離開當前頁面？",
      };
      this.openNotice = true;
    },

    /* component */
    formBtn(str) {
      switch (str) {
        case "prev":
          break;
        case "next":
          this.noticeInfo = {
            type: "warning",
            message: "尚有題目未答",
            introduce: "此頁尚有題目未填答，確定前往下一頁？",
          };
          this.openNotice = true;
          break;
        case "save":
          break;
        case "send":
          break;
      }
    },
    closeNotice() {
      this.openNotice = false;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>