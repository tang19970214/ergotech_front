<template>
  <div class="w-full">
    <!-- <div class="block sm:hidden px-4 mt-3">
      <div class="w-full rounded bg-white shadow">
        <div class="step w-full px-4 py-3 box-border flex items-center" v-for="item in stepList[menuId]" :key="item.id">
          <span class="dot relative rounded-full mr-2 border-2 box-content" :class="{'bg-primary border-blue-100': item.id == defaultStep, 'bg-white border-gray-300': item.id !== defaultStep}"></span>

          <div class="w-full flex items-center justify-between border-b border-eee">
            <strong class="text-sm" :class="{'text-primary': item.id == defaultStep}">{{item.text}}</strong>
            <div class="w-9 flex items-center">
              <strong class="text-sm text-warning">(0/{{item.qusNum}})</strong>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="hidden sm:block">
      <div class="w-full h-24 p-6 box-border flex items-center bg-white shadow-md">
        <div class="stepWeb w-40 flex flex-col items-center justify-center" v-for="(item, index) in stepList" :key="index + 1">
          <span class="dotWeb relative rounded-full mr-2 border-4 box-content" :class="{'bg-primary border-blue-100': index+1 == defaultStep, 'bg-white border-gray-300': index+1 !== defaultStep}"></span>
          <strong class="text-sm">{{item.itemName}} (<span :class="{'text-red-500': caculateTotalDetailCheckedNumber(item)!==caculateTotalDetailNumber(item)}">{{caculateTotalDetailCheckedNumber(item)}}</span>/{{caculateTotalDetailNumber(item)}})</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stepList: {
      type: [Object,Array],
      required: true,
    },
    defaultStep: {
      type: Number,
      required: true,
    },
  },
  computed: {
    caculateTotalDetailNumber(){
      return (item) => {
        let total = 0
        total += item.detaiList.length
        return total
      }
    },
    caculateTotalDetailCheckedNumber() {
      return (item) => {
        let total = 0
        item.detaiList.forEach(detailItem => {
          if(detailItem.submitItem.checkResult!=='') {
            total++
          }
        });
        return total
      }
    }
  },
};
</script>

<style>
.dot {
  min-width: 14px;
  max-width: 14px;
  min-height: 14px;
  max-height: 14px;
}
.dot::before {
  content: "";
  position: absolute;
  top: 16px;
  left: 7px;
  width: 1px;
  height: 200%;
  background: #eeeeee;
}
.step:last-child .dot::before {
  display: none;
}

.dotWeb {
  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;
}
.dotWeb::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 24px;
  width: 132px;
  height: 1px;
  background: #cccccc;
}
.stepWeb:last-child .dotWeb::before {
  display: none;
}
</style>