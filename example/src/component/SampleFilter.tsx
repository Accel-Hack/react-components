import React from 'react'
import { FilterType } from '@accelhack-org/react-components'
import { ARFilter } from '@accelhack-org/react-components'

export const SampleFilter = () => {
  const filter = new ARFilter.Class({
    filters: [
      { type: FilterType.TEXT, name: '検索ワード', field: 'word' },
      {
        type: FilterType.TOGGLE,
        name: '大文字・小文字',
        field: 'font',
        options: [
          { caption: 'ABC', value: 'upper' },
          { caption: 'abc', value: 'lower' },
        ],
      },
      {
        type: FilterType.SELECTABLE,
        name: '言語',
        field: 'language',
        maxCount: 2,
        options: [
          { caption: 'English', value: 'en' },
          { caption: 'Japanese', value: 'ja' },
          { caption: 'French', value: 'fr' },
        ],
      },
      {
        type: FilterType.SELECTABLE,
        name: '非同期',
        field: 'async',
        options: async () => {
          return [
            { caption: 'try', value: 'ty' },
            { caption: 'catch', value: 'ct' },
            { caption: 'finally', value: 'fn' },
          ]
        },
      },
      {
        type: FilterType.SUGGESTION,
        name: '科目',
        field: 'subject',
        options: async (param?: string) => {
          const list = [
            { caption: 'try', value: 'ty' },
            { caption: 'catch', value: 'ct' },
            { caption: 'finally', value: 'fn' },
          ]
          return list.filter((f) => f.caption.includes(param ?? ''))
        },
      },
    ],
    onFiltered: (options: any) => console.log('filtered param', options),
  })
  return (
    <div>
      <h2>Filters</h2>
      <div>
        <ARFilter.Component filterBox={filter} />
      </div>
    </div>
  )
}
