import { render, screen, fireEvent } from '@testing-library/react'
import { FabDelete } from '../../../src/calendar/components/FabDelete'
import { useCalendarStore } from '../../../src/hooks/useCalendarStore'

jest.mock('../../../src/hooks/useCalendarStore')

describe('Testing in <FabDelete/>', () => {
  const mockStartDeletingEvent = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('should display component correctly', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    })

    render(<FabDelete />)

    const btn = screen.getByLabelText('btn-delete')

    expect(btn.classList.toString()).toContain(
      'btn btn-danger fab-danger d-none'
    )
  })

  test('should display the button if there are an active event', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    })

    render(<FabDelete />)

    const btn = screen.getByLabelText('btn-delete')

    expect(btn.classList.toString()).not.toContain('d-none')
  })

  test('should to call the startDeletingEvent function if there are an active event', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    })

    render(<FabDelete />)

    const btn = screen.getByLabelText('btn-delete')

    fireEvent.click(btn)

    expect(mockStartDeletingEvent).toHaveBeenCalled()
  })
})
