import { useEffect, useState } from "react";
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

      <div className="countriesGrid">
        {filtered.length > 0 ? (
          filtered.map((country) => (
            <div key={country.common} className="countryCard">
              <img
                src={country.png}
                className="countryFlag"
                alt={`Flag of ${country.common}`}
              />

              <p>{country.common}</p>
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
