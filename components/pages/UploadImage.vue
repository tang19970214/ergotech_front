<template>
  <div class="">
    <div class="uploadContainer" :class="uploadTextObj" @click="openUpload">
      <input
        type="file"
        ref="input"
        id="uplaod"
        :disabled="readable"
        @change="fileUpload($event, item, imgKey)"
        accept="image/*"
      />
      <img
        :src="PROCESSENVIMGSRC + item[imgKey]"
        alt=""
        v-if="!!item[imgKey] && !readable"
      />
      <img
        :src="PROCESSENVIMGSRC + item[imgKey]"
        alt=""
        v-else-if="!!item[imgKey] && readable"
        @click="openImg(item[imgKey])"
      />
      <img :src="showImage" alt="" v-else />
    </div>
    <div class="trash" v-if="!readable">
        <img 
        :src="showTrashImage" alt=""
        v-if="!!item[imgKey]"
        @click ="deletePic($event, item, imgKey)"
        >
    </div>
  </div>
</template>



<script>
export default {
  props: {
    item: {
      type: [Object],
      require: true,
    },
    imgKey: {
      type: [String],
      require: true,
    },
    readable: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      PROCESSENVIMGSRC: process.env.VUE_APP_BASE_IMG_URL,
      showImage: require("../../assets/images/uploadImg.png"),
      showTrashImage: require("../../assets/images/trash.png"),
      // uploadTextObj: {
      //     uploadText: true,
      //     NoUploadText: false,
      // },
    };
  },
  computed: {
    uploadTextObj() {
      let uploadText = true;
      let NoUploadText = false;
      if (!!this.item[this.imgKey]) {
        uploadText = !uploadText;
        NoUploadText = !NoUploadText;
      }
      return { uploadText, NoUploadText };
    },
  },
  methods: {
    openImg(imgSrc) {
      this.$emit('openImg', imgSrc)
    },
    openUpload() {
      this.$refs.input.click();
    },
    fileUpload(e, item, imgkey) {
      this.$emit("fileUpload", { e, item, imgkey });
    },
    deletePic(e, item, imgkey){    
        this.$emit("deletePic", { e, item, imgkey });
    }
  },
};
</script>

<style scoped>
.uploadContainer {
  width: 80px;
  height: 80px;
  border-radius: 2px;
  border: 1px solid #000000;
  cursor: pointer;
  overflow: hidden;
  margin-right: 8px;
  margin-bottom: 4px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.uploadContainer img {
  margin-bottom: 4px;
}
.uploadContainer input {
  display: none;
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
.trash{
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: auto;
    margin-right: 8px;
}
</style>