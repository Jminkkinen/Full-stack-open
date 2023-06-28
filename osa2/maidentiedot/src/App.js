import { useState, useEffect } from 'react'
import axios from 'axios'

const allcountries = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const Filter = (props) => {
  return(
      <div>
      filter shown with: <input 
        value={props.filterCountry}
        onChange={props.handleFilterChange}
      />
      </div>
  )
}

const Country = ({country}) => {

  return(
      <div>{country} </div>
  )
}

const Countries = ({countriesToShow, countries, setCountries}) => {
  return(
    countriesToShow.map((country) => <Country key={country.name.common} country={country.name.common} />
    )
  )
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
      <Countries countriesToShow={countriesToShow} countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App;
