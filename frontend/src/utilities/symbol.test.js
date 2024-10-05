import { transformSymbols } from './symbol'

describe('transformSymbols', () => {
  it('should return an empty object if symbols is not provided', () => {
    expect(transformSymbols()).toEqual({})
  })

  it('should return an empty object if symbols is an empty object', () => {
    expect(transformSymbols({})).toEqual({})
  })

  it('should transform symbols correctly', () => {
    const symbols = {
      symbol1: { name: 'Symbol 1', value: 10 },
      symbol2: { name: 'Symbol 2', value: 20 },
      symbol3: { name: 'Symbol 3', value: 30 },
    }

    const expected = [
      { key: 'symbol1', name: 'Symbol 1', value: 10 },
      { key: 'symbol2', name: 'Symbol 2', value: 20 },
      { key: 'symbol3', name: 'Symbol 3', value: 30 },
    ]

    expect(transformSymbols(symbols)).toEqual(expected)
  })
})
