import React, { useEffect, useState } from 'react'
import { ICFilter, ICFilterDelegate } from './CFilter'
import { FilterType } from './Enums'
import { PartialPromise, ResultOf } from '../../shared/Types'

interface _IFilterToggleOption {
  caption: string
  value: string
}

namespace ToggleFilter {
  export interface Props {
    readonly type: FilterType
    readonly name: string
    readonly field: string
    options: PartialPromise<_IFilterToggleOption[]>
  }

  export class Class implements ICFilter<string> {
    readonly type: FilterType = FilterType.TOGGLE
    readonly name: string
    readonly field: string
    options: PartialPromise<_IFilterToggleOption[]> = []
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
    const [options, setOptions] = useState<_IFilterToggleOption[]>([])

    const onClick = (value: string) => {
      filter.value = value
      setValue(value)
    }

    filter.delegate = {
      clear: () => onClick(''),
    } as ICFilterDelegate

    useEffect(() => {
      ResultOf(filter.options, (_options) => setOptions(_options))
    }, [])

    return (
      <div>
        <div>{filter.name}</div>
        <div>
          {options.map((_option, index) => (
            <button key={index} disabled={_option.value == value} onClick={() => onClick(_option.value)}>
              {_option.caption}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

export { ToggleFilter }
