<template>
    <AppHeader></AppHeader>
    <AppSearch ref="searchComponent"></AppSearch>
    <AppBanner></AppBanner>
    <AppBottom></AppBottom>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import AppHeader from '@/components/AppHeader';
  import AppSearch from '@/components/AppSearch';
  import AppBanner from '@/components/AppBanner';
  import AppBottom from '@/components/AppBottom';
  
  export default {
    setup() {
      const searchComponent = ref(null);
  
      onMounted(() => {
        if (searchComponent.value && searchComponent.value.performSearch) {
          searchComponent.value.performSearch();
        }
      });
  
      return {
        searchComponent,
      };
    },
  };
  </script>
  
  <style scoped>
  /* 添加样式 */
  </style>
  