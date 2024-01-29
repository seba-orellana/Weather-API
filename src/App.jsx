import { useState } from 'react'
import { useEffect } from 'react'
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
        setData(error.code)
      }))
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
      { (data.current) ?
        [2, 3].includes(data.current.icon_num) ? <img src={ day } alt="imagen_dia" /> :
        [7, 8, 9].includes(data.current.icon_num) ? <img src={ cloudy } alt="imagen_nubes" /> : 
        [10, 11, 12, 13].includes(data.current.icon_num) ? <img src={ rainy } alt="imagen_lluvia" /> :
        [26, 27, 28].includes(data.current.icon_num) ? <img src={ night } alt="imagen_noche" /> :
        [14, 15, 33].includes(data.current.icon_num) ? <img src={ thunder } alt="imagen_tormenta" /> :
        [4, 5, 6].includes(data.current.icon_num) ? <img src={ cloudyDay } alt="imagen_dia_nublado" /> :
        [29, 30, 31].includes(data.current.icon_num) ? <img src={ cloudyNight } alt="imagen_noche_nublado" /> :
        null : null }
    </div>

    <div className="container">
      { data.current ?
      <>
      <p className="temp">{ data.current.temperature.toFixed()} °C</p>
      <p className="ciudad"> { name }</p>
      </> : null }
    </div>

    <div className="sub-container">
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
