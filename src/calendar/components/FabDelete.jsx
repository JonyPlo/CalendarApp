import { useCalendarStore } from '../../hooks'

export const FabDelete = ({ isDateModalOpen }) => {
  const { startDeletingEvent, activeEvent, hasEventSelected } =
    useCalendarStore()

  const displayBtn = hasEventSelected && !isDateModalOpen ? '' : 'd-none2'

  const handleDelete = () => {
    startDeletingEvent(activeEvent)
  }

  return (
    <button
      aria-label='btn-delete'
      className={`btn btn-danger fab-danger ${displayBtn}`}
      onClick={handleDelete}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  )
}
