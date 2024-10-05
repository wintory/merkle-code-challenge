import Filter from '../components/Filter'
import useGetSymbol from '../hooks/useGetSymbol'


const HomePage = ({ symbols }) => {
    const { data, error, isFetching, sortAlphabeticalSymbols, shffuleSymbols, filterOpenSymbols } = useGetSymbol(symbols)
    const total = data.length

    if (isFetching) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    return (
        <>
            <Filter filterOpenSymbols={filterOpenSymbols} sortAlphabeticalSymbols={sortAlphabeticalSymbols} shffuleSymbols={shffuleSymbols} />
            <span>total: {total}</span>
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