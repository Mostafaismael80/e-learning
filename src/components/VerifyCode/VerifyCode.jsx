import React from "react";
import { Helmet } from "react-helmet";

export default function VerifyCode() {
  return (
    <div>
        <Helmet>
        <title>VerifyCode page</title>
      </Helmet>
      <form className="container w-2/3">
        <h1 className="mb-8 text-2xl font-semibold ">
          Reset code sent to your email
        </h1>
        
        <input
          name="email"
          type="text"
          id="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
          placeholder="code"
        />
        <button
          type="submit"
          className="py-2 px-5 w-fit mt-5 block text-green-700 border-green-700 border hover:bg-green-700 duration-200  rounded-md bg-white hover:text-white"
        >
          verify
        </button>
      </form>
    </div>
  );
}
//bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
