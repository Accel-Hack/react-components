import { FilterType } from './Enums'

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

export { ICFilterDelegate, ICFilter }
