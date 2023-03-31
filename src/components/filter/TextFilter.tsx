import React, { ChangeEvent, useRef } from 'react'
import { ICFilter, ICFilterDelegate } from './CFilter'
import { FilterType } from './Enums'

namespace TextFilter {
  export interface Props {
    readonly type: FilterType
    readonly name: string
    readonly field: string
  }

  export class Class implements ICFilter<string> {
    readonly type: FilterType = FilterType.TEXT
    readonly name: string
    readonly field: string
    delegate?: ICFilterDelegate
    value: string | undefined

    constructor(json: Props) {
      this.name = json.name
      this.field = json.field
    }
  }

  export const Component: React.FC<{ filter: Class }> = ({ filter }) => {
    const refTextInput = useRef<HTMLInputElement>(null)
    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => (filter.value = event.target.value)

    filter.delegate = {
      clear: () => {
        refTextInput.current && (refTextInput.current.value = '')
        filter.value = ''
      },
    } as ICFilterDelegate

    return (
      <div className={'rc-Filter rc-TextFilter'}>
        <label>{filter.name}</label>
        <input type='text' ref={refTextInput} onChange={onTextChange} />
      </div>
    )
  }
}

export { TextFilter }
