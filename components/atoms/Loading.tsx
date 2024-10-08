import React from "react";
import Image from "next/image";
import LoadingImage from "../../public/loading.png";

export default function Loading() {
  return (
    <div className="relative mx-auto mt-10 flex animate-spin h-28 w-28">
      <Image src={LoadingImage} alt="loading" />
    </div>
  );
}
