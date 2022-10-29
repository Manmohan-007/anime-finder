import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
export default function Detail() {
  const params = useParams();
  let { id } = params;
  const [card, setCard] = useState({});

  let searchList = JSON.parse(localStorage.getItem("AllAnimeList"));
  const animeCard = searchList.filter((i) => i.mal_id.toString() === id);
  useEffect(() => {
    setCard(animeCard[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex items-center p-10 w-full h-full bg-white">
      {card && Object.keys(card).length ? (
        <div className="border-t border-b pt-16 grid grid-cols-2 gap-1">
          <div
            className="flex flex-col justify-start"
            style={{ width: "80%", height: "400px" }}
          >
            <div className="flex flex-col w-full object-cover h-5/6 justify-items-start border rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={card.images.jpg.large_image_url}
                alt={card.title_english}
              />
            </div>
          </div>

          <div
            className="flex flex-col overflow-auto "
            style={{ height: "400px" }}
          >
            <div className="flex flex-col gap-4">
              <h1 className="capitalize text-4xl font-extrabold">
                {card.title_english}
              </h1>
              <h2 className="text-3xl">{card.rating}</h2>
              <p className="text-lg text-gray-500	">{card.synopsis}</p>
            </div>
          </div>
        </div>
      ) : (
        <Spin style={{ marginLeft: "45%" }} />
      )}
    </main>
  );
}
