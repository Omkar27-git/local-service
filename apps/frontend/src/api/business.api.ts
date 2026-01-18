import api from "./axios";

export const getBusinesses = async () =>{
    const res = await api.get("/businesses");
    return res.data;
}

export const createBusiness = async (data:{
    name:string;
    category:string;
})=>{
    const res = await api.post("/businesses",data);
    return res.data;
}