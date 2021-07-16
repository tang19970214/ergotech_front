<template>
  <div class="w-full">
    <div class="w-full p-4 sm:p-6 box-border bg-white" :class="{'border-b': item !== 5}" v-for="item in 1" :key="item">
      <div class="w-full flex items-start justify-between flex-col lg:flex-row">
        <div class="w-full text-left">
          <strong class="text-sm sm:text-lg">1 機械設備設有防止誤觸開關之裝置</strong>
        </div>

        <div class="w-full lg:w-48 h-20 mt-2 sm:mt-0 flex items-center justify-end">
          <div class="w-20 h-20 mr-3">
            <img class="cursor-pointer" src="@/assets/images/example.png" alt="" @click="openImg()" width="80px" height="80px">
          </div>

          <div class="w-20 h-20 p-1 box-border bg-E6E6E8 grid grid-flow-col grid-cols-2 grid-rows-2">
            <div class="flex items-center justify-center">
              <img class="cursor-pointer" src="@/assets/images/icon/help.png" alt="說明" @click="openFormModal('help')">
            </div>
            <div class="flex items-center justify-center">
              <img class="cursor-pointer" src="@/assets/images/icon/accident.png" alt="事故要因範例" @click="openFormModal('accident')">
            </div>
            <div class="flex items-center justify-center">
              <img class="cursor-pointer" src="@/assets/images/icon/regulation.png" alt="法規" @click="openFormModal('regulation')">
            </div>
          </div>
        </div>
      </div>

      <!-- form -->
      <div class="w-full flex items-start justify-center flex-col lg:flex-row border border-ccc mt-4 sm:mt-2">
        <div class="w-full flex flex-col">
          <div class="w-full py-2 px-4 box-border bg-eee text-left">
            <strong>檢核結果</strong>
          </div>
          <div class="w-full flex items-center flex-wrap py-2 px-4">
            <label class="text-sm flex items-center font-semibold mr-4">
              <input class="pr-1" v-model="singleRadio" type="radio" value="1">符合
            </label>
            <label class="text-sm flex items-center font-semibold mr-4">
              <input class="pr-1" v-model="singleRadio" type="radio" value="2" @click="openFormModal('suggest')">不符合
              <img v-if="singleRadio == '2'" class="cursor-pointer" src="@/assets/images/icon/suggest.png" alt="改善建議" @click="openFormModal('suggest')">
            </label>
            <label class="text-sm flex items-center font-semibold">
              <input class="pr-1" v-model="singleRadio" type="radio" value="3">不適用
            </label>
          </div>
        </div>

        <div class="w-full flex flex-col">
          <div class="w-full py-2 px-4 box-border bg-eee text-left">
            <strong>上傳檔案(照片)</strong>
          </div>
          <div class="w-full flex items-center flex-wrap py-2 px-4 uploadContainer">

            <UploadImage />
            <UploadImage />
            <UploadImage />
            <!-- :class需依items賦予，才不會有上傳就都跑有preview的樣式 -->
            <!-- <label :for="'upload' + items" :class="uploadTextObj" v-for="items in 3" :key="items">
              <input type="file" ref="file" :id="'upload' + items" @change="onChange">
              <img class="pr-1" :class="uploadImgObj" src="@/assets/images/uploadImg.png" alt="">
              <img :src="preview[items]" class="previewImg" />
            </label> -->

            <!-- <label for="uploadOne" :class="uploadTextObj">
              <input type="file" ref="file" id="uploadOne" @change="onChange1">
              <img class="pr-1" :class="uploadImgObj" src="@/assets/images/uploadImg.png" alt="">
              <img :src="preview" class="previewImg" />
            </label>
            <label for="uploadTwo" :class="uploadTextObj" @change="onChange2">
              <input type="file" ref="file" id="uploadTwo">
              <img class="pr-1" :class="uploadImgObj" src="@/assets/images/uploadImg.png" alt="">
              <img :src="preview2" class="previewImg" />
            </label>
            <label for="uploadThree" :class="uploadTextObj" @change="onChange3">
              <input type="file" ref="file" id="uploadThree">
              <img class="pr-1" :class="uploadImgObj" src="@/assets/images/uploadImg.png" alt="">
              <img :src="preview3" class="previewImg" />
            </label> -->

            <!-- <img class="pr-1" src="@/assets/images/example.png" alt="">
            <img class="pr-1" src="@/assets/images/example.png" alt="">
            <img src="@/assets/images/example.png" alt=""> -->
          </div>
        </div>

        <div class="w-full flex flex-col">
          <div class="w-full py-2 px-4 box-border bg-eee text-left">
            <strong>現況說明</strong>
          </div>
          <div class="w-full flex items-center py-2 px-4">
            <!-- <input type="textarea" class="w-full h-20 p-2 border"> -->
            <textarea class="w-full h-20 p-2 border"></textarea>
          </div>
        </div>
      </div>
    </div>

    <EnlargeImage v-model="openImgBool" />
  </div>
</template>

<script>
import UploadImage from "./UploadImage.vue";
import EnlargeImage from "./EnlargeImage.vue";
export default {
  components: { UploadImage, EnlargeImage },
  data() {
    return {
      singleRadio: "",
      tableHeader: [
        { id: 1, text: "檢核結果" },
        { id: 2, text: "上傳檔案(照片)" },
        { id: 3, text: "現況說明" },
      ],
      // uploadImgObj: {
      //   uploadImg: true,
      //   NoUploadImg: false,
      // },
      // uploadTextObj: {
      //   uploadText: true,
      //   NoUploadText: false,
      // },
      defaultQusImg: null,
      defaultImgId: null,
      openImgBool: false,
      // preview: [],
      // preview1: null,
      // preview2: null,
      // preview3: null,
    };
  },
  methods: {
    openFormModal(value) {
      this.$emit("openFormModal", value);
    },
    openImg() {
      this.openImgBool = true;
    },
    // onChange(event) {
    //   /* 取得迴圈的idx */
    //   const getId = event?.target?.id;
    //   const getIdNum = getId?.split("")[getId.length - 1];

    //   if (event.target?.files) {
    //     let reader = new FileReader();
    //     reader.onload = (e) => {
    //       this.preview[getIdNum] = e.target.result;
    //       this.uploadImgObj.uploadImg = false;
    //       this.uploadImgObj.NoUploadImg = true;
    //       this.uploadTextObj.uploadText = false;
    //       this.uploadTextObj.NoUploadText = true;
    //     };

    //     reader.readAsDataURL(event.target?.files[0]);
    //   }
    // },
    // onChange1(event) {
    //   var input = event.target;
    //   if (input.files) {
    //     var reader = new FileReader();
    //     reader.onload = (e) => {
    //       this.preview1 = e.target.result;
    //       this.uploadImgObj.uploadImg = false;
    //       this.uploadImgObj.NoUploadImg = true;
    //       this.uploadTextObj.uploadText = false;
    //       this.uploadTextObj.NoUploadText = true;
    //     };

    //     reader.readAsDataURL(input.files[0]);
    //   }
    // },
    // onChange2(event) {
    //   var input = event.target;
    //   if (input.files) {
    //     var reader = new FileReader();
    //     reader.onload = (e) => {
    //       this.preview2 = e.target.result;
    //       this.uploadImgObj.uploadImg = false;
    //       this.uploadImgObj.NoUploadImg = true;
    //       this.uploadTextObj.uploadText = false;
    //       this.uploadTextObj.NoUploadText = true;
    //     };

    //     reader.readAsDataURL(input.files[0]);
    //   }
    // },
    // onChange3(event) {
    //   var input = event.target;
    //   if (input.files) {
    //     var reader = new FileReader();
    //     reader.onload = (e) => {
    //       this.preview = e.target.result;
    //       this.uploadImgObj.uploadImg = false;
    //       this.uploadImgObj.NoUploadImg = true;
    //       this.uploadTextObj.uploadText = false;
    //       this.uploadTextObj.NoUploadText = true;
    //     };

    //     reader.readAsDataURL(input.files[0]);
    //   }
    // },
  },
};
</script>


<style>
/* .uploadContainer input {
  display: none;
}
.uploadContainer {
  display: flex;
}
.uploadContainer label {
  margin-right: 8px;
  width: 80px;
  height: 80px;
  border-radius: 2px;
  border: 1px solid #000000;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.uploadText::after {
  display: block;
  content: "上傳圖片";
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
}
.NoUploadText::after {
  display: none;
}

.uploadImg {
  width: 25%;
  height: 20%;
  margin-bottom: 4%;
  padding: 0px;
}
.NoUploadImg {
  display: none;
}
.previewImg {
  overflow: hidden;
} */
@media (min-width: 640px) {
  .box:nth-child(1) {
    width: 27%;
  }
  .box:nth-child(2) {
    width: 30%;
  }
  .box:nth-child(3) {
    width: 43%;
  }
}
</style>