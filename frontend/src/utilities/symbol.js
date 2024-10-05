export const transformSymbols = (symbols = {}) => { 
  if (!symbols) return {}
  
  return Object.keys(symbols).map(key => ({
    key: key,
    ...symbols[key]
  }))
}