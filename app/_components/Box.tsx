import { useState } from 'react'

export function Box({
  color,
}: {
  /**
   * カラーコード
   */
  color: string
}) {
  const [clicked, setClicked] = useState(false)

  return (
    <li key={color} style={{ background: color }}>
      <button
        className="relative w-full py-2.5"
        onClick={async () => {
          setClicked(true)

          await navigator.clipboard.writeText(color)
          await setTimeout(600)

          setClicked(false)
        }}
        type="button"
        title="Click to copy to clipboard"
      >
        <span className="relative">
          {clicked && (
            <span
              role="status"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full whitespace-pre"
              aria-label="The color code was copied to clipboard"
            >
              ✅
            </span>
          )}
          <span className="bg-white/40 font-mono">{color}</span>
        </span>
      </button>
    </li>
  )
}

function setTimeout(delay: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, delay))
}
