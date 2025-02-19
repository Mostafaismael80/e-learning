import React from "react";
import img1 from "../../assets/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg";
import img2 from "../../assets/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg";
import img3 from "../../assets/4183738.jpg";
import img4 from "../../assets/slider4.jpg";
import img5 from "../../assets/rods-supermarket-cart-sled-sliders-260nw-2547620627.jpg";
import Slider from "react-slick";
export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="grid grid-cols-[2fr_1fr] px-6">
      <div className="overflow-hidden ">
        <Slider {...settings} className="my-10">
        <div><img src={img3} className="w-full h-[400px] object-cover"></img></div>
        <div><img src={img4} className="w-full h-[400px] object-cover"></img></div>
        <div><img src={img5} className="w-full h-[400px] object-cover"></img></div>
       
        </Slider>
      </div>
      <div className="my-10">
        <img src={img1} className="w-full h-[200px] object-cover"></img>
        <img src={img2} className="w-full h-[200px] object-cover"></img>
      </div>
    </div>
  );
}
