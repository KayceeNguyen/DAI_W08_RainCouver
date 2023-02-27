import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RainingBackground from '@/comps/rainingBackground';


export default function Home() {

  const apiKey = '0cf4421869ef8a597d991ff7e85c1839';
  const location = "vancouver";
  const units = "metric";

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`;

  const [data, setData] = useState();
  const grabWeather = useState(false);
  
  const fetchWeather = async () => {
    const response = await axios.get(url)
    console.log(response);

    console.log(response.data.list);
    const arrayOfDays = [];
    
    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8,2), 10));
      let num = parseInt(weather.dt_txt.substr(8,2), 10);

      if(num !== arrayOfDays.find(element => element === num)) {
        arrayOfDays.push(num);
        console.log("Here");
        console.log(response.data.list[index])
        var month = '';
        var icon = '';


        if(weather.dt_txt.substr(5,2) == 1) {
          month = "January"
        } else if(weather.dt_txt.substr(5,2) == 2) {
          month = "February"
        } else if(weather.dt_txt.substr(5,2) == 3) {
          month = "March"
        } else if(weather.dt_txt.substr(5,2) == 4) {
          month = "February"
        } else if(weather.dt_txt.substr(5,2) == 5) {
          month = "May"
        } else if(weather.dt_txt.substr(5,2) == 6) {
          month = "June"
        } else if(weather.dt_txt.substr(5,2) == 7) {
          month = "July"
        } else if(weather.dt_txt.substr(5,2) == 8) {
          month = "August"
        } else if(weather.dt_txt.substr(5,2) == 9) {
          month = "September"
        } else if(weather.dt_txt.substr(5,2) == 10) {
          month = "October"
        } else if(weather.dt_txt.substr(5,2) == 11) {
          month = "November"
        } else if(weather.dt_txt.substr(5,2) == 12) {
          month = "December"
        }

        if(weather.weather[0].main == 'Clouds') {
          icon = '/icons/scattered-clouds.png'
        } else if(weather.weather[0].main == 'Clear') {
          icon = '/icons/clear-sky.png'
        } else if(weather.weather[0].main == 'Atmosphere') {
          icon = '/icons/mist.png'
        } else if(weather.weather[0].main == 'Rain') {
          icon = '/icons/rain.png'
        } else if(weather.weather[0].main == 'Drizzle') {
          icon = '/icons/shower-rain.png'
        } else if(weather.weather[0].main == 'Snow') {
          icon = '/icons/snow.png'
        } else if(weather.weather[0].main == 'Thunderstorn') {
          icon = '/icons/thunderstorm.png'
        }

        var now = new Date(weather.dt_txt);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        var day = days[now.getDate()];

        return (
          <div key={index} className={styles.weatherItem}>
            <Image 
              src={icon}
              alt={icon}
              width={100}
              height={100}
              priority
            
            />

            <p>
              {day} <br/> {month} {weather.dt_txt.substr(8,2)}, {weather.dt_txt.substr(0,4)}
            </p>

            <div className={styles.weatherTemp}>{weather.main.temp.toFixed(1)}&#8451;</div>
            <div className={styles.weatherDesc}>{weather.weather[0].main}</div>

          </div>
        )
      }
    })

    console.log(arrayOfDays);
    setData(weatherData);  
  }

  useEffect(() => {
    // if(grabWeather.current === true) {
      fetchWeather();
    // }

    // return () => {
    //   grabWeather.current = true;
    // }

  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <>
      <Head>
        <title>Raincover Weather App</title>
        <meta name="description" content="Raincover" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/web-logo.png" />
      </Head>

      <RainingBackground />
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Vancouver, B.C Weather
            <br />
            Last Updates: {date}
          </p>
          
          <div className={styles.portfolio}>
            <a
                  href="https://kayceewin.ca/portfolio/"
                  target="_blank"
                  rel=""
                >
              By{' '} KCWIN</a>
          </div>
          

        </div>

        <div className={styles.logoCont}>
            <Image
              className={styles.logo}
              src="/icons/app-logo.png"
              alt="Logo"
              width={400}
              height={120}
              priority
            />     
          </div>

        <div className={styles.weatherCont}>
            <div className={styles.weather}>{data}</div>
        </div>
        
      </main>
    </>
  )
}
