const CountryList = ({countries, selectedCountry, weatherData, weatherIcon, showCountryData}) => {
  if (selectedCountry) {
    return <CountryData country={selectedCountry} weatherData={weatherData} weatherIcon={weatherIcon} />
  }
  if (countries.length === 1) {
    return <CountryData country={countries[0]} weatherData={weatherData} weatherIcon={weatherIcon} />
  }
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (countries.length > 1 && countries.length <= 10) {
    return countries.map((c) => <Country key={c.name.common} name={c.name.common} showCountryData={() => showCountryData(c.name.common)} />)
  }
}

const Country = ({name, showCountryData}) => <div>{name} <button onClick={showCountryData}>show</button></div>

const CountryData = ({country, weatherData, weatherIcon}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h3>Languages:</h3>
      <LanguageList languages={country.languages} />
      <img src={country.flags.svg} width={250} height={250} alt="Image of flag" />
      <CapitalWeather weatherData={weatherData} weatherIcon={weatherIcon} />
    </div>
  )
}

const LanguageList = ({languages}) => {
  return (
    <ul>
      {Object.entries(languages).map(([code, name]) => (
        <li key={code}>{name}</li>
      ))}
      <br></br>
    </ul>
  );
};

const CapitalWeather = ({weatherData, weatherIcon}) => {
  if (weatherData) {
    return (
      <div>
        <h3>Weather in {weatherData.name}</h3>
        <div>Temperature {weatherData.main.temp} Celcius</div>
        <img src={weatherIcon} alt="Weather icon"></img>
        <div>Wind {weatherData.wind.speed} m/s</div>
      </div>
    )
  }
}

export default CountryList


