import React, { useEffect } from "react";
import { ListTypes } from "constants";
import { AllConcurrentGetApiList } from "Services/Service";
import AnimeSlider from "Shared/Components/slider";
import FilterComponent from "Shared/Components/filter";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataToStore,
  setFilteredDataToStore,
  setSearchListToStore,
} from "Slices/home/animeDataSlice";
import { Spin } from "antd";

function Home() {
  const dispatch = useDispatch();
  const animeStateData = useSelector((state) => state.animeData.filteredData);

  const SectionsCompiler = () => {
    const compliedSectionsByTypes = Object.keys(animeStateData).map(
      (type, i) => {
        return (
          <AnimeSlider
            data={animeStateData[type]}
            key={Date.now() + i}
            type={type}
          />
        );
      }
    );
    return compliedSectionsByTypes;
  };

  useEffect(() => {
    (async () => {
      const CombinedAnimeList = await Promise.all(AllConcurrentGetApiList);
      if (CombinedAnimeList) {
        let heapMapOfListByType = CombinedAnimeList.reduce(
          (currentVal, next, i) => {
            currentVal[ListTypes[i]] = next.data;
            return currentVal;
          },
          {}
        );
        let searchList = [];
        CombinedAnimeList.map((i) => {
          let currList = i.data.data;
          searchList = [...searchList, ...currList];
          return null;
        });
        localStorage.setItem("AllAnimeList", JSON.stringify(searchList));
        dispatch(setSearchListToStore(searchList));
        dispatch(
          setFilteredDataToStore({
            opnType: "filter",
            data: heapMapOfListByType,
          })
        );
        dispatch(setDataToStore(heapMapOfListByType));
      }
    })();
  }, [dispatch]);

  return (
    <>
      <FilterComponent />
      {animeStateData && Object.keys(animeStateData).length !== 0 ? (
        SectionsCompiler()
      ) : (
        <Spin></Spin>
      )}
    </>
  );
}
export default Home;
