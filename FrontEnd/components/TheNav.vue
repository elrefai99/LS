<template>
     <nav bg-nav  shadow-md px-6 py-4 flex justify-between items-center>
       <NuxtLink to="/" text-xl font-bold text-nav_color>LS</NuxtLink>
       <ul flex space-x-6>
         <li><NuxtLink to="/about" text-nav_color>About</NuxtLink></li>
         <li><NuxtLink to="/contact" text-nav_color>Contact</NuxtLink></li>
         <li><NuxtLink to="/sign-up" text-nav_color>Sign up</NuxtLink></li>
       </ul>
     </nav>
</template>

<script setup>
</script>
