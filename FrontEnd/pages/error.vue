<template>
     <div class="h-screen flex items-center justify-center bg-gray-100 text-center">
       <div>
         <h1 text-6xl font-bold text-blue-600 mb-4>404</h1>
         <p class="text-xl text-gray-700 mb-6">Sorry, the page you're looking for doesn't exist.</p>
         <NuxtLink to="/" class="text-blue-500 hover:underline">Back to Homepage</NuxtLink>
       </div>
     </div>
   </template>
   
   <script setup>
   // Nuxt will automatically use this page on navigation errors
   </script>
   