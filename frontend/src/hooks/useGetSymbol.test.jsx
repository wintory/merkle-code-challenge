import { act, renderHook } from '@testing-library/react-hooks'
import AppProvider from '../providers/AppProvider'
import useGetSymbol from './useGetSymbol'

describe('useGetSymbol', () => {
  beforeAll(() => {
    vi.mock('@tanstack/react-query', async (importOriginal) => {
      const actual = await importOriginal()
      return {
        ...actual,
        useQuery: vi.fn().mockReturnValue({
          data: [
            {
              key: 'TFUEL-USDC',
              status: 'close',
              id: 139,
            },
            {
              key: 'XLM-EUR',
              status: 'open',
              id: 11,
            },
          ],
          isFetching: false,
        }),
      }
    })
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  it('should return the correct initial values', () => {
    const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>
    const { result } = renderHook(() => useGetSymbol(), { wrapper })

    expect(result.current.isFetching).toBe(false)
    expect(result.current.data).toEqual([
      {
        key: 'TFUEL-USDC',
        status: 'close',
        id: 139,
      },
      {
        key: 'XLM-EUR',
        status: 'open',
        id: 11,
      },
    ])
    expect(result.current.filteredOption).toEqual({
      isOpenStatus: false,
      isSoryByAlphabetical: false,
      isShuffle: false,
    })
  })

  it('should update filteredOption correctly when calling shuffleSymbols', () => {
    const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>
    const { result } = renderHook(() => useGetSymbol(), { wrapper })

    act(() => {
      result.current.shuffleSymbols()
    })

    expect(result.current.filteredOption).toEqual({
      isOpenStatus: false,
      isSoryByAlphabetical: false,
      isShuffle: true,
    })
    expect(result.current.data.length).toEqual(2)
  })

  it('should update filteredOption correctly when calling sortAlphabeticalSymbols', () => {
    const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>
    const { result } = renderHook(() => useGetSymbol(), { wrapper })

    act(() => {
      result.current.sortAlphabeticalSymbols()
    })

    expect(result.current.filteredOption).toEqual({
      isOpenStatus: false,
      isSoryByAlphabetical: true,
      isShuffle: false,
    })
    expect(result.current.data).toEqual([
      {
        key: 'XLM-EUR',
        status: 'open',
        id: 11,
      },
      {
        key: 'TFUEL-USDC',
        status: 'close',
        id: 139,
      },
    ])
  })

  it('should update filteredOption correctly when calling filterOpenSymbols', () => {
    const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>
    const { result } = renderHook(() => useGetSymbol(), { wrapper })

    act(() => {
      result.current.filterOpenSymbols()
    })

    expect(result.current.filteredOption).toEqual({
      isOpenStatus: true,
      isSoryByAlphabetical: false,
      isShuffle: false,
    })
    expect(result.current.data).toEqual([
      {
        key: 'XLM-EUR',
        status: 'open',
        id: 11,
      },
    ])
  })
})
