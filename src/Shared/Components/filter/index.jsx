import React, { useState } from "react";
import { Checkbox } from "antd";
import { animeTypeLookUp } from "constants";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredDataToStore } from "Slices/home/animeDataSlice";

const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Most watched", "Most popular", "Top action"];

export default function FilterComponent() {
  const [checkedList, setCheckedList] = useState(plainOptions);
  const filteredStoreData = useSelector(
    (state) => state.animeData.filteredData
  );
  const rawAnimeData = useSelector((state) => state.animeData.rawData);
  const [indeterminate, setIndeterminate] = useState({
    genre: true,
    rating: true,
  });
  const [checkAll, setCheckAll] = useState({
    genre: [],
    rating: [],
  });
  const dispatch = useDispatch();

  const filterGenreData = (list, data) => {
    let dataClone = Object.assign({}, data);
    for (const key in dataClone) {
      if (list.indexOf(key) === -1) {
        delete dataClone[key];
      }
    }
    return dataClone;
  };

  const onGenreChange = (list) => {
    let selectedFilters = list.map((i) => animeTypeLookUp[i]);
    let updatedData = { ...rawAnimeData, filteredStoreData };
    let filteredLocalData = filterGenreData(selectedFilters, updatedData);
    let checkAll = list.length === plainOptions.length;
    dispatch(
      setFilteredDataToStore({ opnType: "filter", data: filteredLocalData })
    );
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);

    setCheckAll({ ...checkAll, genre: checkAll });
  };
  const onCheckGenreAllChange = (e) => {
    let isChecked = e.target.checked;
    setCheckedList(isChecked ? plainOptions : []);
    setIndeterminate({ ...indeterminate, genre: false });
    setCheckAll({ ...checkAll, genre: e.target.checked });

    dispatch(
      setFilteredDataToStore({
        opnType: "filter",
        data: isChecked ? rawAnimeData : {},
      })
    );
  };
  return (
    <div>
      <div>
        <h2 className="filterHeading">Filter</h2>
        <div className="filterOptions">
          <Checkbox
            indeterminate={indeterminate.genre}
            onChange={onCheckGenreAllChange}
            checked={checkAll.genre}
          >
            All
          </Checkbox>

          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={onGenreChange}
          />
        </div>
      </div>
    </div>
  );
}
