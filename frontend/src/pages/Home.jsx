import Filter from '../components/Filter'
import useGetSymbol from '../hooks/useGetSymbol'

const HomePage = ({ symbols }) => {
  const {
    data,
    error,
    isFetching,
    sortAlphabeticalSymbols,
    shffuleSymbols,
    filterOpenSymbols,
  } = useGetSymbol(symbols)
  const total = data.length

  if (isFetching) {
    return <span className="loading loading-dots loading-lg"></span>
  }

  return (
    <div className="m-0">
      <div>
        <Filter
          filterOpenSymbols={filterOpenSymbols}
          sortAlphabeticalSymbols={sortAlphabeticalSymbols}
          shffuleSymbols={shffuleSymbols}
        />
        <span>total: {total}</span>
      </div>
      {data.map((symbol) => (
        <div key={symbol.id}>
          <p>{symbol.key}</p>
          <p>{symbol.id}</p>
          <p>{symbol.status}</p>
        </div>
      ))}
    </div>
  )
}

export default HomePage
