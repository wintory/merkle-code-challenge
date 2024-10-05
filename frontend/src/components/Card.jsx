import { SymbolStatus } from '../constants/symbol'

const Card = ({ title, id, status }) => {
  return (
    <div className="rounded-md bg-transparent p-4 text-left outline-double hover:bg-slate-800">
      <p>
        <b>Symbol:</b> {title}
      </p>
      <p>
        <b>ID:</b> {id}
      </p>
      <p>
        <b>Status:</b>{' '}
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
