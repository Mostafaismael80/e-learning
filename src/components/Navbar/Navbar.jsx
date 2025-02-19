import React, { useContext, useEffect } from "react";
import { useState } from "react";
import img from "../../assets/freshcart-logo.53f7a424c3aedc30a0fb46dc2278137c.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContextProvider";

export default function Navbar() {
  const [expended, setExpended ] = useState(false);

  let { token, settoken ,  NumOfCartItems , getCart} = useContext(authContext);
  let navigate = useNavigate();
  function login() {
    navigate("/login");
    localStorage.removeItem("token");
    settoken(null);
  }
  async function count() {
    let response = await getCart()
    }
  
useEffect(() => {
 if (localStorage.getItem("token")) {
  count()
 }
}, [])

  return (
    <>
      <nav>
        <div className="fixed top-0 start-0 end-0 z-20 bg-slate-100 px-5 md:px-28 py-6  lg:flex items-center justify-between  ">
          <div className="flex justify-between items-baseline ">
            <Link className="mt-1 " to={"home"}>
              <img src={img} className=""></img>
            </Link>
            <button
              onClick={() => {
                setExpended(!expended);
              }}
              className={`text-3xl ${
                expended ? "border border-white " : ""
              } lg:hidden  `}
            >
              =
            </button>
          </div>
          <div>
            {token ? (
              <ul
                className={` ${
                  expended ? "h-28" : "h-0"
                } mt-2 overflow-hidden duration-300 lg:h-auto lg:flex`}
              >
                <li></li>
                <NavLink
                  className="text-gray-500 px-3  block w-fit rounded-xl duration-200 text-md .active"
                  to={"Home"}
                >
                  Home
                </NavLink>
                <li></li>
                <NavLink
                  className="text-gray-500 px-3   w-fit rounded-xl duration-200 block text-md"
                  to={"cart"}
                >
                  Cart
                </NavLink>
                <li></li>
                <NavLink
                  className="text-gray-500 px-3   w-fit rounded-xl duration-200 block text-md"
                  to={"WishList"}
                >
                  WishList
                </NavLink>
                <li></li>
                <NavLink
                  className="text-gray-500 px-3   w-fit rounded-xl duration-200 block text-md"
                  to={"Categories"}
                >
                  Categories
                </NavLink>
                <li></li>
                <NavLink
                  className="text-gray-500 px-3   w-fit rounded-xl duration-200 block text-md"
                  to={"products"}
                >
                  Products
                </NavLink>
                <li></li>
                <NavLink
                  className="text-gray-500 px-3   w-fit rounded-xl duration-200 block text-md"
                  to={"Brands"}
                >
                  Brands
                </NavLink>
              </ul>
            ) : null}
          </div>
         
          <ul className="flex gap-3 items-baseline mt-2">
            {token ? (
              <li className="flex justify-start items-baseline space-x-2">
               
                <i className="fa-solid fa-cart-shopping fa-xl relative text-[#3e4047]">
                  <span className="absolute top-[-22px] start-3 bg-green-500 text-black text-xs font-medium me-2 px-1.5 py-0.5 rounded-md dark:bg-green-900 dark:text-green-300">
                    {NumOfCartItems}
                  </span>
                </i>
                <button
                  className="text-gray-500 pb-1 py-1  w-fit  duration-200 block text-md cursor-pointer"
                  onClick={login}
                >
                  Log out
                </button>
              </li>
            ) : (
              <>
                {" "}
                <li>
                  <NavLink
                    className="text-gray-500  py-1  w-fit  duration-200 block text-md"
                    to={"Login"}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="text-gray-500  py-1  w-fit  duration-200 block text-md"
                    to={"Register"}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}


  /* <nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>


<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block py-2 px-3 text-white bg-green-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  </div>
</nav> */

