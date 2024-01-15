import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import imgDay from './assets/day.svg'
import axios from 'axios'
import './App.css'

function App() {

  const weather = 'https://www.meteosource.com/api/v1/free/point?place_id=rio-cuarto&sections=current&language=en&units=metric&key=x8ckzortw8q1zliipgfqfolmsupk8i2i23j41m4o'

  const [data, setData] = useState({})

  useEffect(() => {
    checkData()
    })

  const checkData = () => {
    axios.get(weather).then((response => {
      setData(response.data)
    } ))
  };

  return (
    <>
    <div className="imagen">
      <img src={imgDay} alt="imagen_weather" />
    </div>

    <div className="container">
      { data.current ? <p className="temp">{ data.current.temperature.toFixed()} °C</p> : null }
      <p className="ciudad">Rio Cuarto</p>
    </div>

    <div className="sub-container">
      <div className="box">
        <p className='value'>35 °C</p>
        <p className='text'>Sensacion termica</p>
      </div>

      <div className="box">
        <p className='value'>60%</p>
        <p className='text'>Humedad</p>
      </div>

      <div className="box">
        { data.current ? <p className="value">{ data.current.wind.speed} m/s</p> : null }
        <p className='text'>Viento</p>
      </div>
    </div>

    <div className="consultar">
      <button onClick={ checkData }>Consultar</button>
    </div>

    <section className='created'>
      <h3>Creado por Sebastian Orellana</h3>
    </section>
    </>
  )
}

export default App
