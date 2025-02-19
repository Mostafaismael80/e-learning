import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../Context/AuthContextProvider";
import { Helmet } from "react-helmet";

export default function Login() {
  const [ErrorMessage, setErrorMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let {settoken} =useContext(authContext)
  let navigate = useNavigate();

  function handleLogin(values) {
    setisLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
      navigate("/home")
        console.log(res);
        window.localStorage.setItem("token",res.data.token)
        window.settoken(res.data.token)

        setisLoading(false)
      })
      .catch((error) => {
        console.log(error?.response);
        setErrorMessage(error.response.data.message);
        setisLoading(false)
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  let validationSchema = yup.object().shape({
 
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup
      .string()
      .matches(
        /^[A-Za-z]\w{6,8}$/,
        "password start with letter and min 6 har mix 8"
      )
      .required("password is required"),
    
  });

  let formikLogin = useFormik({
    initialValues: {
     
      email: "",
      password: "",
      
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
    <Helmet>
      <title>Login page</title>
    </Helmet>
      <form className="w-1/2 mx-auto" onSubmit={formikLogin.handleSubmit}>
        {ErrorMessage ? (
          <div
            class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {ErrorMessage}
          </div>
        ) : null}
        <h2 className="text-3xl mb-3">login :</h2>
     
        <div>
          <label
            htmlFor="Email"
            className="block  text-sm font-medium text-gray-900 dark:text-white mb-3"
          >
            Email
          </label>
          <input
            name="email"
            value={formikLogin.values.email}
            onBlur={formikLogin.handleBlur}
            onChange={formikLogin.handleChange}
            type="email"
            id="Email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
          />
        </div>
        {formikLogin.errors.email && formikLogin.touched.email? (
          <div
            class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formikLogin.errors.email}
          </div>
        ) : null}
        <div>
          <label
            htmlFor="Password"
            className="block  text-sm font-medium text-gray-900 dark:text-white mb-3"
          >
            Password
          </label>
          <input
            name="password"
            value={formikLogin.values.password}
            onBlur={formikLogin.handleBlur}
            onChange={formikLogin.handleChange}
            type="password"
            id="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
          />
        </div>
        {formikLogin.errors.password && formikLogin.touched.password ? (
          <div
            class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formikLogin.errors.password}
          </div>
        ) : null}
      
        
    <div className="flex justify-between items-baseline">
    <button
        disabled={isLoading?true:false}
          type="submit"
          className=" bg-green-500 p-2 rounded-md text-slate-200 mt-3 hover:bg-green-700 duration-200"
        >
          {isLoading?
           <ColorRing
           visible={true}
           height="30"
           width="55"
           ariaLabel="color-ring-loading"
           wrapperStyle={{}}
           wrapperClass="color-ring-wrapper"
           colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
           />
            : "Login"}
        </button>

        <Link to={"/ForgetPassword"} className="hover:text-green-600">forget your password ?</Link>
    </div>
      </form>
    </>
  );
}

