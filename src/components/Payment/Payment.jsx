import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../Context/AuthContextProvider";

export default function Payment() {
  const [errorMessage, seterrorMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let { CartIdPay } = useContext(authContext);
  let navigate = useNavigate();

  function onlinePayment(values) {
    let apiOpj = {
        shippingAddress: values,
      };
    setisLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartIdPay}`,
        apiOpj,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params:{
            url:"http://localhost:5173"
          }
        }
      )
      .then((res) => {
        console.log(res);
        window.open(res.data.session.url,"_self")
      })
      .catch((error) => {
        seterrorMessage(error.response.data.message);
        console.log(error);
      })
      .finally(() => {
        setisLoading(false);
      });
  }

//   function handlePayment(values) {
//     let apiOpj = {
//       shippingAddress: values,
//     };
//     setisLoading(true);
//     axios
//       .post(
//         `https://ecommerce.routemisr.com/api/v1/orders/${CartIdPay}`,
//         apiOpj,
//         {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((error) => {
//         seterrorMessage(error.response.data.message);
//         console.log(error);
//       })
//       .finally(() => {
//         setisLoading(false);
//       });
//   }

  let validationSchema = yup.object().shape({
    details: yup
      .string()
      .min(3, "name is least 3 letters")
      .max(10, "name is max 10 letters")
      .required("details is required"),
    city: yup.string().required("city is required"),

    phone: yup
      .string()
      .matches(/^01[1250]\d{8}$/, "phone must be egyption phone number")
      .required("phone is required"),
  });



  let formikPayment = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    validationSchema,
    onSubmit: onlinePayment,
  });

  return (
    <div>
      <form
        onSubmit={formikPayment.handleSubmit}
        className="max-w-4xl mx-auto h-screen"
      >
        {errorMessage ? (
          <div
            className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorMessage}
          </div>
        ) : null}
        <div className="relative z-0 w-full  group mt-10">
          <input
            name="details"
            value={formikPayment.values.details}
            onBlur={formikPayment.handleBlur}
            onChange={formikPayment.handleChange}
            type="text"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            details{" "}
          </label>
        </div>
        {formikPayment.errors.details && formikPayment.touched.details ? (
          <div
            className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formikPayment.errors.details}
          </div>
        ) : null}
        <div className="relative z-0 w-full  group mt-10">
          <input
            value={formikPayment.values.phone}
            onBlur={formikPayment.handleBlur}
            onChange={formikPayment.handleChange}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            phone{" "}
          </label>
        </div>
        {formikPayment.errors.phone && formikPayment.touched.phone ? (
          <div
            class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formikPayment.errors.phone}
          </div>
        ) : null}
        <div className="relative z-0 w-full  group mt-10 pb-20">
          <input
            value={formikPayment.values.city}
            onBlur={formikPayment.handleBlur}
            onChange={formikPayment.handleChange}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            city{" "}
          </label>
        </div>
        {formikPayment.errors.city && formikPayment.touched.city ? (
          <div
            class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formikPayment.errors.city}
          </div>
        ) : null}
        <button
        onClick={()=>{onlinePayment()}}
          type="submit"
          className=" hover:bg-green-500 hover:text-white  border-[1px] border-solid border-green-400 rounded-md w-full py-1 "
        >
          Cash Payment
        </button>
      </form>
    </div>
  );
}
