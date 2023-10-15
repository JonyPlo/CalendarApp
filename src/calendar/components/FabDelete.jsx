import { useCalendarStore } from '../../hooks'

export const FabDelete = ({ isDateModalOpen }) => {
  const { startDeletingEvent, activeEvent, hasEventSelected } =
    useCalendarStore()

  const displayBtn = hasEventSelected && !isDateModalOpen ? '' : 'd-none'

  const handleDelete = () => {
    startDeletingEvent(activeEvent)
  }

  return (
    <button
      className={`btn btn-danger fab-danger ${displayBtn}`}
      onClick={handleDelete}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  )
}
