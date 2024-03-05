import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Box } from './Box'

test(async () => {
  render(<Box color="#ffffff" />)

  const button = screen.getByRole('button')

  // assert: accessible name / description が設定されている
  expect(button).toHaveAccessibleName('#ffffff')
  expect(button).toHaveAccessibleDescription('Copy to clipboard')
})

test.todo('copy to clipboard')
