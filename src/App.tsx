import { useMemo, useState } from 'react'
import { hex2hsb, hsb2hex } from './colors'
import { Palette } from './_components/Palette'

const MIN_BRIGHTNESS = 0
const MAX_BRIGHTNESS = 100
const MIN_SATURATION = 0
const MAX_SATURATION = 100

const MIN_AMOUNT = 3
const MAX_AMOUNT = 20

export function App() {
  const [color, setColor] = useState('#003e70')
  const [amount, setAmount] = useState(10)

  const input = useMemo(() => {
    const [h, s, b] = hex2hsb(color)
    return { h, s, b }
  }, [color])

  // prettier-ignore
  const diff =
    // 彩度 (input.s → 0 までの量)
    (input.s - MIN_SATURATION) +
    // 明度 (input.b → 100 までの量)
    (MAX_BRIGHTNESS - input.b)

  const colors = Array.from(Array(amount), (_, i) => {
    const step = (diff / (amount - 1)) * i
    const s = clamp(
      input.s - Math.max(0, step - (MAX_BRIGHTNESS - input.b)),
      MIN_SATURATION,
      MAX_SATURATION,
    )
    const b = clamp(input.b + step, MIN_BRIGHTNESS, MAX_BRIGHTNESS)

    return hsb2hex(input.h, s, b)
  })
    // FIXME: 色変換時に浮動小数点数の誤差でカラーコードがずれることがあるので、 先頭と末尾は固定値にする。 直せたら直したいけど bignumber.js を使う、とかになりそう。
    .with(-1, '#ffffff')
    .with(0, color)

  return (
    <div className="container mx-auto grid max-h-screen grid-rows-[repeat(2,min-content),1fr] gap-4">
      <header className="flex items-center border-b p-4">
        <h1 className="font-bold">Nice shade</h1>
        <a
          className="ml-auto text-sm"
          href="https://github.com/isoden/nice-shade"
        >
          GitHub
        </a>
      </header>

      <main className="mt-4 contents flex-col">
        <form className="flex flex-wrap gap-4 rounded bg-slate-100 p-4">
          <label>
            Select color:
            <input
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </label>
          <label>
            Select amount of shade:
            <input
              type="range"
              value={amount}
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              onChange={(event) => setAmount(event.target.valueAsNumber)}
            />
            <input
              type="number"
              value={amount}
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              onChange={(event) => setAmount(event.target.valueAsNumber)}
            />
          </label>
        </form>

        <div className="overflow-y-auto">
          <Palette colors={colors.toReversed()} />
        </div>
      </main>
    </div>
  )
}

function clamp(x: number, lower: number, upper: number): number {
  return Math.max(lower, Math.min(x, upper))
}
