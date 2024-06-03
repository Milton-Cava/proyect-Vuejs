<template>
    

</template>

<script setup>
import axios from 'axios'

export const codigoOTP = async () =>{
    try{
       const response = await axios.get('http://test.wanqara.com/api/send-code');
    } catch(error){
       console.error('Error al enviar el código OTP:', error);
    }

}
    

</script>
  
<style>

</style>