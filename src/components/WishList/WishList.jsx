import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../Context/AuthContextProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { Triangle } from "react-loader-spinner";

export default function WishList() {
  let { token ,   } = useContext(authContext);
  const [Wish, setWish] = useState(null);
  const [isLoading, setisLoading] = useState(null);

  async function deleteWishList(id) {
    setisLoading(true);
    await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message)

        
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setisLoading(false);
      });
  }
  async function getWishListo() {
    setisLoading(true);
     await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token,
        },
      })
      .then((res) => {
        console.log(res);
         setWish(res.data.data);

      })
      .catch((error) => {
        console.log(error);
         error;
      })
      .finally(() => {
        setisLoading(false);
      });
  }
  
  
  useEffect(() => {
    getWishListo();
  }, []);

  return (
    <>
    {isLoading?<div className="flex justify-center items-center inset-0 "><Triangle
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /></div>:<div className="bg-slate-100  rounded-md py-14 px-10 lg:mx-10 ">
      <h1 className="text-3xl font-sans pb-3">My Wish List :</h1>
      {Wish?.map((pro) => (
        <div
          key={pro.id}
          className="gap-6 grid grid-cols-[minmax(0,1fr)_minmax(0,4fr)] items-center mx-6 pt-6 border-b pb-3"
        >
          <img src={pro.imageCover} alt={pro.title} className="w-full"></img>
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="text-2xl pb-2">{pro.brand.name}</h3>
              <h3 className="text-green-700 text-base">{pro.price}EGP </h3>
              <button
              type="submit"
                  onClick={() => {
                    deleteWishList(pro.id);
                  }}
                className="text-sm font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                <i className="fa fa-trash text-sm pe-1"></i>
                Remove
              </button>
            </div>
            <button
            // onClick={() => {
            //     deleteWishList();
            // }}
            className="text-xl mt-6 rounded-md text-black border p-3 border-green-600 hover:text-white hover:bg-green-600"
          >
            Add To Cart
          </button>

          </div>
        </div>
      ))}
    </div>}
    
    </>
  );
}
