import * as yup from 'yup'

export const schema = yup.object({
    nombre: yup.string().required('Nombre es obligatorio'),
    apellido: yup.string().required('Apellido es obligatorio'),
    telefono: yup.string().required('El teléfono es obligatorio')
    .matches(/^09[0-9]{8}$/, 'El teléfono debe comenzar con 09 y tener exactamente 10 dígitos')
 });
