import { useState } from 'react'
import React from 'react'

import day from './assets/day.svg'
import cloudy from './assets/cloudy.svg'
import cloudyDay from './assets/cloudy-day.svg'
import cloudyNight from './assets/cloudy-night.svg'
import night from './assets/night.svg'
import rainy from './assets/rainy.svg'
import thunder from './assets/thunder.svg'
import errorImg from './assets/error.svg'

import axios from 'axios'
import './App.css'

function App() {

  const [city, setCity] = useState('')
  const [data, setData] = useState({})
  const [errorValue, setErrorValue] = useState({error: 'null'})
  const [name, setName] = useState('')
  const [inputValue, setInputValue] = useState('')

  const weather = `https://www.meteosource.com/api/v1/free/point?place_id=${city}&sections=current&language=en&units=metric&key=x8ckzortw8q1zliipgfqfolmsupk8i2i23j41m4o`

  const checkData = (event) => {
    if (event) {
      axios.get(weather).then((response => {
        setName(inputValue)
        setData(response.data)
        setInputValue('')
      } )).catch((error => {
        setErrorValue(error)
        setData('')
        setInputValue('')
      }))
    }
  }

  const iconSetup = () => {
    if (!data.current.icon_num)
      return (<img src={ errorImg } alt="imagen_error" />) 
    switch (data.current.icon_num) {
      case 7: case 8: case 9:
        return (<img src={ cloudy } alt="imagen_nubes" />)
      case 2: case 3:
        return (<img src={ day } alt="imagen_dia" />)
      case 10: case 11: case 12: case 13:
        return (<img src={ rainy } alt="imagen_lluvia" />)
      case 26: case 27: case 28:
        return (<img src={ night } alt="imagen_noche" />)
      case 14: case 15: case 33:
        return (<img src={ thunder } alt="imagen_tormenta" />)
      case 4: case 5: case 6:
        return (<img src={ cloudyDay } alt="imagen_dia_nublado" />)
      case 29: case 30: case 31:
        return (<img src={ cloudyNight } alt="imagen_noche_nublado" />)
      default:
        null      
    }
  }

  const modifCity = (event) => {
    setCity(event.target.value.replace(/\s+/g, "-").toLowerCase())
    setInputValue(event.target.value)
  }

  return (
    <>

    <div className="header">
      <input className='searchBar' placeholder='Ingrese la ciudad' type='text' value={ inputValue } 
      onChange={ modifCity }></input>
    </div>

    <div className="imagen">
      { data.current ? iconSetup() : null }
    </div>

    <div className="container">
      { data.current ?
      <>
      <p className="temp">{ data.current.temperature.toFixed()} °C</p>
      <p className="ciudad"> { name }</p>
      </> : null }
    </div>

    <div className="sub-container">

      <div className="errorBox">
        { (errorValue.error != null) || data.current ? null :
          <> <img src={ errorImg } className='errorIcon' alt="imagen_error" />
          <p className='errorMsg'>Error! Verifique la información</p> </> }
      </div>

      <div className="infoBox">
        <div className="box">
          { data.current ?
          <> <p className='value'>{data.current.cloud_cover} %</p>
          <p className='text'>Cielo cubierto</p>
          </> : null }
        </div>

        <div className="box">
          { data.current ?
          <>
          <p className="value">{ data.current.wind.speed} m/s</p>
          <p className='text'>Viento</p>
          </> : null }
        </div>
      </div>
    </div>

    <div className="consultar">
      <button onClick= { checkData }>Consultar</button>
    </div>

    <section className='created'>
      <h3>seba-orellana</h3>
    </section>
    </>
  )
}

export default App
