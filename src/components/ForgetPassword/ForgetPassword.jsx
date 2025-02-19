import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
export default function ForgetPassword() {
  const [ErrorMessage, setErrorMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  let navigate = useNavigate();

  function ForgetPassword(values) {
    setisLoading(true);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then((res) => {
        navigate("/VerifyCode");
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
        setErrorMessage(error.response.data.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("email is invalid").required("email is required"),
  });

  let Forget = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: ForgetPassword,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password page</title>
      </Helmet>
      <form className="w-[80%] mx-auto " onSubmit={Forget.handleSubmit}>
        {ErrorMessage ? (
          <div
            className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {ErrorMessage}
          </div>
        ) : null}
        <h1 className="mb-8 text-2xl font-semibold">Forget Password :</h1>
        <div>
          <label
            htmlFor="Email"
            className="block  text-sm font-medium text-gray-900 dark:text-white mb-3"
          >
            Email
          </label>
          <input
            name="email"
            value={Forget.values.email}
            onBlur={Forget.handleBlur}
            onChange={Forget.handleChange}
            type="email"
            id="Email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Email"
          />
        </div>
        {Forget.errors.email && Forget.touched.email ? (
          <div
            class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {Forget.errors.email}
          </div>
        ) : null}
        <button
          disabled={isLoading ? true : false}
          type="submit"
          className="py-2 px-5 w-fit mt-5 block text-green-700 border-green-700 border hover:bg-green-700 duration-200  rounded-md bg-white hover:text-white"
        >
          {isLoading ? (
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            "verify"
          )}
        </button>
      </form>
    </>
  );
}
