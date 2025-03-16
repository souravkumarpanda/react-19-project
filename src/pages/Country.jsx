import { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/postAPI";
import { Loader } from "../components/UI/Loader";
import { CountryCard } from "../components/Layout/CountryCard";
import { SearchFilter } from "../components/UI/SearchFilter";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState(""); 
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getCountryData();
        if (res && Array.isArray(res.data)) {
          setCountries(res.data);
        } else {
          console.error("Unexpected API response:", res);
          setCountries([]);
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        setCountries([]);
      }
    });
  }, []);
  

  if (isPending) return <Loader />;
  const searchCountry = (country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase());
  };
  
  const filterRegion = (country) => {
    return filter === "all" || country.region.toLowerCase() === filter.toLowerCase();
  };
  // Ensure filtering only runs if `countries` is an array
  const filteredCountries = Array.isArray(countries)
    ? countries.filter((country) => searchCountry(country) && filterRegion(country))
    : [];
  
  return (
    <section className="country-section">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        countries={countries}
        setCountries={setCountries}
      />

<ul className="grid grid-four-cols">
        {filteredCountries.map((curCountry) => (
          <CountryCard 
            country={curCountry} 
            key={curCountry.cca3 || curCountry.name.common} 
          />
        ))}
      </ul>
    </section>
  );
};
