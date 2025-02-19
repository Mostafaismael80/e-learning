import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

export default function CategorySlider() {
const [categories, setcategories] = useState(null)
async function getCategories(params) {
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
setcategories(data.data)

}
useEffect(() => {
 getCategories()
  }
, [])

    let settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 7,
        slidesToScroll: 1,
      };
  return (
    <>
    <h2 className='text-2xl mb-4'>categories:</h2>
    <Slider {...settings}>
     {categories?.map((category)=> <div key={category._id}>
        <img src={category.image} alt={category.title} className='object-cover w-full h-[200px]'></img>
      </div>) }
     
    </Slider>
    </>
  )
}

