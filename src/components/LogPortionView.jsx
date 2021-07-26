import "../App.scss";
import React, { useState } from "react";
import ShowProductInfo from "./ShowProductInfo";

export default function Search() {
  const [toSearch, setToSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState();

  const handleToSearchChange = (event) => {
    setToSearch(event.target.value);
  };

  const setSelectedFoodHandler = (food) => {
    setSelectedFood(food);
  };

  const fetchResults = (event) => {
    event.preventDefault();
    fetch(`/fineli/api/v1/foods?q=${toSearch}`, {
      "Content-Type": "application/json",
      Accept: "application/json",
    })
      .then((res) => res.json())
      .then((data) => setSearchResults(data));
  };

  return (
    <div>
      <div className="search">
        <div className="leftContainer">
          <form onSubmit={fetchResults}>
            <input
              value={toSearch}
              onChange={handleToSearchChange}
              className="searchInput"
              placeholder="Hae ruokaa..."
            />
            <button type="submit" className="searchButton">
              Hae
            </button>
          </form>
          <ul className="searchResults">
            {searchResults.map((food) => (
              <li
                className="searchResultsItem"
                key={food.id}
                onClick={() => setSelectedFoodHandler(food)}
              >
                {food.name.fi}
              </li>
            ))}
          </ul>
        </div>
        <div className="rightContainer">
          <div>
            {selectedFood && <ShowProductInfo selectedFood={selectedFood} />}
          </div>
        </div>
      </div>
    </div>
  );
}
