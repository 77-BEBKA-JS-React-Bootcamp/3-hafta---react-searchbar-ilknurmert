import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [choosen, setChosen] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("https://randomuser.me/api/?results=1000")
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }

  const searchChangeHandler = (e) => {
    setDropdownOpen(true);
    setSearch(e.target.value);
  };

  const dropdownClickHandler = (item) => {
    setDropdownOpen(false);
    setChosen([...choosen, item]);
  };

  return (
    <div className="App">
      <div className="searchContainer">
        <form className="searchform">
          <input
            type="text"
            className="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => searchChangeHandler(e)}
          />
        </form>
      </div>
      <div className="peopleList">
        {search === "" || !dropdownOpen ? "" : (
          <ul className="suggestions">
            {data.filter((item) =>
                  item.name.first.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  item.name.last.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => (
                <li class="list" key={index}
                  onClick={() => dropdownClickHandler(item)}>
                  <span className="listed">
                    {item.name.first} {item.name.last}
                  </span>
                </li>
              )).slice(0, 5)}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
