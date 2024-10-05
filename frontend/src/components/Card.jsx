import { SymbolStatus } from '../constants/symbol'

const Card = ({ key, id, status }) => {
  return (
    <div className="rounded-md bg-transparent p-4 text-left outline-double hover:bg-slate-800">
      <p>Symbol: {key}</p>
      <p>ID: {id}</p>
      <p>
        Status:{' '}
        <span
          className={
            status === SymbolStatus.OPEN ? 'text-green-300' : 'text-red-300'
          }
        >
          {status}
        </span>
      </p>
    </div>
  )
}

export default Card
