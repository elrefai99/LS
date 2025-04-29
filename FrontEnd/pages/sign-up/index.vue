<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import Cookies from "js-cookie";

const email = ref("");
const password = ref("");
const handleSubmit = async (event: Event) => {
     event.preventDefault();
     const data = {
          email: email.value,
          password: password.value,
     };
     const response = await axios.post('http://localhost:8000/api/auth/login',data,{
          withCredentials: true,
     });
     console.log("data", response.data);
     if (response.status === 200) {
          console.log("Login successful", response);
          const token = Cookies.get('__ssdt');
      console.log('Cookie value:', token);
          // Handle successful login here
     } else if(response.status === 400){
          console.log("Login failed");
          // Handle login failure here
     }
};
</script>
<template>
     <form @submit.prevent="handleSubmit">
          <input
               v-model="email"
               type="email"
               placeholder="Enter your email"
               border p-2 mr-2 text-black/>
          <input
               v-model="password"
               type="password"
               placeholder="Enter your password"
               border p-2 mr-2 text-black/>     
          <button 
               w-20 bg-red-300 text-black p-2 m-2
               type="submit" >
               Sign up
          </button>
     </form>
   </template>
