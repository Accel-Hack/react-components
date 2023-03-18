import React from 'react'
import { TFilters } from './CFilter'
import { FilterType } from './Enums'
import { CTextFilter, TextFilter } from './CTextFilter'
import { CToggleFilter, ToggleFilter } from './CToggleFilter'
import { CSelectableFilter, SelectableFilter } from './CSelectableFilter'

interface IFilterParams {
  field: string
  value: string
}

interface _FilterBoxProps {
  filters: TFilters[]
  onFiltered?: (params?: IFilterParams[]) => void
}

const FilterBox: React.FC<_FilterBoxProps> = ({ filters, onFiltered }) => {
  const buildComponent = (filter: TFilters, key: number) => {
    switch (filter.type) {
      case FilterType.TEXT:
        return <CTextFilter key={key} filter={filter as TextFilter} />
      case FilterType.TOGGLE:
        return <CToggleFilter key={key} filter={filter as ToggleFilter} />
      case FilterType.SELECTABLE:
        return <CSelectableFilter key={key} filter={filter as SelectableFilter} />
      default:
        throw new DOMException('Not Implemented')
    }
  }

  const onSearch = () => {
    const options: any[] = filters.flatMap((_search) => {
      if (!_search.value) return []
      return [{ field: _search.field, value: _search.value } as IFilterParams]
    })
    onFiltered?.(options.length > 0 ? options : undefined)
  }

  const clear = () => {
    filters.forEach((_) => _.delegate?.clear())
    onSearch()
  }

  return (
    <div>
      <div>{filters.map((_search, index) => buildComponent(_search, index))}</div>
      <button onClick={() => onSearch()}>検索</button>
      <button onClick={() => clear()}>リセット</button>
    </div>
  )
}

export { IFilterParams, FilterBox }
