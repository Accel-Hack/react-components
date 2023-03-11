import React, {ChangeEvent, useRef, useState} from "react"

interface _ISearchDelegate {
  clear: () => void
}

interface _ISearch<T> {
  readonly name: string
  readonly field: string
  value?: T
  delegate?: _ISearchDelegate
}

interface ATextSearchInit {
  name: string
  field: string
}

class ATextSearch implements _ISearch<string> {
  readonly name: string
  readonly field: string;
  delegate?: _ISearchDelegate;

  value?: string

  public constructor(init: ATextSearchInit) {
    this.name = init.name
    this.field = init.field
  }
}

const TextSearch: React.FC<{ search: ATextSearch }> = ({search}) => {
  const refTextInput = useRef<HTMLInputElement>(null)
  const onTextChange = (event: ChangeEvent<HTMLInputElement>) =>
    search.value = event.target.value

  search.delegate = {
    clear: () => {
      refTextInput.current && (refTextInput.current.value = "")
      search.value = ""
    }
  } as _ISearchDelegate

  return (
    <div>
      <label>{search.name}</label>
      <input type="text"
             ref={refTextInput}
             onChange={onTextChange}/>
    </div>
  )
}

interface IToggleOption {
  caption: string
  value: string
}

interface AToggleSearchInit {
  name: string
  field: string
  options: IToggleOption[]
}

class AToggleSearch implements _ISearch<string> {
  readonly name: string
  readonly field: string;
  value?: string
  delegate?: _ISearchDelegate
  options: IToggleOption[]

  public constructor(init: AToggleSearchInit) {
    this.name = init.name
    this.field = init.field
    this.options = init.options
  }
}

const ToggleSearch: React.FC<{ search: AToggleSearch }> = ({search}) => {

  let [value, setValue] = useState(search.value)

  const onClick = (value: string) => {
    search.value = value
    setValue(value)
  }

  search.delegate = {
    clear: () => onClick("")
  } as _ISearchDelegate

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

interface SearchParams {
  field: string
  value: string
}

interface _SearchBoxProps {
  searches: _ISearch<any>[]
  searchCallback?: (params?: SearchParams[]) => void
}

const SearchBox: React.FC<_SearchBoxProps> = ({searches, searchCallback}) => {
  const buildComponent = (search: _ISearch<any>, key: number) => {
    switch (search.constructor) {
      case ATextSearch:
        return <TextSearch key={key} search={search as ATextSearch}/>
      case AToggleSearch:
        return <ToggleSearch key={key} search={search as AToggleSearch}/>
      default:
        throw new DOMException("Not Implemented")
    }
  }

  const onSearch = () => {
    const options: any[] = searches.flatMap(_search => {
      if (!_search.value)
        return []
      return [{field: _search.field, value: _search.value} as SearchParams]
    })
    searchCallback?.(options.length > 0 ? options : undefined)
  }

  const clear = () => {
    searches.forEach(_ => _.delegate?.clear())
    onSearch()
  }

  return (
    <div>
      <div>
        {searches.map((_search, index) =>
          buildComponent(_search, index)
        )}
      </div>
      <button onClick={(_) => onSearch()}>検索</button>
      <button onClick={(_) => clear()}>リセット</button>
    </div>
  )
}

export {ATextSearch, AToggleSearch, SearchParams, SearchBox}
