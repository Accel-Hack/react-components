import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ICFilter, ICFilterDelegate } from './CFilter'
import { FilterType } from './Enums'
import { PartialPromise, ResultOf } from '../../shared/PartialPromise'

interface _ISuggestionFilterOption {
  caption: string
  value: string
}

namespace SuggestionFilter {
  export interface Props {
    readonly type: FilterType
    readonly name: string
    readonly field: string
    readonly options: PartialPromise<string, _ISuggestionFilterOption[]>
    readonly maxCount?: number
  }

  export class Class implements ICFilter<string> {
    readonly type: FilterType = FilterType.SUGGESTION
    readonly name: string
    readonly field: string
    options: PartialPromise<string, _ISuggestionFilterOption[]> = []
    maxCount: number

    get value(): string {
      return this._selected.join(',')
    }

    get selectedValues(): string[] {
      return this._selected.map((_) => _.value)
    }

    _selected: _ISuggestionFilterOption[] = []
    delegate?: ICFilterDelegate

    constructor(json: Props) {
      this.name = json.name
      this.field = json.field
      this.options = json.options
      this.maxCount = json.maxCount ?? -1
    }
  }

  export const Component: React.FC<{ filter: Class }> = ({ filter }) => {
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined)
    const [selected, setSelected] = useState<_ISuggestionFilterOption[]>([])
    const [focused, setFocused] = useState<boolean>(false)
    const [options, setOptions] = useState<_ISuggestionFilterOption[]>([])

    const refTextInput = useRef<HTMLInputElement>(null)

    const clear = () => {
      if (refTextInput.current) refTextInput.current.value = ''
      filter._selected = []
      setSelected([])
    }
    const onAdd = (_option: _ISuggestionFilterOption) => {
      if (!filter.selectedValues.includes(_option.value)) {
        filter._selected = [...filter._selected, _option]
        setSelected(filter._selected)
      }
    }
    const onRemove = (_option: _ISuggestionFilterOption) => {
      if (filter.selectedValues.includes(_option.value)) {
        filter._selected = filter._selected.filter((_o) => _o.value != _option.value)
        setSelected(filter._selected)
      }
    }
    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => getOptions(event.target.value)

    filter.delegate = { clear } as ICFilterDelegate

    useEffect(() => getOptions(refTextInput.current?.value ?? undefined), [])
    const getOptions = (request?: string) => {
      ResultOf({
        request: request,
        partialPromise: filter.options,
        success: (_options) => setOptions(_options),
      })
    }

    return (
      <div>
        <div>{filter.name}</div>
        <div>
          <span>selected items:</span>
          {filter.maxCount > 0 && <span>[max={filter.maxCount}]</span>}
          {selected.map((_option, index) => (
            <button key={index} onClick={() => onRemove(_option)}>
              {_option.caption}
            </button>
          ))}
        </div>
        {(filter.maxCount == -1 || selected.length < filter.maxCount) && (
          <div>
            <div>
              <input
                type='text'
                ref={refTextInput}
                onChange={onTextChange}
                onFocus={() => {
                  clearTimeout(timer)
                  setFocused(true)
                }}
                onBlur={() => setTimer(setTimeout(() => setFocused(false), 150))}
              />
            </div>
            {focused && (
              <div>
                {options
                  .filter((_option) => {
                    // remove selected items
                    return !selected.map((_) => _.value).includes(_option.value)
                  })
                  .map((_option, index) => (
                    <button key={index} onClick={() => onAdd(_option)}>
                      {_option.caption}
                    </button>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export { SuggestionFilter }
