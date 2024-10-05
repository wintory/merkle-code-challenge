import { Fragment } from 'react'
import Card from '../components/Card'
import Filter from '../components/Filter'
import useGetSymbol from '../hooks/useGetSymbol'

const HomePage = ({ symbols }) => {
  const {
    data,
    isFetching,
    sortAlphabeticalSymbols,
    shffuleSymbols,
    filterOpenSymbols,
  } = useGetSymbol(symbols)
  const total = data.length

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }
  console.log({ data })
  // TODO: refactor component to dumb component
  return (
    <div className="grid w-full text-sm">
      <Filter
        filterOpenSymbols={filterOpenSymbols}
        sortAlphabeticalSymbols={sortAlphabeticalSymbols}
        shffuleSymbols={shffuleSymbols}
      />
      <div className="divider" />
      {total > 0 ? (
        <>
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-transparent p-2">
              Total Symbol:
              <div className="badge badge-primary">{total}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((symbol) => (
              <Fragment key={symbol.id}>
                <Card
                  title={symbol.key}
                  id={symbol.id}
                  status={symbol.status}
                />
              </Fragment>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">No data</div>
      )}
    </div>
  )
}

export default HomePage
