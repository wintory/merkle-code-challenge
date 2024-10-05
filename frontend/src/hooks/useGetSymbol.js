import {
    useQuery
} from '@tanstack/react-query'
import { orderBy } from 'lodash'
import { useCallback, useMemo, useState } from "react"
import { SymbolStatus } from '../constants/symbol'
import { getSymbol } from '../services/symbol'
import { transformSymbols } from '../utilities/symbol'

const useGetSymbol = () => {
    const [filteredOption, setFilterOption] = useState({
        isOpenStatus: true,
        isSoryByAlphabetical: false,
        isShuffle: false
    })

    const getCoinSymbol = useCallback(async () => {
        const data = await getSymbol()

        return transformSymbols(data)
    }, [])


    const shffuleSymbols = () => {
        setFilterOption({
            ...filteredOption,
            isSoryByAlphabetical: false,
            isShuffle: true
        })
    }

    const sortAlphabeticalSymbols = () => {
        setFilterOption({
            ...filteredOption,
            isSoryByAlphabetical: true,
            isShuffle: false
        })
    }

    const filterOpenSymbols = () => {
        setFilterOption({
            ...filteredOption,
            isSoryByAlphabetical: false,
            isShuffle: true
        })
    }

    const { error, data, isFetching } = useQuery({
        queryKey: ['symbolData'],
        queryFn: getCoinSymbol,
    })

    const filterSymbols = useMemo(() => {
        if (!data) return []

        let symbolData = data || []

        if (filteredOption.isOpenStatus) {
            symbolData = symbolData.filter(symbol => symbol.status === SymbolStatus.OPEN)
        }

        if (filteredOption.isSoryByAlphabetical) {
            symbolData = orderBy(symbolData, 'id', 'asc')
        }

        if (filteredOption.isShuffle) {
            symbolData = ([...symbolData].sort(() => Math.random() - 0.5))
        }


        return symbolData
    }, [data, filteredOption])


    return { isFetching, data: filterSymbols, error, shffuleSymbols, sortAlphabeticalSymbols, filterOpenSymbols }
}

export default useGetSymbol