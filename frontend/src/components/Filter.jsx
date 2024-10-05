const Filter = ({
  filterOpenSymbols,
  sortAlphabeticalSymbols,
  shffuleSymbols,
}) => {
  return (
    <div>
      <div>
        <label className="label cursor-pointer">
          <span className="label-text">Open Status</span>
          <input
            type="checkbox"
            className="toggle"
            onChange={filterOpenSymbols}
          />
        </label>
      </div>
      <button onClick={sortAlphabeticalSymbols}>Sort Symbols</button>
      <button onClick={shffuleSymbols}>Shuffle Toggle</button>
    </div>
  )
}

export default Filter
