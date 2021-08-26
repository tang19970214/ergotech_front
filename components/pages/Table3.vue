<template>
  <div class="p-4 sm:p-0">
    <table class="w-full">
      <thead class="justify-between">
        <tr>
          <th class="px-4 py-2 bg-tableHeader">
            <div class="w-full">
              <span class="text-white">工站名稱</span>
            </div>
          </th>
          <th class="w-28 px-4 py-2 bg-tableHeader">
            <div class="w-full text-center">
              <span class="text-white">完成日期</span>
            </div>
          </th>
          <th class="w-20 px-4 py-2 bg-tableOperate">
            <div class="w-full text-center">
              <span class="text-white">操作</span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody class="bg-gray-200" v-if="tableList.length > 0">
        <tr class="bg-white border-b" v-for="item in tableList" :key="item.id">
          <td class="px-4 py-4">
            <div class="w-full">
              <p class="text-sm font-medium">{{item.name}}</p>
            </div>
          </td>
          <td class="w-28 py-4">
            <div class="w-full text-center">
              <p class="text-sm font-medium">{{item.modifyDate}}</p>
            </div>
          </td>
          <td class="w-20 py-4">
            <div class="w-full text-center">
              <button class="bg-primary py-1 px-3 text-sm text-white"  @click="goCheck(item.id)">檢視</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="w-full h-full py-36 bg-transparent sm:bg-white flex items-center justify-center flex-col" v-if="tableList.length == 0">
      <img src="@/assets/images/noData.png" alt="查無資料">
      <strong>查無資料</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableList: {
      type: Array,
    },
  },
  methods: {
    goCheck(id) {
      this.$emit("goCheck", id);
    },
  },
};
</script>