<template>
  <fwb-carousel :pictures="pictures" slide />
</template>

<script setup>
import { FwbCarousel } from 'flowbite-vue'

const { sys } = useApi()

const { data: pictures } = await useFetch('/api/banner')
console.log(pictures)

</script>