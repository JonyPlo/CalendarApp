import { useCalendarStore } from '../../hooks'

export const FabDelete = ({ isDateModalOpen }) => {
  const { startDeletingEvent, activeEvent, hasEventSelected } =
    useCalendarStore()

  const displayBtn = hasEventSelected && !isDateModalOpen ? '' : 'd-none'

  return (
    <button
      className={`btn btn-danger fab-danger ${displayBtn}`}
      onClick={() => startDeletingEvent(activeEvent)}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  )
}
