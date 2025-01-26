import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather'
})

async function getWeather (city) {
    try{
        const response = await axiosInstance.get(`?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}

export default getWeather
