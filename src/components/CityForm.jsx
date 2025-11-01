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
            <input
                type="search"
                name={"city"}
                placeholder="Entrez une ville..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                enterKeyHint={"search"}
            />
            <button className="btn-search" type="submit">Rechercher</button>
            <p className="mobile-hint">Appuyez sur Rechercher ou 🔎</p>
        </form>
    )
}

export default CityForm