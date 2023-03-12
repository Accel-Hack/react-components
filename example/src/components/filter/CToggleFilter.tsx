import React, {useState} from "react"
import {ICFilter, ICFilterDelegate} from "./CFilter";
import {FilterType} from "./Enums";


interface _IFilterToggleOption {
  caption: string
  value: string
}

class ToggleFilter implements ICFilter<string> {
  readonly type: FilterType = FilterType.TOGGLE
  readonly name: string = ""
  readonly field: string = ""
  options: _IFilterToggleOption[] = []
  value?: string
  delegate?: ICFilterDelegate
}

const CToggleFilter: React.FC<{ search: ToggleFilter }> = ({search}) => {

  let [value, setValue] = useState(search.value)

  const onClick = (value: string) => {
    search.value = value
    setValue(value)
  }

  search.delegate = {
    clear: () => onClick("")
  } as ICFilterDelegate

  return (
    <div>
      <div>{search.name}</div>
      <div>{search.options.map((_option, index) =>
        <button key={index}
                disabled={_option.value == value}
                onClick={(_) => onClick(_option.value)}>
          {_option.caption}
        </button>
      )}</div>
    </div>
  )
}

export {ToggleFilter, CToggleFilter}