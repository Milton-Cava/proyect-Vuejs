
<!--Java Script-->
<script setup>
import {ref, computed} from "vue";
import {Form,  Field, ErrorMessage} from 'vee-validate';
import { schema } from '../modules/login/schemas/ValidationSchema.js';
import {useLoginStore} from '../modules/refStores/formularioStore.js';
import { codigoOTP } from '../modules/login/schemas/OTP.js';


///definir las props del componente
const otpProps = defineProps({
    length:{
        type: Number,
        default: 6
    }

})
//const otpArray = ref([])
//const container = ref()
//const otpArray = ref([]);
// Estados reactivos
const otpArray = ref(Array(otpProps.length).fill(''));
const container = ref('');
const loading = ref(false);
const  success = ref(false);
const error = ref(false);

///Propiedades computadas para los estados
const isLoading = computed(()=>loading.value);
const isSuccess = computed(()=>success.value);
const isError = computed(()=> error.value);

//Tienda de registro

const registroStore = useLoginStore() ;
const nombre = ref('');
const apellido = ref('');
const telefono = ref('');
///función para mostrar el dialogo de carga
const showLoadingDialog = () => {
    loading.value = true;
}
//funcion para mostrar el dialogo de éxito
const showSuccessDialog = ()=>{
    success.value = true;
}
//funcion para mostrar el dialogo de error
const showErrorDialog = () =>{
    error.value = true;
}
//funcion para ocultar todos los dialogos
const hideAllDialogs = () =>{
    loading.value = false;
    success.value = false;
    error.value = false;
}
// funcion para manejar el envío del formulario
const onSubmit = async () =>{
    ///loading.value= true;
    //success.value = false;
    //error.value = false;
    hideAllDialogs();
    showLoadingDialog();

   registroStore.guardarRegistro(nombre.value, apellido.value, telefono.value);
   try{

      await codigoOTP(telefono.value);

      showSuccessDialog();
      console.log('codigo OTP enviado exitosamente')
   }catch(error){
       showErrorDialog();
       console.error('Error el codigo al enviar')
   } finally{
    loading.value = false;
   }
}



</script>
<!--HMTL-->
<template>
    

    <main class=" h-screen flex justify-center items-center"> 
        
        <div class="bg-white shadow-sm p-5 w-[40%] border-x-2 border-gray-400">

            <div class="logo-container text-center mb-4">
                <img src="/img/logo.png" alt="Logo" class="logo mx-auto">
            </div>

           <p class="text-center font-semibold ">Favor llena estos campos para acceder al DEMO de inmendiato.</p>

            <Form class="mt-5 space-y-6" :validation-schema="schema" @submit="onSubmit" >
                <!--class="mt-5 space-y-6" -->
                <div class="flex gap-5">
                    <div class="container">

                        <label for="name" class="title">Nombre </label>
                        <Field v-model="nombre"  name="nombre" id="name"  type="text" class="input" placeholder="Nombre"/>
                        <ErrorMessage name="nombre" class="color"></ErrorMessage>
                        
                    </div>
                    
                    <div class="container">

                        <label for="last_name" class="title">Apellido </label>
                        <Field v-model="apellido" name="apellido" id="last_name" type="text" class="input" placeholder="Apellido"/>
                        <ErrorMessage name="apellido" class="color"></ErrorMessage>
                    </div>

                </div>
                <div class="container">
                    
                    <label for="telefono" class="title">Teléfono (Ej. 09xxxxxx)</label>
                    <Field v-model="telefono" name="telefono" id="telefono" type="text" class="input" maxlength="10" />
                    <ErrorMessage name="telefono" class="color"></ErrorMessage>
                </div>
                
             
                     <!-- Feedback visual -->
                    <div v-if="isLoading" class="text-center text-blue-500">Enviando código OTP...</div>
                    <div v-if="isSuccess" class="text-center text-green-500">Código OTP enviado exitosamente!</div>
                    <div v-if="isError" class="text-center text-red-500">Error al enviar el código OTP. Intenta de nuevo.</div>


                <button
                  type="submit"
                  value = "Solicite código"
                  class =" uppercase   active:bg-green-700 bg-blue-800  hover:bg-blue-700 w-full py-2 text-white rounded-lg font-semibold"
                  >Solicitar Código
                </button>
                

                <div class="text-center">
                    <p class="text-center font-semibold">Haz click  en "Solicitar código"</p>
                    <p class="text-gray-500"> Enviaremos un <span clas="font-semibold text-gray-900"> mensaje de texto </span> con un codigo a  tu numero de celular</p>
                    <p class="text-gray-500"> El código tiene vigencia de 2 minutos</p>
                </div>
                <div ref="container" class="flex flex-wrap gap-4  items-center justify-center">
                     <input v-for="n in length" :key="n" v-model="otpArray[n-1]" type="text" maxlength="1"  class=" border border-gray-400 rounded-md w-10 p-2" ></input>                  
                </div>

                <div class="text-center text-gray-500">
                  <p>Si no recibiste el código haz click nuevamente en "Solicitar código"</p>
                </div>
            </Form>
            
        </div>
      
        
    </main> 
</template>



<!--CSs-->
<style >
.container {
  @apply border-2 border-gray-300 focus-within:border-gray-600 p-1 rounded-md relative;
}
.title{
    @apply absolute -top-3 left-2 bg-white px-1 text-xs text-gray-300;
}
.input{
    @apply p-1 w-full outline-none border-none  text-gray-600;
}
.logo {
  width: 200px; /* Ajusta el tamaño del logo según sea necesario */
  height: auto;
}
.color{
   color:red;
}


</style>