import { useState } from "react"
import useGetSymbol from '../hooks/useGetSymbol'


const HomePage = ({ symbols }) => {
    const [filteredSymbols, setFilteredSymbols] = useState(symbols)
    const [isOpen, setIsOpen] = useState(false)
    const {data, error, isFetching} = useGetSymbol(symbols)

    const toggleOpenSymbols = () => {
        setIsOpen(!isOpen)
        setFilteredSymbols(isOpen ? symbols : symbols.filter(symbol => symbol.status === 'open'))
    }

    const sortSymbols = () => {
        setFilteredSymbols([...filteredSymbols].sort((a, b) => a.id.localeCompare(b.id)))
    }

    const shuffleSymbols = () => {
        setFilteredSymbols([...filteredSymbols].sort(() => Math.random() - 0.5))
    }


    return (
        <>
            {/* <SymbolList symbols={filteredSymbols} /> */}
        </>
    )
}

export default HomePage