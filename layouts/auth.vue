<template>
  <div class="authLayout relative w-full min-h-screen bg-cover">
    <Loading />
    <Nuxt />
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
export default {
  components: { Loading },
};
</script>

<style>
.authLayout {
  background-image: url("@/assets/images/loginBG.png");
}
</style>