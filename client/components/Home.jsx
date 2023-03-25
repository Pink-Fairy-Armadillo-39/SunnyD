import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import BigButton from './BigButton.jsx'
import WeatherDisplay from './WeatherDisplay.jsx'

function Home(){
    const location  = useLocation()
    // const {zipcodeEntry} = location.state.zipcodeEntry;
    console.log(location)
    console.log(location.state)
    //console.log("State in home page", props.info)

    const [temp, updateTemp] = useState(0);
    const [uv, updateUv] = useState(0);
    const [condition, updateCondition] = useState('');
    // const [zipcodeEntry, zipcodeUpdate] = useState(location.info.zipcodeEntry);
    // const [nameEntry, nameUpdate] = useState(location.info.nameEntry)

    useEffect(() => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=3b98cf2d582f413d83c172329232503&q=${location.state.zipcodeEntry}`)
            .then(res => res.json())
            .then(res => {
                updateTemp(res.current.temp_f);
                updateUv(res.current.uv);
                updateCondition(res.current.condition.text)
            })
            .catch((err) => {console.log('Error in weather api call: ', err)})
    })

    console.log(temp, uv, condition)
    // const { zipcode } = location.state;
    // console.log(zipcode) 
    return (
        <div>
            <h1>HELLO {nameEntry}!</h1>
            <WeatherDisplay zipcodeEntry = {zipcodeEntry} temp={temp} uv={uv} condition={condition}/>
            <BigButton username = {nameEntry} uv={uv}/>
        </div>
    )
}

// http://api.weatherapi.com/v1/current.json?key=3b98cf2d582f413d83c172329232503&q=

export default Home; 



// {
//     "location": {
//         "name": "Seoul",
//         "region": "",
//         "country": "South Korea",
//         "lat": 37.57,
//         "lon": 127.0,
//         "tz_id": "Asia/Seoul",
//         "localtime_epoch": 1679766164,
//         "localtime": "2023-03-26 2:42"
//     },
//     "current": {
//         "last_updated_epoch": 1679765400,
//         "last_updated": "2023-03-26 02:30",
//         "temp_c": 10.0,
//         "temp_f": 50.0,
//         "is_day": 0,
//         "condition": {
//             "text": "Partly cloudy",
//             "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
//             "code": 1003
//         },
//         "wind_mph": 2.2,
//         "wind_kph": 3.6,
//         "wind_degree": 320,
//         "wind_dir": "NW",
//         "pressure_mb": 1017.0,
//         "pressure_in": 30.04,
//         "precip_mm": 0.0,
//         "precip_in": 0.0,
//         "humidity": 50,
//         "cloud": 75,
//         "feelslike_c": 8.9,
//         "feelslike_f": 48.0,
//         "vis_km": 10.0,
//         "vis_miles": 6.0,
//         "uv": 1.0,
//         "gust_mph": 7.2,
//         "gust_kph": 11.5
//     }
// }