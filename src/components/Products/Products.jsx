import React from "react";
import DisplayProducts from "../DisplayProducts/DisplayProducts";
import { Helmet } from "react-helmet";
// import { useState } from 'react'


export default function Products() {
  // const [first, setfirst] = useState(second)

  return (
    <>
    <Helmet>
      <title>Products page</title>
    </Helmet>
      <DisplayProducts></DisplayProducts>
    </>
  );
}
