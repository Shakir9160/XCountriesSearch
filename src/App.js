import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );

        const data = await response.json();
        setCountries(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(countries);
    } else {
      const results = countries.filter((country) =>
        country.common.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(results);
    }
  }, [search, countries]);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "25px" }}>Loading...</h2>
    );
  }

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchBar"
      />

      <div
        style={{
          gap: "18px",
          marginTop: "25px",
          marginBottom: "25px",
          display: "flex",
          "flex-wrap": "wrap",
          justifyContent: "center",
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((country) => (
            <div
              key={country.common}
              style={{
                gap: "4px",
                height: "auto",
                width: "175px",
                display: "flex",
                "flex-direction": "column",
                "align-items": "center",
                "border-radius": "8px",
                border: "1px solid #E4E4E4",
                "box-shadow": "0 3px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={country.png}
                alt={`Flag of ${country.common}`}
                style={{
                  width: "85px",
                  height: "85px",
                  paddingTop: "12px",
                  borderRadius: "5px",
                }}
              />

              <h3 style={{ paddingLeft: "6px", paddingRight: "6px" }}>
                {country.common}
              </h3>
            </div>
          ))
        ) : (
          <h2>No countries found</h2>
        )}
      </div>
    </div>
  );
}

export default App;
