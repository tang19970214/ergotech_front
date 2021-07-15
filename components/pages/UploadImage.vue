<template>
    <div class="uploadContainer" @click="openUpload">
        <!-- <label :for="'upload'" class="containerLabel"> -->
            <input type="file" ref="input" id="uplaod" @change="onChange" accept="image/*" >
            <img :src="showImage" alt="">
        <!-- </label> -->
    </div>
</template>



<script>
export default {
    data(){
        return{
            showImage: require("../../assets/images/uploadImg.png")
        }
    },
    methods: {
        openUpload () {
            this.$refs.input.click()      
        },
        onChange(){
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
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.uploadContainer img{
   
}
.uploadContainer input {
  display: none;
}
/* .containerLabel{
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
} */

.uploadContainer::after {
  display: block;
  content: "上傳圖片";
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
}
</style>