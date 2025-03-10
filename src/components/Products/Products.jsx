import React, { useState } from "react";
import DisplayProducts from "../DisplayProducts/DisplayProducts";
import { Helmet } from "react-helmet";
import ReactPlayer from "react-player/youtube";

export default function Products() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <Helmet>
        <title>Products Page</title>
      </Helmet>
      <div className="h-screen grid grid-cols-[1fr_3fr]">
        {/* Sidebar Section */}
        <div className="bg-slate-200">
          <h1 className="text-2xl bg-slate-200 py-6 lg:min-w-[350px] px-5 font-semibold">
            - Math Primary 5 Second Term Explanation Course
          </h1>
          <div className="bg-slate-500 text-white py-4 flex items-baseline px-5 font-semibold justify-between">
            <h3>7 - Adding and Subtracting Fractions</h3>
            <div className="text-xs">0/8</div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label="Toggle Lesson Details"
              className="p-1 rounded-full bg-slate-400 transition-transform duration-300"
            >
              <i
                className={`fa-solid fa-angle-up ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
                style={{ color: "#ffffff" }}
              />
            </button>
          </div>
          {/* Expandable Lesson Details */}
          <div
            className={`overflow-hidden duration-300 text-sm bg-cyan-100 border-y border-gray-400 border-sky-600 border-s-4 px-5 ${
              isExpanded ? "h-[68px] py-4" : "h-0"
            }`}
          >
            <div>1 - Finding Like Denominators using LCM (Part 1)</div>
            <div className="flex items-baseline">
              <i
                className="fa-regular fa-circle-play pt-1 pe-4"
                style={{ color: "#FFD43B" }}
              />
              <h4 className="text-gray-500 text-xs">Video Lesson</h4>
            </div>
          </div>
        </div>

        {/* Video Player Section */}
        <div className="bg-slate-100 flex flex-col justify-center items-center">
          <ReactPlayer
            url="https://www.youtube-nocookie.com/embed/p_9AXliS6A4"
            className="video-container"
            width="85%"
            height="60%"
            playing={isPlaying}
            controls={true} // Enables YouTube controls
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  showinfo: 0,
                  rel: 0,
                  iv_load_policy: 3,
                  playsinline: 1,
                  origin: window.location.origin,
                  host: "https://www.youtube-nocookie.com",
                  fs: 0,
                  color: "white",
                  loop: 0,
                  cc_load_policy: 0,
                  ecver: 2,
                },
              },
            }}
            playsinline
          />

          {/* Custom Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {isPlaying ? "Pause Video" : "Play Video"}
          </button>
        </div>
      </div>
    </>
  );
}
