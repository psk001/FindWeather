import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (inputValue) => {
    const url = `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`;

    try {
      const response = await fetch(url, geoApiOptions);
      const result = await response.json();

      const options = result.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      });

      const returnData= {
        options
      }

      console.log(returnData, typeof options)
      return returnData;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounce={3000}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
