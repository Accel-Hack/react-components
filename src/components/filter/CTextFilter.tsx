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

const CTextFilter: React.FC<{ search: TextFilter }> = ({ search }) => {
  const refTextInput = useRef<HTMLInputElement>(null)
  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => (search.value = event.target.value)

  search.delegate = {
    clear: () => {
      refTextInput.current && (refTextInput.current.value = '')
      search.value = ''
    },
  } as ICFilterDelegate

  return (
    <div>
      <label>{search.name}</label>
      <input type='text' ref={refTextInput} onChange={onTextChange} />
    </div>
  )
}

export { TextFilter, CTextFilter }
