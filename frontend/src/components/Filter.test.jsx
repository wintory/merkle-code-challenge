import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import Filter from './Filter'

describe('Filter', () => {
  it('renders the filter component', () => {
    const { getByLabelText, getByText } = render(<Filter />)

    expect(getByLabelText('Open Status')).toBeInTheDocument()
    expect(getByText('Sort Alphabetical by ID')).toBeInTheDocument()
    expect(getByText('Shuffle Items')).toBeInTheDocument()
  })

  it('calls the filterOpenSymbols function when checkbox is changed', () => {
    const filterOpenSymbols = vi.fn()
    const { getByTestId } = render(
      <Filter filterOpenSymbols={filterOpenSymbols} />
    )

    fireEvent.click(getByTestId('open-status-toggle'))

    expect(filterOpenSymbols).toHaveBeenCalled()
  })

  it('calls the sortAlphabeticalSymbols function when Sort Alphabetical button is clicked', () => {
    const sortAlphabeticalSymbols = vi.fn()
    const { getByTestId } = render(
      <Filter sortAlphabeticalSymbols={sortAlphabeticalSymbols} />
    )

    fireEvent.click(getByTestId('sort-alphabetical-button'))

    expect(sortAlphabeticalSymbols).toHaveBeenCalled()
  })

  it('calls the shuffleSymbols function when Shuffle Toggle button is clicked', () => {
    const shuffleSymbols = vi.fn()
    const { getByTestId } = render(<Filter shuffleSymbols={shuffleSymbols} />)

    fireEvent.click(getByTestId('suffle-button'))

    expect(shuffleSymbols).toHaveBeenCalled()
  })
})
