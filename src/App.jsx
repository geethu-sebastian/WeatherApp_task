import React,{useState} from "react"
import axios from "axios"


function App() {
  const apiKey = "54974cc4c78258b63fc6f2e5819ff000"

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
 
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}
  `
  
 const searchLocation = (event) => {
  if (event.key === 'Enter') {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    setLocation('')
  }
}
  return (
    <div className="flex w-screen h-screen bg-white items-center justify-center">
      <div className="flex flex-col w-[80%] h-[80%] bg-blue-200 rounded-xl items-center md:py-4 bg-[url('/sky.svg')]">
        
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text" 
          className="h-[10%] w-[40%] px-4 rounded-3xl py-2 outline-0"
          />
          <div className="flex flex-col w-full h-[70%] items-center justify-center">
            <p className="font-bold text-3xl py-2">{data.name}</p>
            {data.main ? <h1 className="py-2">{data.main.temp.toFixed()}°F</h1> : null}
            {data.weather ? <p className="py-2">{data.weather[0].main}</p> : null}
          </div>
          {data.name !== undefined &&
          <div className="flex flex-row w-[90%] justify-between items-center">
              <div className="flex flex-col h-full items-center px-2">
                  {data.main ? <p className="py-2 font-bold">{data.main.feels_like.toFixed()}°F</p> : null}
                  <p className="py-2">Feels like</p>
              </div>
              <div className="flex flex-col h-full items-center px-2">
                   {data.main ? <p className="py-2 font-bold">{data.main.humidity}%</p> : null}
                  <p className="py-2">Humidity</p>
              </div>
              <div className="flex flex-col h-full items-center px-2">
                  {data.wind ? <p className="py-2 font-bold">{data.wind.speed.toFixed()} MPH</p> : null}
                  <p className="py-2">Winds</p>
              </div>

          </div>
          }
        <div>

        </div>
          
      </div>
    </div>
  )
}

export default App
