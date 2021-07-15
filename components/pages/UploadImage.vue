<template>
    <div class="uploadContainer" :class="uploadTextObj" @click="openUpload">
        <input type="file" ref="input" id="uplaod" @change="onChange" accept="image/*" >
        <img :src="showImage" alt="">
    </div>
</template>



<script>
export default {
    data(){
        return{
            showImage: require("../../assets/images/uploadImg.png"),
            uploadTextObj: {
                uploadText: true,
                NoUploadText: false,
            },
        }
    },
    methods: {
        openUpload () {
            this.$refs.input.click()      
        },
        onChange(){
            this.uploadTextObj.uploadText = false;
            this.uploadTextObj.NoUploadText = true;
            var reader = new FileReader()
            reader.readAsDataURL(this.$refs.input.files[0])
            
            reader.onload = e => {
                this.showImage = e.target.result
            } 
        },

    }
}
</script>

<style scoped>
.uploadContainer{
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
.uploadContainer img{
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

</style>