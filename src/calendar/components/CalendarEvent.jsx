import { memo } from 'react'

export const CalendarEvent = memo(function CalendarEvent ({ event }) {
  const { title, user } = event

  return (
    <>
      <strong>{title}</strong>
      <span> - {user?.name}</span>
    </>
  )
})
