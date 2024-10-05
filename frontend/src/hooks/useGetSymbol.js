import { useQuery } from '@tanstack/react-query'
import { orderBy } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SymbolStatus } from '../constants/symbol'
import { getSymbol } from '../services/symbol'
import { transformSymbols } from '../utilities/symbol'

const useGetSymbol = () => {
  const [filteredOption, setFilterOption] = useState({})

  const getCoinSymbol = useCallback(async () => {
    const data = await getSymbol()

    return transformSymbols(data)
  }, [])

  const shffuleSymbols = useCallback(() => {
    setFilterOption({
      ...filteredOption,
      isSoryByAlphabetical: false,
      isShuffle: true,
    })
  }, [setFilterOption, filteredOption])

  const sortAlphabeticalSymbols = useCallback(() => {
    setFilterOption({
      ...filteredOption,
      isSoryByAlphabetical: true,
      isShuffle: false,
    })
  }, [setFilterOption, filteredOption])

  const filterOpenSymbols = useCallback(() => {
    setFilterOption({
      ...filteredOption,
      isOpenStatus: !filteredOption.isOpenStatus,
    })
  }, [setFilterOption, filteredOption])

  const { data, isFetching } = useQuery({
    queryKey: ['symbolData'],
    queryFn: getCoinSymbol,
  })

  const filterSymbols = useMemo(() => {
    if (!data) return []

    let symbolData = data || []

    if (filteredOption.isOpenStatus) {
      symbolData = symbolData.filter(
        (symbol) => symbol.status === SymbolStatus.OPEN
      )
    }

    if (filteredOption.isSoryByAlphabetical) {
      symbolData = orderBy(symbolData, 'id', 'asc')
    }

    if (filteredOption.isShuffle) {
      symbolData = [...symbolData].sort(() => Math.random() - 0.5)
    }

    return symbolData
  }, [data, filteredOption])

  useEffect(() => {
    setFilterOption({
      isOpenStatus: false,
      isSoryByAlphabetical: false,
      isShuffle: false,
    })
  }, [])

  return {
    isFetching,
    data: filterSymbols,
    shffuleSymbols,
    sortAlphabeticalSymbols,
    filterOpenSymbols,
    filteredOption,
  }
}

export default useGetSymbol
