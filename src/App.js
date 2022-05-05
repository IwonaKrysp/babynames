import React, { useState } from "react";
import "./css/App.css";
import namesData from "./data/namesData.json";

function App(props) {
  const [searchTerm, setSearchTearm] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [filter, setFilter] = useState("all");

  function addFavourite(nameObject) {
    if (!favourites.includes(nameObject)) {
      setFavourites(favourites.concat(nameObject));
    }
  }

  function removeFavourite(nameObject) {
    setFavourites(favourites.filter((obj) => obj !== nameObject));
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          className="App-input"
          type="text"
          placeholder="|"
          value={searchTerm}
          onChange={(event) => setSearchTearm(event.target.value)}
        />
        <button className="App-btn-all" onClick={() => setFilter("all")}>
          all
        </button>
        <button className="App-btn-f" onClick={() => setFilter("f")}>
          female
        </button>
        <button className="App-btn-m" onClick={() => setFilter("m")}>
          male
        </button>
      </header>
      <main className="App-main">
        <div className="App-main-names">
          <p className="App-main-names-title">Names</p>

          <div></div>

          {namesData
            .sort((a, z) => a.name.localeCompare(z.name))
            .filter((nameObject) => {
              const { name } = nameObject;
              return name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .filter(
              (nameObject) => filter === "all" || filter === nameObject.sex
            )
            .map((nameObject) => {
              const { id, name, sex } = nameObject;
              console.log(id);
              const isBoy = sex === "m";
              return (
                <div
                  style={{
                    color: isBoy ? "royalblue" : "pink",
                    padding: "5px",
                  }}
                >
                  {name}

                  <span>
                    <button
                      className="App-btn-star"
                      onClick={() => addFavourite(nameObject)}
                    >
                      ⭐
                    </button>
                  </span>
                </div>
              );
            })}
        </div>
        <div className="App-main-names">
          <p className="App-main-names-title">Favourites</p>
          {favourites
            .sort((a, z) => a.name.localeCompare(z.name))
            .filter((nameObject) => {
              const { name } = nameObject;
              return name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .filter(
              (nameObject) => filter === "all" || filter === nameObject.sex
            )
            .map((nameObject) => {
              const { id, name, sex } = nameObject;
              console.log(id);
              const isBoy = sex === "m";
              return (
                <div
                  style={{
                    color: isBoy ? "royalblue" : "pink",
                    padding: "5px",
                  }}
                >
                  {name}
                  <button
                    className="App-btn-remove"
                    onClick={() => removeFavourite(nameObject)}
                  >
                    ➖
                  </button>
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
}

export default App;
