<template>
<div v-if="show" class="w-full h-screen fixed left-0 top-0 flex items-center justify-center inset-0 z-50">
   <div class="absolute bg-gray-800 opacity-80 inset-0 z-0"></div>
    <div class="enlargContainer">
         <img class="img" src="@/assets/images/enlargeImg.png" alt="">
         <img class="closeBtn" src="@/assets/images/colseBtn.png" alt="" @click="show = false">
    </div>
</div>
</template>
<script>

export default{
    props: {
        value: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    data() {
        return {
            show: false
        }
    },
    watch: {
        value: {
            handler(val) {
                const vm = this

                vm.show = val
            }
        },
        show(val) {
            const vm = this

            vm.$emit('input', val)
        }
    },
}
</script>
<style>
    .enlargContainer{
        width: 42%;
        position: fixed;
        top: 10%;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    .enlargContainer .img{
        width: 100%;
        display: inline-block;
    }
    .enlargContainer .closeBtn{
        position: fixed;
        margin-left: 1%;
        width: 3%;
        z-index: 99;
        display: inline-block;
        top:10%;
    }
    @media (max-width:1024px) {
        .enlargContainer{
            width: 80%;
           
        }
        .enlargContainer .closeBtn{
        width: 8%;
        
    
        }
    }
</style>