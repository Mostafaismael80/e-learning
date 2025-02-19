import React from "react";
import DisplayProducts from "../DisplayProducts/DisplayProducts";

import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
// import { useState } from 'react'


export default function Home() {
  // const [first, setfirst] = useState(second)

  return (
    <>
    <Helmet>
      <title>Home page</title>
    </Helmet>
    <MainSlider/>
    <div className="mb-14"><CategorySlider/></div>
   <DisplayProducts/>
    </>
  );
}
