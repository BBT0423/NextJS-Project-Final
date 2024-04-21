"use server";

import axios from "axios";

const path = process.env.LocalhostDOTNET;

export const getProducts = async() => {
  try {
    const result = await axios.get(
      `${path}/api/Order/GetOrderList`,
       {
         headers: {
           "Content-Type": "application/json",
           "Cache-Control": "no-store",
         },
       }
     );
    
     if(!result){
      throw new Error("Cannot fetch data!")
     }

     return result.data;
  } catch (error) {
    console.log("Error fetch products!",error)
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
}

export const getProduct = async(id) => {
  try {
    const result = await axios.get(
      `${path}/api/Order/GetOrder/${id}`,
       {
         headers: {
           "Content-Type": "application/json",
           "Cache-Control": "no-store",
         },
       }
     );
    
     if(!result){
      throw new Error("Cannot fetch data!")
     }

     return result.data;
  } catch (error) {
    console.log("Error fetch products!",error)
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
}

export const addProduct = async (vendorName) => {
  if (vendorName == "") {
    return { error: "กรอก vendorName ด้วย" };
  }

  try {
    const result = await axios.post(
     `${path}/api/Order/SaveOrder`,
      {
        vendor_name: vendorName.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.log("Error create product!",error)
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
};

export const updateProduct = async (formData) => {
  try {
    const result = await axios.post(
     `${path}/api/Order/UpdateOrder`,
      {
        order_id : formData.order_id,
        vendor_name: formData.vendor_name
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.log("Error create product!",error)
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
};

export const deleteProduct = async(id) => {
  try {
    const result = await axios.delete(
      `${path}/api/Order/DeleteOrder/${id}`,
       {
         headers: {
           "Content-Type": "application/json",
           "Cache-Control": "no-store",
         },
       }
     );
    
     if(!result){
      throw new Error("Cannot fetch data!")
     }
  } catch (error) {
    console.log("Error fetch products!",error)
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
}

