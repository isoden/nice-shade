import { Box } from './Box'

export function Palette({
  colors,
}: {
  /**
   * カラーコードのリスト
   */
  colors: string[]
}) {
  return (
    <ol className="flex flex-col">
      {colors.map((color) => (
        <Box key={color} color={color} />
      ))}
    </ol>
  )
}
