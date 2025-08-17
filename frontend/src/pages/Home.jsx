
import React from "react";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";

const Home = () => {
  const { pins, loading } = PinData();
  return (
    <div className="bg-white">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-screen-2xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-6 gap-3 m-4">
              {pins && pins.length > 0 ? (
                pins.map((e, i) => (
                  <div key={i} className="mb-2 break-inside-avoid">
                    <PinCard pin={e} />
                  </div>
                ))
              ) : (
                <p>No Pins Yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
