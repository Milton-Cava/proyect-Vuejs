import axios from 'axios'

export const codigoOTP = async (telefono) =>{
    try{
       const response = await axios.get('https://test.wanqara.com/api/send-code',{
        params:{
            telefono: telefono
        }
       });
       console.log(response);
    } catch(error){
       console.error('Error al enviar el código OTP:', error);
    }
}
    

