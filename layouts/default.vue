<template>
  <div class="relative w-full min-h-screen bg-gray-200">
    <Header />

    <Nuxt class="defaultPage min-h-screen sm:pt-16 " />
  </div>

</template>

<script>
import Header from "../components/Header.vue";

export default {
  components: { Header },
};
</script>

<style scoped>
.defaultPage {
  margin: 0 auto;
}

@media (max-width: 639px) {
  .defaultPage {
    padding-top: 88px;
    padding-bottom: 48px;
  }
}
</style>