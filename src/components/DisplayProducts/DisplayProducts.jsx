import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { data, Link } from "react-router-dom";
import { authContext } from "../Context/AuthContextProvider";
import toast from "react-hot-toast";

export default function DisplayProducts() {
 
  let { callApiProduct ,callApiWish ,getWishList,Ids } = useContext(authContext);

  
const [folg, setfolg] = useState([])



  async function addProductToWish(_id) {
    let result = await callApiWish(_id);
    let ids = await getWishList()
   
    setfolg(ids.data.data)
    console.log(result);
    if (result.data) {
      toast.success(result.data.message);
     
     
     console.log(ids.data.data)
     
      
    } else {
      toast.error("Product faild added to your wishlist");
    }
  

  }

  async function addProductToCard(_id) {
    let result = await callApiProduct(_id);
    
    if (result.data) {
      
      toast.success("Product added successfully to your cart");
     

    } else {
      toast.error("Product faild added to your cart");
    }
    
  }

  async function callApi() {
    
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    
  }
  let { data } = useQuery({
    queryKey: ["product"],
    queryFn: callApi,
    select: (data) => {
      return data?.data.data;
    },
  });

//   // let newProduct =res.data.data.filter((product)=>product.category.name == category)
//   //   setRelatedWish(newProduct)

//   // const [products, setproducts] = useState(null);
//    async function getProducts(id) {
//     console.log(id)
//     let oo = Ids?.includes(id)
// console.log(oo)

//   }

  // useEffect(() => {
  //  moo()
  // }, []);

  return (
    <>
      {data ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2  gap-5 mx-8 px-8">
          {data?.map((product) => (
            <div
              key={product._id}
              className="hover:shadow-green-600 hover:shadow-md  cursor-pointer overflow-hidden  p-2 relative  group  transition-all duration-500"
            >
              <Link
                to={`/ProductDetials/${product._id}/${product.category.name}`}
              >
                <img
                  src={product.imageCover}
                  alt="image_Product"
                  className="mb-1 w-full"
                ></img>
                <h3 className="text-green-500 text-[13px]">
                  {product.category.name}
                </h3>
                <h2>{product.title.split(" ", 2).join(" ")}</h2>
                <div className="flex justify-between">
                  {product.priceAfterDiscount ? (
                    <div className="flex gap-1">
                      <span className="text-red-600 line-through ">
                        {product.price}
                      </span>
                      <span>{product.priceAfterDiscount}EGP</span>
                    </div>
                  ) : (
                    <span>{product.price}EGP</span>
                  )}

                  <span>
                    <i className="fas fa-star text-yellow-400 px-1"> </i>
                    {product.ratingsAverage}
                  </span>
                </div>
                {product.priceAfterDiscount ? (
                  <span className="bg-red-500 absolute text-white rounded-b-md top-0 start-1">
                    sale
                  </span>
                ) : null}
              </Link>
              <div className="flex">
                <button
                  onClick={() => {
                    addProductToCard(product._id);
                  }}
                  className="block mx-auto group-hover:translate-y-0 hover:bg-green-400 hover:text-white translate-y-[400%] transition-all duration-300 border-[1px] border-solid border-green-400 rounded-md w-2/3 py-1 my-2"
                >
                  Add to Card
                </button>
                <button
                 onClick={() => {
                  addProductToWish(product._id);
                }}>
                  { folg.some((id)=>id._id == product._id)?<i className="text-red-800 text-2xl fa fa-heart"></i>:<i className="text-2xl fa fa-heart"></i>}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center inset-0 ">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
}
