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




