import React, { useEffect, useState } from 'react'
import { ICFilter, ICFilterDelegate } from './CFilter'
import { FilterType } from './Enums'
import { PartialPromise, ResultOf } from '../../shared/PartialPromise'

interface _ISelectBoxFilterOption {
  caption: string
  value: string
}

namespace SelectBoxFilter {
  export interface Props {
    readonly type: FilterType
    readonly name: string
    readonly field: string
    options: PartialPromise<void, _ISelectBoxFilterOption[]>
  }

  export class Class implements ICFilter<string> {
    readonly type: FilterType = FilterType.SELECT_BOX
    readonly name: string
    readonly field: string
    options: PartialPromise<void, _ISelectBoxFilterOption[]> = []
    value: string | undefined
    delegate?: ICFilterDelegate

    constructor(json: Props) {
      this.name = json.name
      this.field = json.field
      this.options = json.options
    }
  }

  export const Component: React.FC<{ filter: Class }> = ({ filter }) => {
    const [value, setValue] = useState(filter.value)
    const [options, setOptions] = useState<_ISelectBoxFilterOption[]>([])

    const onChange = (value: string) => {
      filter.value = value
      setValue(value)
    }

    filter.delegate = {
      clear: () => onChange(''),
    } as ICFilterDelegate

    useEffect(() => {
      ResultOf({
        partialPromise: filter.options,
        success: (_options) => setOptions(_options),
      })
    }, [])

    return (
      <div className={'rc-Filter rc-SelectBoxFilter'}>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value={''}>{filter.name}を選択</option>
          {options.map((_option, index) => (
            <option key={index} value={_option.value}>
              {_option.caption}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

export { SelectBoxFilter }
