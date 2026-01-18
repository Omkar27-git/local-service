import api from "axios"

export const registerApi = async(data:{
  name:string;
  email:string;
  password:string;

})=>{
  const res = await api.post('/auth/register',data);
  return res.data;
}


export const loginApi = async(data:{
  email:string;
  password:string;
})=>{
  const res = await api.post('/auth/login',data);
  return res.data;
}