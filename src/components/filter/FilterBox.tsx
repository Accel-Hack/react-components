import React from 'react'
import { TFilters } from './CFilter'
import { FilterType } from './Enums'
import { TextFilter } from './TextFilter'
import { ToggleFilter } from './ToggleFilter'
import { SelectableFilter } from './SelectableFilter'

export interface IFilterParams {
  field: string
  value: string
}

interface IFilterDelegate {
  onFiltered?: (params?: IFilterParams[]) => void
}

type Filters = TextFilter.Class | ToggleFilter.Class | SelectableFilter.Class

export namespace Filter {
  interface _InitProps {
    filters: TFilters[]
    onFiltered?: (params?: IFilterParams[]) => void
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
          default:
            throw new DOMException('Not Implemented')
        }
      })
      this.delegate = { onFiltered: init.onFiltered }
    }
  }

  export const Component: React.FC<{ filterBox: Class }> = ({ filterBox }) => {
    const buildComponent = (filter: Filters, key: number) => {
      switch (filter.type) {
        case FilterType.TEXT:
          return <TextFilter.Component key={key} filter={filter as TextFilter.Class} />
        case FilterType.TOGGLE:
          return <ToggleFilter.Component key={key} filter={filter as ToggleFilter.Class} />
        case FilterType.SELECTABLE:
          return <SelectableFilter.Component key={key} filter={filter as SelectableFilter.Class} />
        default:
          throw new DOMException('Not Implemented')
      }
    }

    const onSearch = () => {
      const options: any[] = filterBox.filters.flatMap((_search) => {
        if (!_search.value) return []
        return [{ field: _search.field, value: _search.value } as IFilterParams]
      })
      filterBox.delegate.onFiltered?.(options.length > 0 ? options : undefined)
    }

    const clear = () => {
      filterBox.filters.forEach((_) => _.delegate?.clear())
      onSearch()
    }

    return (
      <div>
        <div>{filterBox.filters.map((_search, index) => buildComponent(_search, index))}</div>
        <button onClick={() => onSearch()}>検索</button>
        <button onClick={() => clear()}>リセット</button>
      </div>
    )
  }
}
