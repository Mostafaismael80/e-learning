import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function Categories() {
  const [Categoties, setCategoties] = useState(null);

  async function Categories() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories?limit=10")
      .then((res) => {
        console.log(res);

        setCategoties(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    Categories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Categories page</title>
      </Helmet>
      <div className="grid lg:grid-cols-3  sm:grid-cols-1  gap-5 mx-8  md:grid-cols-3 md:my-10 sm:my-10">
      {Categoties?.map((Categorie)=> (
          <div
            key={Categorie._id}
            className=" hover:shadow-green-600 rounded hover:shadow-md  cursor-pointer overflow-hidden    transition-all duration-500 border"
          >
            <button className="">
              
              <img 
                src={Categorie.image}
                alt="image_Product"
                className="mb-1 md:w-[350px] lg:w-[450px] sm:w-[650px] object-cover md:h-[250px] lg:h-[350px] rounded-t "
              ></img>
              <span className="text-center block p-4 text-2xl font-bold text-green-700">{Categorie.name}</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
