<template>
  <div class="w-full">
    <div class="w-full p-4 sm:p-6 box-border bg-white" :class="{'border-b': item !== 5}" v-for="item in 5" :key="item">
      <div class="w-full flex items-start justify-between flex-col sm:flex-row">
        <div class="w-full sm:w-3/4 text-left">
          <strong class="text-sm sm:text-lg">1 機械設備設有防止誤觸開關之裝置</strong>
        </div>

        <div class="w-full sm:w-1/4 h-20 mt-2 sm:mt-0 flex items-center justify-start sm:justify-end">
          <div class="h-full flex flex-col items-center justify-between px-3">
            <img class="cursor-pointer" src="@/assets/images/icon/help.png" alt="說明" @click="openFormModal('help')">
            <img class="cursor-pointer" src="@/assets/images/icon/regulation.png" alt="法規" @click="openFormModal('regulation')">
            <img class="cursor-pointer" src="@/assets/images/icon/accident.png" alt="事故要因範例" @click="openFormModal('accident')">
          </div>

          <div class="w-20 h-20">
            <img src="@/assets/images/example.png" alt="">
          </div>
        </div>
      </div>

      <!-- form -->
      <!-- 改成上下是一起的，flex-col sm:flex-row -->
      <div class="w-full flex items-start justify-center flex-col sm:flex-row border border-ccc mt-4 sm:mt-2">
        <div class="w-full flex flex-col">
          <div class="w-full py-2 px-4 box-border bg-eee text-left">
            <strong>檢核結果</strong>
          </div>
          <div class="w-full flex items-center flex-wrap py-2 px-4">
            <label class="text-sm flex items-center font-semibold mr-4"><input class="pr-1" type="radio" name="result" value="1">符合</label>
            <label class="text-sm flex items-center font-semibold mr-4"><input class="pr-1" type="radio" name="result" value="2">不符合</label>
            <label class="text-sm flex items-center font-semibold"><input class="pr-1" type="radio" name="result" value="3">不適用</label>
          </div>
        </div>

        <div class="w-full flex flex-col">
          <div class="w-full py-2 px-4 box-border bg-eee text-left">
            <strong>上傳檔案(照片)</strong>
          </div>
          <div class="w-full flex items-center flex-wrap py-2 px-4 uploadContainer">
            <!-- <div class="w-20 h-20 rounded-sm border flex items-center justify-center">
              <input class="w-full h-full" type="file" accept="image/png, image/jpeg, image/jpg">
            </div> -->
            <label for="uploadOne" :class="uploadTextObj">
              <input type="file" ref="file" id="uploadOne" @change="onChange">
              <img class="pr-1" :class="uploadImgObj" src="@/assets/images/uploadImg.png" alt="">
              <img :src="preview" class="previewImg" />
            </label>
            <label for="uploadTwo" :class="uploadTextObj">
              <input type="file" ref="file" id="uploadTwo" @change="onChange">
               <img class="pr-1" :class="uploadImgObj" src="@/assets/images/uploadImg.png" alt="">
              <img :src="preview" class="previewImg" />
            </label>
             <label for="uploadThree" :class="uploadTextObj">
              <img class="pr-1" :class="uploadImgObj" src="@/assets/images/uploadImg.png" alt="">
              <img :src="preview" class="previewImg" />
            </label>
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
            <input type="text" class="w-full h-20 p-2 border">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeader: [
        { id: 1, text: "檢核結果" },
        { id: 2, text: "上傳檔案(照片)" },
        { id: 3, text: "現況說明" },
      ],
      uploadImgObj:{
        uploadImg:true,
        NoUploadImg:false,
      },
      uploadTextObj:{
        uploadText:true,
        NoUploadText:false
      },
      preview: null
    };
  },
  methods: {
    openFormModal(value) {
      this.$emit("openFormModal", value);
    },
    onChange(event) {
      
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
          this.uploadImgObj.uploadImg = false;
          this.uploadImgObj.NoUploadImg = true;
          this.uploadTextObj.uploadText = false;
          this.uploadTextObj.NoUploadText = true;
        }
        
        reader.readAsDataURL(input.files[0]);
      }
    },
  }
  
};
</script>


<style>
.uploadContainer input{
    display: none;
}
.uploadContainer{
    display: flex;
}
.uploadContainer label{
    margin-right: 8px;
    width: 80px;
    height: 80px;
    border-radius:2px;
    border:1px solid #000000;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor:pointer;
}
.uploadText::after{
 
  display: block;
  content: "上傳圖片";
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
}
.NoUploadText::after{
   display: none;
}

.uploadImg{
  width: 25%;
  height: 20%;
  margin-bottom: 4%;
  padding: 0px;
}
.NoUploadImg{
  display: none;
}
.previewImg{
 
  overflow: hidden;
}
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