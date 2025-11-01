
function HistoryModal({history, handleSubmit, setShowHistory ,setCity}) {

    return (
        <div className="history-modal">
            <h2>Historique des recherches</h2>
            {history.length === 0 && <p>Aucune recherche récente</p>
            }
            <ul>
                {history.map((city, index) => (
                    <li key={index} onClick={ (e) => {
                        setShowHistory(false)
                        handleSubmit(e, city)
                    }
                    }>{city}</li>
                ))}
            </ul>
        </div>
    )
}

export default HistoryModal