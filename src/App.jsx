import { useEffect, useRef, useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState("5");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const getCities = async () => {
    setSearched(true);
    setLoading(true);
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=${limit}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) {
        getCities();
      } else {
        setSearched(false);
        setData([]);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, limit]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if CTRL/CMD key is pressed and '/' key is pressed
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        // Handle the shortcut action here
        console.log("CTRL/CMD + / pressed");
        // For example, focus the search input
        inputRef.current.focus();
      }
    };

    // Add event listener when component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="app-conatiner">
      <div className="header">
        <div className="wrapper">
          <div className="search-box">
            <input
              value={inputValue}
              ref={inputRef}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              id="searchInput"
              placeholder="Search..."
            />
            <button>CTRL+/</button>
          </div>
        </div>
        <div>
          <label htmlFor="itemsPerPage">Items per page: </label>
          <select
            id="itemsPerPage"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
              console.log(e.target.option);
            }}
          >
            {new Array(10).fill(0).map((value, idx) => (
              <option key={value + idx} value={idx + 1}>
                {idx + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <DataTable data={data} searched={searched} loading={loading} />
      </div>
    </div>
  );
}

export default App;
