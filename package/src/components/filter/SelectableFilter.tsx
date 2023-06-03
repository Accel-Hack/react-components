import React, { useEffect, useState } from 'react'
import { ICFilter, ICFilterDelegate } from './CFilter'
import { FilterType } from './Enums'
import { PartialPromise, ResultOf } from '../../shared/PartialPromise'

interface _ISelectFilterOption {
  caption: string
  value: string
}

namespace SelectableFilter {
  export interface Props {
    readonly type: FilterType
    readonly name: string
    readonly field: string
    readonly options: PartialPromise<void, _ISelectFilterOption[]>
    readonly maxCount?: number
  }

  export class Class implements ICFilter<string> {
    readonly type: FilterType = FilterType.SELECTABLE
    readonly name: string
    readonly field: string
    options: PartialPromise<void, _ISelectFilterOption[]> = []
    maxCount: number

    get value(): string {
      return this._values.join(',')
    }

    _values: string[] = []
    delegate?: ICFilterDelegate

    constructor(json: Props) {
      this.name = json.name
      this.field = json.field
      this.options = json.options
      this.maxCount = json.maxCount ?? -1
    }
  }

  export const Component: React.FC<{ filter: Class }> = ({ filter }) => {
    const [selected, setSelected] = useState<string[]>([])
    const [options, setOptions] = useState<_ISelectFilterOption[]>([])

    const clear = () => {
      filter._values = []
      setSelected([])
    }
    const onAdd = (value: string) => {
      if (!filter._values.includes(value)) {
        filter._values = [...filter._values, value]
        setSelected(filter._values)
      }
    }
    const onRemove = (value: string) => {
      if (filter._values.includes(value)) {
        filter._values = filter._values.filter((_value) => _value != value)
        setSelected(filter._values)
      }
    }

    filter.delegate = { clear } as ICFilterDelegate

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
          <span>selected items:</span>
          {filter.maxCount > 0 && <span>[max={filter.maxCount}]</span>}
          {selected
            .flatMap((_value) => options.filter((_option) => _option.value == _value))
            .map((_option, index) => (
              <button key={index} onClick={() => onRemove(_option.value)}>
                {_option.caption}
              </button>
            ))}
        </div>
        {(filter.maxCount == -1 || selected.length < filter.maxCount) && (
          <div>
            {options
              .filter((_option) => !selected.includes(_option.value))
              .map((_option, index) => (
                <button key={index} onClick={() => onAdd(_option.value)}>
                  {_option.caption}
                </button>
              ))}
          </div>
        )}
      </div>
    )
  }
}

export { SelectableFilter }
