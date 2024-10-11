import { events } from '@/constants'

import React from 'react'
import Item from './Item'

const Event = () => {
  return (
    <div className='bg-white p-5 rounded-2xl dark:bg-gray-300
     flex-1 flex flex-col gap-5'>
      <h1>Event</h1>

      { events.map((event, index) => (
        <Item key={index} event={event} />
      ))}
    </div>
  )
}

export default Event
