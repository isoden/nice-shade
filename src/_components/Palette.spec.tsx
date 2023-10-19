import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Palette } from './Palette'

test(async () => {
  render(<Palette colors={['#ffffff', '#ff85ae', '#cc3366']} />)

  const orderedListItem = screen.getAllByRole('listitem')

  // assert: すべての色を表示する
  expect(orderedListItem).toHaveLength(3)

  // assert: 順番通りに表示する
  expect(orderedListItem[0]).toHaveTextContent('#ffffff')
  expect(orderedListItem[1]).toHaveTextContent('#ff85ae')
  expect(orderedListItem[2]).toHaveTextContent('#cc3366')
})
