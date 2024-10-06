import * as useGetSymbol from '../hooks/useGetSymbol'
import renderWithProviders from '../tests/renderWithProviders'
import HomePage from './Home'

describe('HomePage', () => {
  const mockedUseGetSymbol = vi.spyOn(useGetSymbol, 'default')
  const mockResolveValue = {
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
  }

  afterAll(() => {
    vi.clearAllMocks()
  })

  it('renders loading spinner when fetching data', () => {
    mockedUseGetSymbol.mockReturnValue({ isFetching: true, data: [] })

    const { getByTestId } = renderWithProviders(<HomePage />)
    const loadingSpinner = getByTestId('loading-spinner')

    expect(loadingSpinner).toBeInTheDocument()
  })

  it('renders total symbol count when data is available', () => {
    mockedUseGetSymbol.mockReturnValue(mockResolveValue)
    const { getByText } = renderWithProviders(<HomePage />)
    const totalSymbolCount = getByText(/Total Symbol:/i)

    expect(totalSymbolCount).toBeInTheDocument()
    expect(totalSymbolCount).toHaveTextContent('Total Symbol:2')
  })

  it('renders symbol cards when data is available', () => {
    const { getByTestId } = renderWithProviders(<HomePage />)
    const symbolCards = getByTestId('symbol-cards')

    expect(symbolCards).toBeInTheDocument()
  })

  it('renders "No data" message when no data is available', () => {
    mockedUseGetSymbol.mockReturnValue({ isFetching: false, data: [] })

    const { getByText } = renderWithProviders(<HomePage />)
    const noDataMessage = getByText(/No data/i)

    expect(noDataMessage).toBeInTheDocument()
  })
})
