"use client";
import React, { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../../../function/product";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductId({ params }) {
  const router = useRouter();
  const { id } = params;
  const [vendorName, setVendorName] = useState("");
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProduct(id);
        setVendorName(data.vendor_name);
      } catch (error) {
        console.log("Error fetching products!", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!vendorName.trim()){
        setMessage("กรุณากรอก vendorname")
        return;
    }

    const formData = {
        order_id : id,
        vendor_name:vendorName
    }

    try {
      const result = await updateProduct(formData);
      if (result?.error) {
        setMessage(result.error);
      } else {
        router.push('/product')
      }
    } catch (error) {
      console.log("Error create order:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Edit Product {id}</h1>
      <div className="border border-solid rounded-lg shadow max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-5">
            <h1 className="text-xl">vendorName</h1>
            <input
              type="text"
              name="vendorName"
              className="input input-bordered"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
          </div>
          <button type="submit" className="mt-2 btn bg-green-600 text-white w-full">
            Edit name
          </button>
          <Link href={`/product`}>
          <span className="btn bg-gray-400 w-full text-white">ยกเลิก</span>
          </Link>
          {message && <div>{message}</div>}
        </form>
      </div>
    </div>
  );
}
