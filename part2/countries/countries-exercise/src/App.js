import { useState, useEffect } from 'react'
import axios from 'axios'

const Header = ({ text }) => <h2>{text}</h2>
const Text = ({ text, value}) => <p>{text} {value}</p>
const Lang = ({ value }) => <li>{value}</li>
const Img = ({ src }) => <img src={src} alt="Country flag"></img>
const Button = () => {
  return (
    <div>
      <button type='submit'>show</button>
    </div>
  )
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      find countries <input value={value} onChange={onChange}/>
    </div>
  )
}


const Content = ({ country, setCountry }) => {
  if (country.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  } else if ((country.length > 2 && country.length < 10) || country.length === 0) {
    return (
      <ul>
        {country.map((c, i) =>
          <li key={i}> {c.name.common} <button onClick={() => console.log(setCountry([c]))}>show</button></li>
        )}
      </ul>
    )


  } else {
    return (
      <Country country={country}/>
    )
  }
}

const Country = ({ country }) =>  {
  const [weather, setWeather] = useState([])

  const country_capital = country.map(c => c.capital)


  useEffect(() => {
    const params = {
      access_key: process_env.REACT_APP_API_KEY,
      query: country_capital
    }
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country_capital}&appid=${params.access_key}`)
      .then(response => {
        const apiResponse = response.data;
        // console.log(apiResponse)
        // console.log(`Current temperature in ${country_capital} is ${apiResponse.main.temp}℃`);
        setWeather([apiResponse])
      }).catch(error => {
        console.log(error);
      })

  })


  return (
    <div>
      {country.map(c => <Header text={c.name.common}/>)}
      {country.map(c => <Text text='capital' value={c.capital} />)}
      {country.map(c => <Text text='area' value={c.area} />)}
      {country.map(c => <Header Header text='languages:' />)}
      {country.map(c => <ul>{Object.values(c.languages).map(val => <Lang value={val} />)}</ul>)}
      {country.map(c => <Img src={c.flag}/>)}
      <h2>Weather in {country_capital}</h2>
      <p>temperature: {weather.map(w => w.main.temp)}° Celcius</p>
      <img src={weather.map(w => w.weather[0].icon)} alt="Weather icon"></img>
      <p>wind: {weather.map(w => w.main.speed)} mph direction {weather.map(w => w.wind.deg)}</p>
    </div>
  )
}

const App = () => {
  const [country, setCountry] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setCountry(response.data)
    }

    const promise = axios.get(`https://restcountries.com/v3.1/name/${newFilter}`)
      promise.then(eventHandler)
  })

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    const filteredCountry = () => country.filter(c => c.name.common.includes(newFilter))
    setCountry(filteredCountry)
  }


  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Content country={country} setCountry={setCountry} />
    </div>
    
  )
}

export default App