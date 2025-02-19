import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../Context/AuthContextProvider";
import { useContext } from "react";
import { Helmet } from "react-helmet";

export default function Register() {
  const [ErrorMessage, setErrorMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let {settoken} = useContext(authContext)
  let navigate = useNavigate();

  function handleRegister(values) {
    setisLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        navigate("/Login")
        console.log(res);
        localStorage.setItem("token",res.data.token)
        settoken(res.data.token)
        setisLoading(false)
      })
      .catch((error) => {
        console.log(error.response);
        setErrorMessage(error.response.data.message);
        setisLoading(false)
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "name is least 3 letters")
      .max(10, "name is max 10 letters")
      .required("name is required"),
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup
      .string()
      .matches(
        /^[A-Za-z]\w{6,8}$/,
        "password start with letter and min 6 har mix 8"
      )
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "password and repassword not match")
      .required("repassword is required"),
    phone: yup
      .string()
      .matches(/^01[1250]\d{8}$/, "phone must be egyption phone number")
      .required("phone is required"),
  });

  let formikRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
    <Helmet>
      <title>Register page</title>
    </Helmet>
      <form className="w-1/2 mx-auto" onSubmit={formikRegister.handleSubmit}>
        {ErrorMessage ? (
          <div
            className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {ErrorMessage}
          </div>
        ) : null}
        <h2 className="text-3xl mb-3">Register :</h2>
        <div>
          <label
            htmlFor="Name"
            className="block  text-sm font-medium text-gray-900 dark:text-white mb-3"
          >
            Name
          </label>
          <input
            name="name"
            value={formikRegister.values.name}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            type="text"
            id="Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
          />
        </div>
        {formikRegister.errors.name && formikRegister.touched.name ? (
          <div
            class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formikRegister.errors.name}
          </div>
        ) : null}
        <div>
          <label
            htmlFor="Email"
            className="block  text-sm font-medium text-gray-900 dark:text-white mb-3"
          >
            Email
          </label>
          <input
            name="email"
            value={formikRegister.values.email}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            type="email"
            id="Email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
          />
        </div>
        {formikRegister.errors.email && formikRegister.touched.email? (
          <div
            class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formikRegister.errors.email}
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
            value={formikRegister.values.password}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            type="password"
            id="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
          />
        </div>
        {formikRegister.errors.password && formikRegister.touched.password ? (
          <div
            class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formikRegister.errors.password}
          </div>
        ) : null}
        <div>
          <label
            htmlFor="Repassword"
            className="block  text-sm font-medium text-gray-900 dark:text-white mb-3"
          >
            Repassword
          </label>
          <input
            name="rePassword"
            value={formikRegister.values.rePassword}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            type="password"
            id="Repassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
          />
        </div>
        {formikRegister.errors.rePassword && formikRegister.touched.rePassword? (
          <div
            class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formikRegister.errors.rePassword}
          </div>
        ) : null}
        <div>
          <label
            htmlFor="Phone"
            className="block  text-sm font-medium text-gray-900 dark:text-white mb-3"
          >
            Phone
          </label>
          <input
            name="phone"
            value={formikRegister.values.phone}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            type="tel"
            id="Phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
          />
        </div>
        {formikRegister.errors.phone && formikRegister.touched.phone? (
          <div
            class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formikRegister.errors.phone}
          </div>
        ) : null}
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
            : "Register"}
        </button>
      </form>
    </>
  );
}
