import React, { ChangeEvent, useRef } from 'react'
import { ICFilter, ICFilterDelegate } from './CFilter'
import { FilterType } from './Enums'

class TextFilter implements ICFilter<string> {
  readonly type: FilterType = FilterType.TEXT
  readonly name: string = ''
  readonly field: string = ''
  delegate?: ICFilterDelegate
  value?: string
}

const CTextFilter: React.FC<{ filter: TextFilter }> = ({ filter }) => {
  const refTextInput = useRef<HTMLInputElement>(null)
  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => (filter.value = event.target.value)

  filter.delegate = {
    clear: () => {
      refTextInput.current && (refTextInput.current.value = '')
      filter.value = ''
    },
  } as ICFilterDelegate

  return (
    <div>
      <label>{filter.name}</label>
      <input type='text' ref={refTextInput} onChange={onTextChange} />
    </div>
  )
}

export { TextFilter, CTextFilter }
