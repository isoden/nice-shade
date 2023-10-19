export function Box({ hex }: { hex: string }) {
  return (
    <li key={hex} style={{ background: hex }}>
      <button
        className="w-full py-2.5"
        onClick={async () => {
          await navigator.clipboard.writeText(hex)
        }}
        type="button"
        title="クリップボードにコピー"
      >
        <span className="bg-white/40 font-mono">{hex}</span>
      </button>
    </li>
  )
}
