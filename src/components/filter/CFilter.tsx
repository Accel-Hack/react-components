import { FilterType } from './Enums'
import { TextFilter } from './CTextFilter'
import { ToggleFilter } from './CToggleFilter'
import { SelectableFilter } from './CSelectableFilter'

type TFilters = TextFilter | ToggleFilter | SelectableFilter

interface ICFilterDelegate {
  clear: () => void
}

interface ICFilter<T> {
  readonly type: FilterType
  readonly name: string
  readonly field: string
  value?: T
  delegate?: ICFilterDelegate
}

export { ICFilterDelegate, ICFilter, TFilters }
