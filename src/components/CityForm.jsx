import { useState } from "react"
import { History } from "../assets/History.jsx"
function CityForm({city, setCity, handleSubmit, showHistory, setShowHistory}) {

    const handleHistory = () => {
        setShowHistory(!showHistory)
    }


    return (
        <form onSubmit={handleSubmit}>
            <button className="btn-history" type="button" onClick={handleHistory}>
                <History />
            </button>
            <input type="text" name={"city"} placeholder="Entrez une ville..." value={city} onChange={(e) => setCity(e.target.value)} />
            <button className="btn-search" type="submit">Rechercher</button>
        </form>
    )
}

export default CityForm