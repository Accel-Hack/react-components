import React, { useEffect, useState } from 'react'
import { ICFilter, ICFilterDelegate } from './CFilter'
import { FilterType } from './Enums'
import { PartialPromise, ResultOf } from '../../shared/PartialPromise'

interface _IToggleFilterOption {
  caption: string
  value: string
}

namespace ToggleFilter {
  export interface Props {
    readonly type: FilterType
    readonly name: string
    readonly field: string
    options: PartialPromise<void, _IToggleFilterOption[]>
  }

  export class Class implements ICFilter<string> {
    readonly type: FilterType = FilterType.TOGGLE
    readonly name: string
    readonly field: string
    options: PartialPromise<void, _IToggleFilterOption[]> = []
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
    const [options, setOptions] = useState<_IToggleFilterOption[]>([])

    const onClick = (value: string) => {
      filter.value = value
      setValue(value)
    }

    filter.delegate = {
      clear: () => onClick(''),
    } as ICFilterDelegate

    useEffect(() => {
      ResultOf({
        partialPromise: filter.options,
        success: (_options) => setOptions(_options),
      })
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
