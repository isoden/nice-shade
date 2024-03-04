import { Box } from './Box'

export function Palette({
  colors,
}: {
  /**
   * カラーコードのリスト
   * 値がユニークとは限らない
   */
  colors: string[]
}) {
  return (
    <ol className="flex flex-col">
      {colors.map((color, i) => (
        <Box key={i} color={color} />
      ))}
    </ol>
  )
}
