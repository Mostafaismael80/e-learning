import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

// import { useState } from 'react'

export default function Brands() {
  const [brands, setbrands] = useState(null);
 

  async function AlertBrand(Id) {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${Id}`)
      .then((res) => {
        toast.success(res.data.data.name);
      })
      .catch((error) => {
        console.log(error);
        console.log(Id)
      });
  }

  async function Brands() {
     await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands?limit=40")
      .then((res) => {
        console.log(res);
        
        setbrands(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    Brands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands page</title>
      </Helmet>
      <h1 className=" mb-4 text-center text-4xl font-boldbold text-green-700">
        All Brands
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2  gap-5 mx-8 px-8">
        {brands?.map((Brand) => (
          <div
            key={Brand._id}
            className="hover:shadow-green-600 hover:shadow-md  cursor-pointer overflow-hidden  p-2  transition-all duration-500 border"
          >
            <button
              onClick={() => {
                AlertBrand(Brand._id);
              }}
            >
              {" "}
              <img
                src={Brand.image}
                alt="image_Product"
                className="mb-1 w-full "
              ></img>
              <span className="text-center block pb-5">{Brand.name}</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
