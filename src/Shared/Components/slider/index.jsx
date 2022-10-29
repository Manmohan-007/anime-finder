import React from "react";
import Slider from "react-slick";
import AnimeCard from "Shared/Components/animeCard";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import {
  setDataToStore,
  setFilteredDataToStore,
} from "Slices/home/animeDataSlice";
import {
  getAnimeListByMostWatched,
  getAnimeListByTopAction,
  getAnimeListServiceByPopular,
} from "Services/Service";
export default function AnimeSlider({ data, type: animeType }) {
  const { pagination, data: animeList } = data;
  const dispatch = useDispatch();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
  };
  const category = {
    mostWatched: {
      title: "Most watched anime ",
      api: getAnimeListByMostWatched,
    },
    popular: {
      title: "Most popular anime ",
      api: getAnimeListServiceByPopular,
    },
    topAction: { title: "Top Action anime ", api: getAnimeListByTopAction },
  };

  let slidingSection = animeList?.map((card, i) => {
    return <AnimeCard data={card} key={Date.now() + i} />;
  });
  const onPageChange = async (currPage) => {
    let animeCategory = category[animeType];
    let { data } = await animeCategory.api(currPage, 10);
    let modifiedD = {
      [animeType]: data,
    };
    dispatch(setDataToStore(modifiedD));
    dispatch(
      setFilteredDataToStore({ opnType: "pagination", data: modifiedD })
    );
  };

  return animeList && Object.keys(animeList).length !== 0 ? (
    <div>
      <h2 className="heading text-blue-600">{category[animeType].title}</h2>
      <Slider {...settings}>{slidingSection}</Slider>
      <Pagination
        onChange={onPageChange}
        showSizeChanger={false}
        total={pagination.last_visible_page}
        current={pagination.current_page}
      />
    </div>
  ) : (
    <></>
  );
}
