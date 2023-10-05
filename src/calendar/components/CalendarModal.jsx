import { addHours, differenceInSeconds } from 'date-fns'
import { useState, useEffect, useMemo } from 'react'
import Modal from 'react-modal'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'
import Swal from 'sweetalert2'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks'

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '590px',
    maxWidth: '515px',
    padding: '20px 25px'
  }
}

Modal.setAppElement('#root') // Esto hace que el modal se sobreponga ante todo, lo que va dentro de los parentesis es el elemento html del index.html que contiene el id del root de la aplicacion, en este caso es un div con un id llamado root

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore()
  const { activeEvent, startSavingEvent } = useCalendarStore()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
  })

  const titleClass = useMemo(() => {
    if (!formSubmitted) return ''

    return formValues.title.length > 0 ? '' : 'is-invalid'
  }, [formValues.title, formSubmitted])

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent })
    }
  }, [activeEvent])

  const onInputChange = ({ target }) => {
    const { name, value } = target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    closeDateModal()
    setFormSubmitted(false)
  }

  const onSubmit = async event => {
    event.preventDefault()
    setFormSubmitted(true)

    const difference = differenceInSeconds(formValues.end, formValues.start) // Este metodo nos retorna la cantidad de segundos que tienen de diferencia entre la hora inicial y la hora de fin

    if (isNaN(difference) || difference <= 0) {
      return Swal.fire(
        'Fechas incorrectas!',
        'Revisar las fechas ingresadas!',
        'error'
      )
    }

    if (formValues.title.length <= 0) return

    await startSavingEvent(formValues)
    onCloseModal()
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <h1>Nuevo evento</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <div className='form-group mb-2'>
          <label className='d-block'>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className='form-control d-block'
            onChange={event => onDateChanged(event, 'start')}
            dateFormat='Pp'
            showTimeSelect
            locale={'es'}
            timeCaption='Hora'
          />
        </div>

        <div className='form-group mb-2'>
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className='form-control d-block'
            onChange={event => onDateChanged(event, 'end')}
            dateFormat='Pp'
            showTimeSelect
            locale={'es'}
            timeCaption='Hora'
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control ${titleClass}`}
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <div className='d-flex justify-content-end'>
          <button type='submit' className='btn btn-outline-primary'>
            <i className='far fa-save me-2'></i>
            <span>Guardar</span>
          </button>
        </div>
      </form>
    </Modal>
  )
}
