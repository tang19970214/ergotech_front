<template>
  <div class="w-full h-full">
    <div class="py-4 px-0 text-center sm:py-6 sm:px-16 sm:text-left box-border">
      <div class="mb-4 sm:mb-6">
        <strong class="checkOperationTitle relative text-lg sm:text-2xl"
          >檢核作業</strong
        >
      </div>

      <Tabs
        :tabList="tabList"
        :defaultTab="defaultTab"
        @changeTab="changeTab"
      />

      <Table1 :tableList="list" @goCheck="goCheck1" v-if="defaultTab == 1" />
      <Table2 :tableList="list" @goCheck="goCheck1" v-if="defaultTab == 2" />
      <Table3 :tableList="list" v-if="defaultTab == 3" />
    </div>

    <Pagination
      @plusPage="changePage"
      @minusPage="changePage"
      @onChange="changePage"
      :page="listQuery.page"
      :limit="listQuery.limit"
      :total="total"
    />
  </div>
</template>

<script>
import Tabs from "../components/Tabs.vue";
import Table1 from "../components/pages/Table1.vue";
import Table2 from "../components/pages/Table2.vue";
import Table3 from "../components/pages/Table3.vue";
import Pagination from "../components/Pagination.vue";

export default {
  components: { Tabs, Table1, Table2, Table3, Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 3,
        key: undefined,
        isResult: false,
        resultStatus: "",
      },
      total: 0,
      defaultTab: 1,
      tabList: [
        { id: 1, text: "待執行作業", text_phone: "待執行" },
        { id: 2, text: "檢核中作業", text_phone: "檢核中" },
        { id: 3, text: "已完成作業", text_phone: "已完成" },
      ],
      tableList1: [
        {
          id: 1,
          text: "工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱",
          datetime: "2021-06-15",
        },
        {
          id: 2,
          text: "工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱",
          datetime: "2021-06-15",
        },
        {
          id: 3,
          text: "工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱",
          datetime: "2021-06-15",
        },
      ],
      tableList2: [
        {
          id: 1,
          text: "工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱",
          datetime: "2021-06-15",
        },
        {
          id: 2,
          text: "工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱",
          datetime: "2021-06-15",
        },
        {
          id: 3,
          text: "工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱",
          datetime: "2021-06-15",
        },
      ],
      tableList3: [
        {
          id: 1,
          text: "工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱",
          datetime: "2021-06-15",
        },
        {
          id: 2,
          text: "工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱",
          datetime: "2021-06-15",
        },
        {
          id: 3,
          text: "工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱工站名稱",
          datetime: "2021-06-15",
        },
      ],
      list: [],
    };
  },
  // watch: {
  //   //21-07-06 TAO,
  //   //監聽listQuery.page變化時,非同步call api
  //   "listQuery.page": function (val, oldVal) {
  //     console.log("val:" + val, "oldVal:" + oldVal);
  //     // this.getList();
  //   },
  // },
  methods: {
    getList() {
      this.$store.dispatch("handleLoading", true);
      this.$api.LoadClientMission(this.listQuery).then((res) => {
        this.list = res.data.data;
        this.total = res.data.count;
        console.log(res);
        console.log(this.total);
        setTimeout(() => {
          this.$store.dispatch("handleLoading", false);
        }, 500);
        console.log(this.list);
      });
    },
    //21-07-05 TAO,
    //接收來自component的頁數,用來call api
    changePage(page) {
      console.log(page);
      this.listQuery.page = page;
      this.getList()
      // console.log(page);
    },
    changeTab(id) {
      // TODO:看之後要不要判斷同一個按鈕就不要Reload
      this.defaultTab = id;
      switch (id) {
        case 1:
          // 待執行 isResult: false
          this.listQuery.isResult = false;
          this.listQuery.resultStatus = "";
          break;
        case 2:
          // 檢核中 isResult: true , resultResult: true
          this.listQuery.isResult = true;
          this.listQuery.resultStatus = true;
          break;
        case 3:
          // 已完成 resultStatus: false
          this.listQuery.isResult = "";
          this.listQuery.resultStatus = false;
          break;
        default:
          this.listQuery.isResult = false;
          this.listQuery.resultStatus = "";
          break;
      }
      this.getList();
    },
    goCheck1(id) {
      console.log(id);
      this.$router.push({ name: "checkJobs", params: { id: id } });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style>
@media (max-width: 639px) {
  .checkOperationTitle::before {
    content: "";
    position: absolute;
    top: 10px;
    left: -140px;
    width: 130px;
    height: 2px;
    background: #168ec7;
  }
  .checkOperationTitle::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 80px;
    width: 130px;
    height: 2px;
    background: #168ec7;
  }
}
</style>