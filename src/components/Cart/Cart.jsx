import React, { useContext, useEffect } from "react";
import { authContext } from "../Context/AuthContextProvider";
import { Triangle } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Await, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

// import { useState } from 'react'

export default function Card() {
  let { token } = useContext(authContext);
  let navigate = useNavigate();

  async function clear() {
    await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const [first, setfirst] = useState(second)
  let {
    updateItem,
    removeItem,
    isLoading,
    getCart,
    NumOfCartItems,
    ProductsCart,
    TotalCartPrice,
  } = useContext(authContext);
  useEffect(() => {
    getCart();
  }, []);
  if (isLoading) {
    return (
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
    );
  }

  async function removeProductItem(_id) {
    let flag = await removeItem(_id);

    if (flag) {
      toast.success("Product deleted");
    } else {
      toast.error("Product not deleted");
    }
  }
  return (
    <>
      <Helmet>
        <title>card page</title>
      </Helmet>
      <div className="bg-slate-100  rounded-md py-14 px-10 lg:mx-10">
        <div className="flex justify-between ">
          <h2 className="text-3xl font-semibold">Cart Shop</h2>
          <Link
            to={"/Payment"}
            className="text-xl py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            check out
          </Link>
        </div>
        <div className="flex justify-between pt-8">
          <h3 className="text-xl font-semibold">
            total price:
            <span className="ps-1 text-green-500">{TotalCartPrice}</span>
          </h3>
          <h3 className="text-xl font-semibold">
            total number of items:
            <span className="ps-1 text-green-500">{NumOfCartItems}</span>
          </h3>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ProductsCart?.map((product) => (
                <tr
                  key={product.product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          updateItem(product.product.id, product.count - 1);
                        }}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <input
                          type="number"
                          id="first_product"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={product.count}
                          required
                        />
                      </div>
                      <button
                        onClick={() => {
                          updateItem(product.product.id, product.count + 1);
                        }}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price}EGP
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        removeProductItem(product.product.id);
                      }}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <button
            onClick={() => {
              clear();
            }}
            className="text-xl mt-6 rounded-md text-black border p-3 border-green-600 hover:text-white hover:bg-green-600"
          >
            Clear Your Cart
          </button>
        </div>
      </div>
    </>
  );
}
