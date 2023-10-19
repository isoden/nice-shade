export function Box({
  color,
}: {
  /**
   * カラーコード
   */
  color: string
}) {
  return (
    <li key={color} style={{ background: color }}>
      <button
        className="w-full py-2.5"
        onClick={async () => {
          await navigator.clipboard.writeText(color)
        }}
        type="button"
        title="Copy to clipboard"
      >
        <span className="bg-white/40 font-mono">{color}</span>
      </button>
    </li>
  )
}
