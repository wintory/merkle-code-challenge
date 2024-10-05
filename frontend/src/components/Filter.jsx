const Filter = ({ filterOpenSymbols, sortAlphabeticalSymbols, shffuleSymbols }) => {
  return (
    <div>
      <label className="label cursor-pointer">
        <span className="label-text">Open Symbol</span>
        <input type="checkbox" className="toggle" onChange={filterOpenSymbols} />
      </label>
      <button onClick={sortAlphabeticalSymbols}>Sort Symbols</button>
      <button onClick={shffuleSymbols}>Shuffle Toggle</button>
    </div>
  )
}

export default Filter