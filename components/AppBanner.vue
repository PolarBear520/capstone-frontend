<template>
  <fwb-carousel :pictures="pictures" slide />
</template>

<script setup>
import { FwbCarousel } from 'flowbite-vue'

const { data: pictures } = await useFetch('/api/banner')
console.log(pictures)

</script>