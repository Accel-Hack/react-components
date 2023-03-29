import React, { useState } from 'react'
import { SampleFilter } from './component/SampleFilter'
import { SampleTable } from './component/SampleTable'
import { SampleFilterTable } from './component/SampleFilterTable'

export const App = () => {
  console.log('App.rendered')
  const [message, setMessage] = useState('')
  return (
    <>
      <span>{message}</span>
      <button onClick={() => setMessage('Hello')}>Hello</button>
      <button onClick={() => setMessage('こんにちは')}>こんにちは</button>
      <hr></hr>
      <SampleFilter />
      <hr></hr>
      <SampleTable />
      <hr></hr>
      <SampleFilterTable />
    </>
  )
}
