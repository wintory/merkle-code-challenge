import { render } from '@testing-library/react'
import { SymbolStatus } from '../constants/symbol'
import Card from './Card'

describe('Card', () => {
  it('renders card component with correct props', () => {
    const title = 'AAPL'
    const id = 123
    const status = SymbolStatus.OPEN

    const { getByText } = render(<Card title={title} id={id} status={status} />)

    expect(getByText('Symbol:')).toBeInTheDocument()
    expect(getByText(title)).toBeInTheDocument()
    expect(getByText('ID:')).toBeInTheDocument()
    expect(getByText(id)).toBeInTheDocument()
    expect(getByText('Status:')).toBeInTheDocument()
    expect(getByText(status)).toBeInTheDocument()
  })

  it('renders card component with green status color', () => {
    const title = 'AAPL'
    const id = 123
    const status = SymbolStatus.OPEN

    const { getByText } = render(<Card title={title} id={id} status={status} />)

    const statusElement = getByText(status)

    expect(statusElement).toBeInTheDocument()
    expect(statusElement).toHaveClass('text-green-300')
  })

  it('renders card component with red status color', () => {
    const title = 'AAPL'
    const id = 123
    const status = SymbolStatus.CLOSE

    const { getByText } = render(<Card title={title} id={id} status={status} />)

    const statusElement = getByText(status)

    expect(statusElement).toBeInTheDocument()
    expect(statusElement).toHaveClass('text-red-300')
  })
})
