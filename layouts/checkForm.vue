<template>
  <div class="relative w-full min-h-screen bg-gray-200">
    <Loading />
    <FormHeader />
    <Nuxt class="defaultPage sm:pt-16" />
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import FormHeader from "../components/FormHeader.vue";

export default {
  components: { Loading, FormHeader },
};
</script>

<style scoped>
.defaultPage {
  margin: 0 auto;
}

@media (max-width: 639px) {
  .defaultPage {
    padding-top: 88px;
    padding-bottom: 60px;
  }
}
</style>