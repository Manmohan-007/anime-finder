import React from "react";
import { useNavigate } from "react-router-dom";
export default function AnimeCard({ data }) {
  const { title, images, rating } = data;
  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate(`/details/${data.mal_id}`);
  };
  return (
    <div
      className="w-full rounded-lg shadow-md bg-white cursor-pointer"
      onClick={navigateToDetail}
    >
      <img
        className="object-cover w-full h-48 rounded-lg"
        src={images.jpg.image_url}
        alt={title}
      />
      <div className="p-4" style={{ height: "120px" }}>
        <h4 className="text-lg font-semibold tracking-tight text-blue-600">
          {title}
        </h4>
        <p className="mb-2 leading-normal">Rating : {rating}</p>
      </div>
    </div>
  );
}
