"use client";
import React, { useEffect, useState } from "react";
import { addProduct, deleteProduct, getProducts } from "../../function/product";
import Link from "next/link";

export default function Product() {
  const [vendorName, setVendorName] = useState("");
  const [message, setMessage] = useState("");

  //get data from db
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products!", error);
      }
    };

    fetchProducts();
  }, []);

  //Add Product [product/page.jsx]
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addProduct(vendorName);
      if (result?.error) {
        setMessage(result.error);
      } else {
        setVendorName("");
        setMessage("");
        const updateProducts = await getProducts();
        setProducts(updateProducts)
      }
    } catch (error) {
      console.log("Error create order:", error);
    }
  };

  const handleDelete = async(id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmDelete) {
      try {
        await deleteProduct(id);
        const updateProducts = await getProducts();
        setProducts(updateProducts)
      } catch (error) {
        console.error("Error delete order:", error);
      }
    }
  }

  return (
    <div>
      {/* form */}
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
        <button type="submit" className="mt-2 btn bg-green-600 text-white max-w-sm">
          Submit
        </button>
        {message && <div className="text-red-500 text-center">{message}</div>}
      </form>
      </div>

      {/* table */}
      <div className="table-container table-responsive mt-5 border border-solid max-h-[700px] overflow-y-auto rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                No
              </th>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                Name
              </th>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                Edit
              </th>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {item.vendor_name}
                  </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    <Link href={`/product/${item.order_id}`}>
                    <button 
                      className="btn bg-gray-500 text-white"
                    >Edit
                    </button>
                    </Link>
                  </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    <button 
                      className="btn bg-red-600 text-white"
                      onClick={() => handleDelete(item.order_id)}
                    >Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                  colSpan="2"
                >
                  <div className="mx-4 my-2 mt-2 text-xl">
                    ไม่มีรายการของฉัน กรุณาอัปโหลด
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
