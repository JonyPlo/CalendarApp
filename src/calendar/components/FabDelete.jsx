import { useCalendarStore } from '../../hooks'

export const FabDelete = ({ isDateModalOpen }) => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore()

  const handleDelete = () => {
    startDeletingEvent()
  }

  const displayBtn = hasEventSelected && !isDateModalOpen ? '' : 'd-none'

  return (
    <button
      className={`btn btn-danger fab-danger ${displayBtn}`}
      onClick={handleDelete}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  )
}
