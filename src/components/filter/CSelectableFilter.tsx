import React, { useEffect, useState } from 'react'
import { ICFilter, ICFilterDelegate } from './CFilter'
import { FilterType } from './Enums'
import { PartialPromise, ResultOf } from '../../shared/Types'

interface _IFilterSelectableOption {
  caption: string
  value: string
}

class SelectableFilter implements ICFilter<string> {
  readonly type: FilterType = FilterType.TOGGLE
  readonly name: string = ''
  readonly field: string = ''
  options: PartialPromise<_IFilterSelectableOption[]> = []
  value?: string
  _values: string[] = []
  delegate?: ICFilterDelegate
}

const CSelectableFilter: React.FC<{ filter: SelectableFilter }> = ({ filter }) => {
  // const [value, setValue] = useState(filter.value)
  const [selected, setSelected] = useState<string[]>([])
  const [options, setOptions] = useState<_IFilterSelectableOption[]>([])

  const clear = () => {
    filter._values = []
    setSelected([])
  }
  const onAdd = (value: string) => {
    if (!filter._values.includes(value)){
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
    ResultOf(filter.options, (_options) => setOptions(_options))
  }, [])

  return (
    <div>
      <div>{filter.name}</div>
      <div>
        <span>selected items:</span>
        {selected
          .flatMap((_value) => options.filter((_option) => _option.value == _value))
          .map((_option, index) => (
            <button key={index} onClick={() => onRemove(_option.value)}>
              {_option.caption}
            </button>
          ))}
      </div>
      <div>
        {options
          .filter((_option) => !selected.includes(_option.value))
          .map((_option, index) => (
            <button key={index} onClick={() => onAdd(_option.value)}>
              {_option.caption}
            </button>
          ))}
      </div>
    </div>
  )
}

export { SelectableFilter, CSelectableFilter }
