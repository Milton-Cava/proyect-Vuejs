import { defineStore } from "pinia";
import { ref } from 'vue';

export const useLoginStore = defineStore('registrar', () => {
    const nombre = ref('');
    const apellido = ref('');
    const telefono = ref('');

    const guardarRegistro = (nombreFormulario, apellidoFormulario, telefonoFormulario) => {
        nombre.value = nombreFormulario;
        apellido.value = apellidoFormulario;
        telefono.value = telefonoFormulario;
        console.log(nombre.value);
    };

    return { nombre, apellido, telefono, guardarRegistro };
});
