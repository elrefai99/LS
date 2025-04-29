<template>
     <nav bg-nav  shadow-md px-6 py-4 flex justify-between items-center>
       <NuxtLink to="/" text-xl font-bold text-nav_color>MySite</NuxtLink>
       <ul flex space-x-6>
         <li><NuxtLink to="/about" text-nav_color>About</NuxtLink></li>
         <li><NuxtLink to="/contact" text-nav_color>Contact</NuxtLink></li>
       </ul>
     </nav>
   </template>
   
   <script setup>
   // No extra logic needed for a static navbar
   </script>
   
   <style scoped>
   /* Optional custom styling */
   </style>
   