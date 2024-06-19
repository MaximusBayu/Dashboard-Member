"use client";

import React, { useEffect, useState } from "react";

const Member = () => {
  const [memberCount, setMemberCount] = useState(0);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/get`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.response)) {
          setMemberCount(data.response.length);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the member data!", error);
      });
  }, []);

  return (
    <div className="bg-white shadow-xl w-64 h-48 text-black rounded-xl flex flex-col items-center pt-4 mt-3">
      <h1 className="font-bold">Jumlah Member Humic</h1>
      <p className="pt-4 font-thin">
        <span className="text-7xl mr-2 font-normal">{memberCount}</span>member
      </p>
    </div>
  );
};
export default Member;
