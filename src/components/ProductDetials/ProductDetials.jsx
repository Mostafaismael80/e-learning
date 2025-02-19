import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Triangle } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";

export default function ProductDetials() {
  const [product, setproduct] = useState(null);
  const [RelatedProduct, setRelatedProduct] = useState(null)
  let { id , category } = useParams();

  async function getProducts() {
    let res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    
    let newProduct =res.data.data.filter((product)=>product.category.name == category)
    setRelatedProduct(newProduct)
    console.log(newProduct)
  }

  async function getSpecificDetails(id) {
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    console.log(res.data);
    setproduct(res.data.data);
   
  }
  useEffect(() => {
    getSpecificDetails(id);
    getProducts()
  }, [id]);

  return (<>
  <Helmet>
    <title>ProductDetials page</title>
  </Helmet>
    {product ? <div className="gap-6 grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-center mx-6">
      <div>
        <img
          src={product?.imageCover}
          alt="image_Product"
          className="mb-1 w-full"
        ></img>
      </div>
      <div className="px-5">
      
        <h2 className="py-2">{product?.title}</h2>
        <h3 className="text-green-500 text-[13px]">{product?.category.name}</h3>
        
        <div className="flex justify-between text-sm">
          {product?.priceAfterDiscount ? (
            <div className="flex gap-1">
              <span className="text-red-600 line-through ">
                {product?.price}
              </span>
              <span>{product?.priceAfterDiscount}EGP</span>
            </div>
          ) : (
            <span>{product?.price}EGP</span>
          )}

          <span>
            <i className="fas fa-star text-yellow-400 px-1"> </i>
            {product?.ratingsAverage}
          </span>
        </div>
        <button className= " group-hover:translate-y-0 hover:bg-green-400 hover:text-white translate-y-[200%] transition-all duration-300 border-[1px] border-solid border-green-400 rounded-md w-full py-1 my-2">
          Add to Card
        </button>
      </div>
    </div>:<div className="flex justify-center items-center inset-0 "><Triangle
    visible={true}
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    /></div>}
    
    {RelatedProduct?<div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2  gap-5 mx-8">
        {RelatedProduct?.map((product) => (
          <div
            key={product._id}
            className="cursor-pointer overflow-hidden shadow p-2 relative  group"
          >
            <Link to={`/ProductDetials/${product._id}/${product.category.name}`}>
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
            <button className="group-hover:translate-y-0 hover:bg-green-400 hover:text-white translate-y-[400%] transition-all duration-300 border-[1px] border-solid border-green-400 rounded-md w-full py-1 my-2">
              Add to Card
            </button>
          </div>
        ))}
      </div>:<div className="flex justify-center items-center inset-0 "><Triangle
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>}
    </>
  );
}
