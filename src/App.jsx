import {useState, useEffect} from 'react'
import './App.css'
import CityForm from "./components/CityForm.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import HistoryModal from "./components/HistoryModal.jsx";

function App() {
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showHistory, setShowHistory] = useState(false)
    const [history, setHistory] = useState(() => {
        const storedHistory = localStorage.getItem('history')
        return storedHistory ? JSON.parse(storedHistory) : []
    })
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

    const handleAddHistory = () => {
        if (history.includes(city)) return
        if (history.length > 5) {
            setHistory([...history.slice(1), city])
        }
        else {
            setHistory([...history, city])
        }
    }
    const handleSubmit = async (e, historySearch = null) => {
        e.preventDefault()
        const searchCity = historySearch || city
        if (!searchCity.trim()) return
        setLoading(true)
        setError('')

        try {
            const cityGeo = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${API_KEY}`)

            if (!cityGeo.ok) {
                throw new Error('Ville non trouvé')
            }
            const cityGeoData = await cityGeo.json()

            if (cityGeoData.length === 0) {
                throw new Error('Ville non trouvée')
            }

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData[0].lat}&lon=${cityGeoData[0].lon}&units=metric&lang=fr&appid=${API_KEY}`)

            if (!response.ok) {
                throw new Error('Ville non trouvé')
            }

            const data = await response.json()
            setWeather(data)
            handleAddHistory()
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setWeather(null)
        } finally {
            setCity('')
        }

    }

    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history))
    }, [history])

    return (
        <div className="App">
            <h1>🌤️ Weather App</h1>
            <CityForm city={city} setCity={setCity} setWeather={setWeather} handleSubmit={handleSubmit}
                      showHistory={showHistory} setShowHistory={setShowHistory} setHistory={setHistory}/>
            {showHistory && <div className="history-overlay" onClick={() => setShowHistory(false)}>
                <HistoryModal history={history} setCity={setCity} setShowHistory={setShowHistory} handleSubmit={handleSubmit}/>
            </div>}
            {loading && <p>Chargement...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {weather &&
                <WeatherCard {...weather} />
            }
        </div>
    )
}

export default App
