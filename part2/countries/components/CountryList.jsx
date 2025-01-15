const CountryList = ({countries}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (countries.length > 1 && countries.length <= 10) {
    return (
      countries.map((c) => <Country key={c.name.common} name={c.name.common} />)
    )
  }
  if (countries.length === 1) {
    return (
      <CountryData country={countries[0]} />
    )
  }
}

const Country = ({name}) => {
  return (
    <div>
      {name} <button onClick={() => console.log('show data for country')}>show</button>
    </div>
  )
}

const CountryData = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <h3>Languages:</h3>
      <LanguageList languages={country.languages} />
      <img src={country.flags.svg} width={250} height={250} alt="Image of flag" />
    </div>
  )
}

const LanguageList = ({languages}) => {
  return (
    <div>
      {Object.entries(languages).map(([code, name]) => (
        <div key={code}>{name}</div>
      ))}
      <br></br>
    </div>
  );
};



export default CountryList


