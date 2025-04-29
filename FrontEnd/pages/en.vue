<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import '../styles/base.css'
import { useHead } from '@unhead/vue'

useHead({
  title: 'LS - Home page',
  meta: [
    { name: 'description', content: 'This is my awesome page description' },
    { name: 'keywords', content: 'chat, vue, seo, web development' },
    { property: 'og:title', content: 'My OpenGraph Title' },
    { property: 'og:description', content: 'OpenGraph description for social media' },
//     { property: 'og:image', content: 'https://example.com/og-image.jpg' },
  ]
})
</script>
<template>
  <TheNav />
</template>
