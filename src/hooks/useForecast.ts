import { useState, useEffect, ChangeEvent } from "react";
import { optionType, forecastType } from "../types";
import axios from "axios";

const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  // fetch city names
  const getSearchOptions = async (value: string) => {
    await axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((response) => setOptions(response.data));
  };

  // handle changing value of input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === "") return;
    getSearchOptions(value);
  };

  // fetch weather forecast
  const getForecast = (city: optionType) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${
          city.lon
        }&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      )
      .then((response) => {
        const responseData = response.data;
        const forecastData = {
          ...responseData.city,
          list: responseData.list.slice(0, 16),
        };
        setForecast(forecastData);
      });
  };

  // handle clicked city option
  const handleOptionSelect = (option: optionType) => {
    setCity(option);
  };

  // search button onclick
  const handleSubmit = () => {
    if (!city) return;
    getForecast(city);
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    term,
    options,
    forecast,
    handleInputChange,
    handleOptionSelect,
    handleSubmit,
  };
};

export default useForecast;
