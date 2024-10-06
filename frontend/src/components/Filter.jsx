const Filter = ({
  filterOpenSymbols,
  sortAlphabeticalSymbols,
  shuffleSymbols,
}) => {
  return (
    <div className="grid items-center justify-center gap-2 md:flex md:justify-around">
      <div>
        <label className="label cursor-pointer">
          <span className="label-text pr-2 text-white">Open Status</span>
          <input
            type="checkbox"
            data-testid="open-status-toggle"
            className="toggle toggle-primary"
            onChange={filterOpenSymbols}
          />
        </label>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          className="btn btn-outline btn-secondary min-w-[190px] focus:outline-none"
          data-testid="sort-alphabetical-button"
          onClick={sortAlphabeticalSymbols}
        >
          Sort Alphabetical by ID
        </button>
        <button
          className="btn btn-outline btn-warning min-w-[190px] focus:outline-none"
          data-testid="suffle-button"
          onClick={shuffleSymbols}
        >
          Shuffle Items
        </button>
      </div>
    </div>
  )
}

export default Filter
