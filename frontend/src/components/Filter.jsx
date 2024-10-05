const Filter = ({
  filterOpenSymbols,
  sortAlphabeticalSymbols,
  shffuleSymbols,
}) => {
  return (
    <div className="grid items-center justify-center gap-2 md:flex md:justify-around">
      <div>
        <label className="label cursor-pointer">
          <span className="label-text pr-2">Open Status</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            onChange={filterOpenSymbols}
          />
        </label>
      </div>
      <div className="flex gap-2">
        <button
          className="btn btn-outline btn-primary focus:outline-none"
          onClick={sortAlphabeticalSymbols}
        >
          Sort Alphabetical
        </button>
        <button
          className="btn btn-outline btn-warning focus:outline-none"
          onClick={shffuleSymbols}
        >
          Shuffle Toggle
        </button>
      </div>
    </div>
  )
}

export default Filter
