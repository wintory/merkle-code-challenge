import { useState } from "react"
import useGetSymbol from '../hooks/useGetSymbol'


const HomePage = ({ symbols }) => {
    const [filteredSymbols, setFilteredSymbols] = useState(symbols)
    const [isOpen, setIsOpen] = useState(false)
    const { data, error, isFetching, sortAlphabeticalSymbols, shffuleSymbols, filterOpenSymbols } = useGetSymbol(symbols)


    if (isFetching) {
        return <p>Loading...</p>
    }

    return (
        <>
            <button onClick={sortAlphabeticalSymbols}>Sort Symbols</button>
            <button onClick={filterOpenSymbols}>Toggle Open Symbols</button>
            <button onClick={shffuleSymbols}>Shuffle Toggle</button>

            {
                data.map(symbol => (
                    <div key={symbol.id}>
                        <p>{symbol.key}</p>
                        <p>{symbol.id}</p>
                        <p>{symbol.status}</p>
                    </div>
                ))
            }
            {/* <SymbolList symbols={filteredSymbols} /> */}
        </>
    )
}

export default HomePage