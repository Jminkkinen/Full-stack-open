import { useState, useEffect } from 'react'
import axios from 'axios'

const allcountries = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const Filter = (props) => {
  return(
      <div>
      find countries: <input 
        value={props.filterCountry}
        onChange={props.handleFilterChange}
      />
      </div>
  )
}

const Countryinfo = ({country}) => {
  const languages = Object.values(country.languages)
  const flag = country.flags.png
  return(
    <div>
      <h2>{country.name.common}</h2>
      <div>{country.capital}</div>
      <div>Area {country.area}</div>
      <p><b>languages</b></p>
      {languages.map(language => <div>&bull; {language}</div>)}
      <p><img src={flag}/></p>
    </div>
  )
}

const Country = ({country, setFilterCountry}) => {

  return(
      <div>{country.name.common} <button onClick={() => setFilterCountry(country.name.common)}>show</button></div>
  )
}

const Countries = ({countriesToShow, countries, setCountries, setFilterCountry}) => {
  console.log(countriesToShow.length)
  if (countriesToShow.length < 2) {
    return(
      countriesToShow.map((country) => <Countryinfo key={country.name.common} country={country} />
      )
    )
  }
  else if(countriesToShow.length < 11) {
    return(
      countriesToShow.map((country) => <Country key={country.name.common} country={country} setFilterCountry={setFilterCountry} />
      )
    )
  }
  else {
    return("Too many matches, specify another filter")
  }
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filterCountry, setFilterCountry] = useState('')

  useEffect(() => {
    axios
      .get(allcountries)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterCountry(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()))

  return (
    <div>
      <Filter filterCountry={filterCountry} handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} countries={countries} setCountries={setCountries} setFilterCountry={setFilterCountry}/>
    </div>
  )
}

export default App;
