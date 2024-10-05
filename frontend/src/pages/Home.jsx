import { Fragment } from 'react'
import Card from '../components/Card'
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

  // TODO: refactor component to dumb component
  return (
    <div className="grid w-full">
      <Filter
        filterOpenSymbols={filterOpenSymbols}
        sortAlphabeticalSymbols={sortAlphabeticalSymbols}
        shffuleSymbols={shffuleSymbols}
      />
      <div className="divider" />
      <div className="mb-4 flex justify-center">
        <div className="inline-flex items-center gap-2 bg-transparent p-2">
          Total Symbol:
          <div className="badge badge-secondary">{total}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((symbol) => (
          <Fragment key={symbol.id}>
            <Card key={symbol.id} id={symbol.id} status={symbol.status} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default HomePage
