import React, { memo } from 'react'
import { TFilters } from './CFilter'
import { FilterType } from './Enums'
import { TextFilter } from './TextFilter'
import { ToggleFilter } from './ToggleFilter'
import { SelectableFilter } from './SelectableFilter'
import { SuggestionFilter } from './SuggestionFilter'

export interface IFilterParams {
  field: string
  value: string
}

interface IFilterDelegate {
  onFiltered?: (params: IFilterParams[]) => void
}

interface IFilterDispatch {
  search: () => void
}

type Filters = TextFilter.Class | ToggleFilter.Class | SelectableFilter.Class | SuggestionFilter.Class

export namespace Filter {
  interface _InitProps {
    filters: TFilters[]
    onFiltered?: (params: IFilterParams[]) => void
  }

  export class Class {
    filters: Filters[]
    delegate: IFilterDelegate

    constructor(init: _InitProps) {
      this.filters = init.filters.map((f) => {
        switch (f.type) {
          case FilterType.TEXT:
            return new TextFilter.Class(f as TextFilter.Props)
          case FilterType.TOGGLE:
            return new ToggleFilter.Class(f as ToggleFilter.Props)
          case FilterType.SELECTABLE:
            return new SelectableFilter.Class(f as SelectableFilter.Props)
          case FilterType.SUGGESTION:
            return new SuggestionFilter.Class(f as SuggestionFilter.Props)
          default:
            throw new DOMException('Not Implemented')
        }
      })
      this.delegate = { onFiltered: init.onFiltered }
    }

    _dispatch?: IFilterDispatch

    search(): void {
      if (!this._dispatch?.search) throw new Error()
      this._dispatch?.search()
    }
  }

  const _component: React.FC<{ filterBox: Class }> = ({ filterBox }) => {
    const buildComponent = (filter: Filters, key: number) => {
      switch (filter.type) {
        case FilterType.TEXT:
          return <TextFilter.Component key={key} filter={filter as TextFilter.Class} />
        case FilterType.TOGGLE:
          return <ToggleFilter.Component key={key} filter={filter as ToggleFilter.Class} />
        case FilterType.SELECTABLE:
          return <SelectableFilter.Component key={key} filter={filter as SelectableFilter.Class} />
        case FilterType.SUGGESTION:
          return <SuggestionFilter.Component key={key} filter={filter as SuggestionFilter.Class} />
        default:
          throw new DOMException('Not Implemented')
      }
    }

    const onSearch = () => {
      const options: any[] = filterBox.filters.flatMap((_search) => {
        if (!_search.value) return []
        return [{ field: _search.field, value: _search.value } as IFilterParams]
      })
      filterBox.delegate.onFiltered?.(options)
    }

    filterBox._dispatch = { search: onSearch }

    const clear = () => {
      filterBox.filters.forEach((_) => _.delegate?.clear())
      onSearch()
    }

    return (
      <div>
        <div>{filterBox.filters.map((_search, index) => buildComponent(_search, index))}</div>
        <button className={'rc-search-button rc-btn rc-btn-sm rc-btn-primary'} onClick={() => onSearch()}>検索</button>
        <button className={'rc-reset-button rc-btn rc-btn-sm rc-btn-secondary'} onClick={() => clear()}>リセット</button>
      </div>
    )
  }

  export const Component = memo(_component)
}
