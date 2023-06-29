import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { optionType } from "./types";

function App(): JSX.Element {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);

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
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${
          city.lon
        }&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      )
      .then((response) => console.log(response));
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

  return (
    <main className="flex justify-center items-center h-[100vh] w-full bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter below a place you would like to know the weather of
        </p>
        <div className="relative flex mt-10 md:mt-4">
          <input
            type="text"
            value={term}
            className="px-2 py-1 rounded-l-md border-2 border-white"
            onChange={handleInputChange}
          />
          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + "-" + index}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
