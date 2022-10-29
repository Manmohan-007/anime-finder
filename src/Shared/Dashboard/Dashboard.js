import React from "react";
import { ListTypes } from "constants";
import {
  setSearchListToStore,
  setFilteredDataToStore,
  setDataToStore,
} from "Slices/home/animeDataSlice";
import { useDispatch } from "react-redux";
import {
  getAnimeListByMostWatched,
  getAnimeListServiceByPopular,
  getAnimeListByTopAction,
} from "Services/Service";
import { Input } from "antd";
import { Link, useLocation } from "react-router-dom";
const { Search } = Input;
export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const onSearch = async (value) => {
    let CombinedAnimeList = await Promise.all([
      getAnimeListByMostWatched(1, 10, value),
      getAnimeListByTopAction(1, 10, value),
      getAnimeListServiceByPopular(1, 10, value),
    ]);
    if (CombinedAnimeList) {
      let heapMapOfListByType = CombinedAnimeList.reduce(
        (currentVal, next, i) => {
          currentVal[ListTypes[i]] = next.data;
          return currentVal;
        },
        {}
      );
      dispatch(setSearchListToStore(heapMapOfListByType));
      dispatch(
        setFilteredDataToStore({
          opnType: "filter",
          data: heapMapOfListByType,
        })
      );
      dispatch(setDataToStore(heapMapOfListByType));
    }
  };
  let pageName = location.pathname.split("/")[1];

  return (
    <>
      <div className="w-full max-h-screen bg-gray-200 overflow-y-hidden">
        <div className="flex w-full">
          <div className="w-full">
            <nav className="h-16 flex items-center lg:items-stretch justify-end lg:justify-between bg-white shadow relative z-10">
              <div className="hidden lg:flex w-full pr-6">
                <div className="h-full w-64 flex items-center justify-center mr-10">
                  <Link to="/" className="logo" style={{ marginLeft: "60px" }}>
                    Anime Finder
                  </Link>
                </div>
                <div className="w-1/2 h-full hidden lg:flex items-center pl-6 pr-24"></div>
                <div className="w-1/2 hidden lg:flex">
                  <div className="w-full flex items-center pl-8 justify-end">
                    <div className="h-full w-64 flex items-center justify-center mr-10">
                      {!pageName ? (
                        <Search
                          placeholder="search the anime"
                          onSearch={onSearch}
                          enterButton
                          style={{ backgroundColor: "#1890ff !important" }}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <div className="py-10 md:w-full w-screen mx-auto px-6 max-h-screen overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
