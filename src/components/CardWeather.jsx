import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

const CardWeather = ({ lat, lon }) => {
  const [weather, setWeather] = useState();
  const [temperture, setTemperture] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /*     Solo ejecuta la peticion asincrona si "lat o lon" tiende false 
En el primer renderizado
 */
    if (lat) {
      const APIkey = "d0cbaf52c0bade8960d60562c97af6f5";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const temp = {
            celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
            farenheit: `${Math.round(
              ((res.data.main.temp - 273.15) * 9) / 5 + 32
            )} °F`,
          };
          setTemperture(temp);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }
    /* CADA vez que lat y lon cambien se ejecute el useEffect "porque con el arreglo vacio solo se ejecute una vez." */
  }, [lat, lon]);
  console.log(weather);
  /*{weather & weather.weather[0].icon}@2x.png`}  */

  const handleClick = () => {
    setIsCelsius(!isCelsius);
  };

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <article>
        <h1>Weather App</h1>
        <h2>{`${weather?.timezone}`}</h2>
        <div className="card__container">
          <img
            src={
              weather &&
              `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`
            }
            alt=""
          />
          <div>
            <h3>&#34;{weather?.weather[0].description}&#34;</h3>
            <ul>
              <li>
                <span>Win Speed: </span>
                {weather?.wind.speed} m/s
              </li>
              <li>
                <span>Clouds: </span>
                {weather?.clouds.all}%
              </li>
              <li>
                <span>Pressure: </span> {weather?.main.pressure} hPa
              </li>
            </ul>
          </div>
        </div>

        <div className="card__container2">
          <h2>{isCelsius ? temperture?.celsius : temperture?.farenheit}</h2>
          <button className="card__btn" onClick={handleClick}>
            {isCelsius ? "Change to °F" : "Change to °C"}
          </button>
        </div>
      </article>
    );
  }
};

/* pendiente: como hizopantalla de carga y colocar clase para dependiendo del clima cambie */
export default CardWeather;
