import "./App.css";
import Search from "./components/Search";
import useForecast from "./hooks/useForecast";

function App(): JSX.Element {
  const {
    term,
    options,
    forecast,
    handleInputChange,
    handleOptionSelect,
    handleSubmit,
  } = useForecast();

  return (
    <main className="flex justify-center items-center h-[100vh] w-full bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400">
      {forecast ? (
        "This is the forecast"
      ) : (
        <Search
          term={term}
          options={options}
          handleInputChange={handleInputChange}
          handleOptionSelect={handleOptionSelect}
          handleSubmit={handleSubmit}
        />
      )}
    </main>
  );
}

export default App;
