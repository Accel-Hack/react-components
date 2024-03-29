import { FilterType } from './Enums'
import { TextFilter } from './TextFilter'
import { SelectableFilter } from './SelectableFilter'
import { ToggleFilter } from './ToggleFilter'
import { SuggestionFilter } from './SuggestionFilter'

type TFilters = TextFilter.Props | ToggleFilter.Props | SelectableFilter.Props | SuggestionFilter.Props

interface ICFilterDelegate {
  clear: () => void
}

interface ICFilter<T> {
  readonly type: FilterType
  readonly name: string
  readonly field: string
  value: T | undefined
  delegate?: ICFilterDelegate
}

export { ICFilterDelegate, ICFilter, TFilters }
